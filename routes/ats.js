const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// ATS Keywords Database (simplified version)
const ATS_KEYWORDS = {
    technical: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Git'],
    leadership: ['led', 'managed', 'directed', 'coordinated', 'supervised', 'mentored', 'trained'],
    achievement: ['achieved', 'improved', 'increased', 'reduced', 'optimized', 'streamlined', 'enhanced'],
    metrics: ['%', 'percent', 'million', 'thousand', 'revenue', 'cost', 'efficiency', 'performance']
};

// @route   POST /api/ats/check/:resumeId
// @desc    Check ATS score for a resume
// @access  Private
router.post('/check/:resumeId', async (req, res) => {
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

        // Calculate ATS scores
        const scores = calculateATSScore(resume);

        // Update resume with scores
        resume.atsScore = {
            overall: scores.overall,
            formatting: scores.formatting,
            keywords: scores.keywords,
            lastChecked: Date.now()
        };
        await resume.save();

        res.json({
            status: 'success',
            data: {
                scores,
                recommendations: scores.recommendations,
                missingKeywords: scores.missingKeywords
            }
        });
    } catch (error) {
        console.error('ATS check error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error checking ATS score'
        });
    }
});

// Calculate ATS Score
function calculateATSScore(resume) {
    const scores = {
        formatting: 0,
        keywords: 0,
        overall: 0,
        recommendations: [],
        missingKeywords: []
    };

    // Formatting Score (40 points)
    let formattingScore = 0;

    // Check for essential sections
    if (resume.personalInfo?.fullName) formattingScore += 5;
    if (resume.personalInfo?.email) formattingScore += 5;
    if (resume.personalInfo?.phone) formattingScore += 5;
    if (resume.summary) formattingScore += 5;
    if (resume.experience?.length > 0) formattingScore += 10;
    if (resume.education?.length > 0) formattingScore += 5;
    if (resume.skills?.technical?.length > 0) formattingScore += 5;

    scores.formatting = Math.min(100, (formattingScore / 40) * 100);

    // Add formatting recommendations
    if (!resume.summary) {
        scores.recommendations.push({
            type: 'formatting',
            priority: 'high',
            message: 'Add a professional summary to introduce yourself'
        });
    }
    if (!resume.personalInfo?.phone) {
        scores.recommendations.push({
            type: 'formatting',
            priority: 'medium',
            message: 'Add phone number for better contact options'
        });
    }
    if (resume.experience?.length === 0) {
        scores.recommendations.push({
            type: 'formatting',
            priority: 'high',
            message: 'Add work experience to showcase your background'
        });
    }

    // Keyword Score (60 points)
    let keywordScore = 0;
    const resumeText = JSON.stringify(resume).toLowerCase();

    // Check for action verbs
    const actionVerbsFound = ATS_KEYWORDS.leadership.filter(verb =>
        resumeText.includes(verb.toLowerCase())
    );
    keywordScore += Math.min(15, actionVerbsFound.length * 2);

    // Check for achievement keywords
    const achievementWordsFound = ATS_KEYWORDS.achievement.filter(word =>
        resumeText.includes(word.toLowerCase())
    );
    keywordScore += Math.min(15, achievementWordsFound.length * 2);

    // Check for metrics
    const metricsFound = ATS_KEYWORDS.metrics.filter(metric =>
        resumeText.includes(metric.toLowerCase())
    );
    keywordScore += Math.min(15, metricsFound.length * 3);

    // Check for technical skills
    const technicalSkillsFound = resume.skills?.technical?.length || 0;
    keywordScore += Math.min(15, technicalSkillsFound * 1.5);

    scores.keywords = Math.min(100, (keywordScore / 60) * 100);

    // Keyword recommendations
    if (actionVerbsFound.length < 3) {
        scores.recommendations.push({
            type: 'keywords',
            priority: 'high',
            message: 'Use more action verbs (led, managed, achieved, etc.)'
        });
        scores.missingKeywords.push(...ATS_KEYWORDS.leadership.slice(0, 5));
    }

    if (metricsFound.length < 2) {
        scores.recommendations.push({
            type: 'keywords',
            priority: 'high',
            message: 'Add quantifiable metrics to demonstrate impact'
        });
    }

    if (technicalSkillsFound < 5) {
        scores.recommendations.push({
            type: 'keywords',
            priority: 'medium',
            message: 'Add more relevant technical skills'
        });
    }

    // Calculate overall score
    scores.overall = Math.round((scores.formatting * 0.4) + (scores.keywords * 0.6));

    // Overall recommendations based on score
    if (scores.overall < 60) {
        scores.recommendations.push({
            type: 'overall',
            priority: 'critical',
            message: 'Your resume needs significant improvements to pass ATS systems'
        });
    } else if (scores.overall < 80) {
        scores.recommendations.push({
            type: 'overall',
            priority: 'medium',
            message: 'Your resume is good but could be optimized further'
        });
    } else {
        scores.recommendations.push({
            type: 'overall',
            priority: 'low',
            message: 'Excellent! Your resume is well-optimized for ATS systems'
        });
    }

    return scores;
}

// @route   POST /api/ats/analyze-job
// @desc    Analyze job description and match with resume
// @access  Private
router.post('/analyze-job', async (req, res) => {
    try {
        const { jobDescription, resumeId } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                status: 'error',
                message: 'Job description is required'
            });
        }

        const resume = await Resume.findOne({
            _id: resumeId,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                status: 'error',
                message: 'Resume not found'
            });
        }

        // Extract keywords from job description
        const jobKeywords = extractKeywords(jobDescription);
        const resumeText = JSON.stringify(resume).toLowerCase();

        // Calculate match percentage
        const matchedKeywords = jobKeywords.filter(keyword =>
            resumeText.includes(keyword.toLowerCase())
        );

        const matchPercentage = Math.round((matchedKeywords.length / jobKeywords.length) * 100);

        const missingKeywords = jobKeywords.filter(keyword =>
            !resumeText.includes(keyword.toLowerCase())
        );

        res.json({
            status: 'success',
            data: {
                matchPercentage,
                totalKeywords: jobKeywords.length,
                matchedKeywords: matchedKeywords.length,
                matchedKeywordsList: matchedKeywords,
                missingKeywords: missingKeywords.slice(0, 10),
                recommendation: matchPercentage >= 70
                    ? 'Strong match! Your resume aligns well with this job.'
                    : matchPercentage >= 50
                        ? 'Moderate match. Consider adding more relevant keywords.'
                        : 'Weak match. Tailor your resume to include more job-specific keywords.'
            }
        });
    } catch (error) {
        console.error('Job analysis error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error analyzing job description'
        });
    }
});

// Extract keywords from text (simplified)
function extractKeywords(text) {
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3);

    // Remove common words
    const commonWords = ['that', 'this', 'with', 'from', 'have', 'will', 'your', 'about', 'they', 'been', 'were', 'their'];
    const filtered = words.filter(word => !commonWords.includes(word));

    // Get unique words
    const unique = [...new Set(filtered)];

    // Return top keywords (simplified - in production, use NLP)
    return unique.slice(0, 30);
}

module.exports = router;
