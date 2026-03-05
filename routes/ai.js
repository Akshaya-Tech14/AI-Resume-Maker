const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { protect, checkAICredits } = require('../middleware/auth');
const Resume = require('../models/Resume');

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// All routes are protected
router.use(protect);

// @route   POST /api/ai/enhance-bullet
// @desc    Enhance a single bullet point using AI
// @access  Private
router.post('/enhance-bullet', checkAICredits(1), async (req, res) => {
    try {
        const { text, jobTitle, targetRole } = req.body;

        if (!text) {
            return res.status(400).json({
                status: 'error',
                message: 'Text is required'
            });
        }

        const prompt = `You are a professional resume writer. Enhance the following resume bullet point to make it more impactful, quantifiable, and ATS-friendly.

Original bullet point: "${text}"
${jobTitle ? `Job title: ${jobTitle}` : ''}
${targetRole ? `Target role: ${targetRole}` : ''}

Requirements:
- Start with a strong action verb
- Include metrics and quantifiable results where possible
- Make it concise (1-2 lines)
- Use industry-specific keywords
- Focus on achievements and impact

Provide only the enhanced bullet point, nothing else.`;

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert resume writer who creates compelling, ATS-optimized bullet points.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        const enhancedText = completion.choices[0].message.content.trim();

        // Deduct AI credit
        req.user.aiCredits -= 1;
        await req.user.save();

        res.json({
            status: 'success',
            data: {
                original: text,
                enhanced: enhancedText,
                creditsRemaining: req.user.aiCredits
            }
        });
    } catch (error) {
        console.error('AI enhance error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error enhancing text with AI'
        });
    }
});

// @route   POST /api/ai/generate-summary
// @desc    Generate professional summary using AI
// @access  Private
router.post('/generate-summary', checkAICredits(2), async (req, res) => {
    try {
        const { experience, skills, targetRole, yearsOfExperience } = req.body;

        const prompt = `Create a compelling professional summary for a resume based on the following information:

Target Role: ${targetRole || 'Not specified'}
Years of Experience: ${yearsOfExperience || 'Not specified'}
Key Skills: ${skills?.join(', ') || 'Not specified'}
Recent Experience: ${experience || 'Not specified'}

Requirements:
- 3-4 sentences maximum
- Highlight key strengths and achievements
- Include relevant keywords for ATS
- Professional and impactful tone
- Focus on value proposition

Provide only the professional summary, nothing else.`;

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert resume writer specializing in creating compelling professional summaries.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 200
        });

        const summary = completion.choices[0].message.content.trim();

        // Deduct AI credits
        req.user.aiCredits -= 2;
        await req.user.save();

        res.json({
            status: 'success',
            data: {
                summary,
                creditsRemaining: req.user.aiCredits
            }
        });
    } catch (error) {
        console.error('AI summary error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error generating summary with AI'
        });
    }
});

// @route   POST /api/ai/suggest-keywords
// @desc    Suggest keywords based on job description
// @access  Private
router.post('/suggest-keywords', checkAICredits(1), async (req, res) => {
    try {
        const { jobDescription, currentSkills } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                status: 'error',
                message: 'Job description is required'
            });
        }

        const prompt = `Analyze the following job description and extract the most important keywords and skills that should be included in a resume:

Job Description:
${jobDescription}

${currentSkills ? `Current skills in resume: ${currentSkills.join(', ')}` : ''}

Provide:
1. Top 10 technical skills/keywords
2. Top 5 soft skills
3. Industry-specific terms

Format as JSON with keys: technical, soft, industry`;

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an ATS expert who identifies critical keywords in job descriptions.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.5,
            max_tokens: 300
        });

        let keywords;
        try {
            keywords = JSON.parse(completion.choices[0].message.content);
        } catch (e) {
            // If JSON parsing fails, return raw text
            keywords = {
                raw: completion.choices[0].message.content
            };
        }

        // Deduct AI credit
        req.user.aiCredits -= 1;
        await req.user.save();

        res.json({
            status: 'success',
            data: {
                keywords,
                creditsRemaining: req.user.aiCredits
            }
        });
    } catch (error) {
        console.error('AI keywords error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error suggesting keywords with AI'
        });
    }
});

// @route   POST /api/ai/optimize-resume
// @desc    Get AI suggestions for entire resume
// @access  Private
router.post('/optimize-resume/:resumeId', checkAICredits(3), async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.resumeId,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                status: 'error',
                message: 'Resume not found'
            });
        }

        const { targetJob } = req.body;

        const resumeText = `
Summary: ${resume.summary || 'Not provided'}
Experience: ${JSON.stringify(resume.experience)}
Skills: ${resume.skills.technical?.join(', ') || 'Not provided'}
Education: ${JSON.stringify(resume.education)}
        `;

        const prompt = `Analyze this resume and provide specific optimization suggestions:

${resumeText}

${targetJob ? `Target Job: ${targetJob}` : ''}

Provide actionable suggestions in these categories:
1. Content improvements (missing information, weak points)
2. Keyword optimization for ATS
3. Formatting recommendations
4. Achievement quantification opportunities
5. Overall impact score (1-100)

Format as JSON with keys: content, keywords, formatting, achievements, score`;

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional resume consultant providing detailed optimization advice.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.6,
            max_tokens: 800
        });

        let suggestions;
        try {
            suggestions = JSON.parse(completion.choices[0].message.content);
        } catch (e) {
            suggestions = {
                raw: completion.choices[0].message.content
            };
        }

        // Mark resume as AI enhanced
        resume.aiEnhanced = true;
        await resume.save();

        // Deduct AI credits
        req.user.aiCredits -= 3;
        await req.user.save();

        res.json({
            status: 'success',
            data: {
                suggestions,
                creditsRemaining: req.user.aiCredits
            }
        });
    } catch (error) {
        console.error('AI optimize error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error optimizing resume with AI'
        });
    }
});

module.exports = router;
