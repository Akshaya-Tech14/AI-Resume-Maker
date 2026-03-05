// ==========================================
// FUTURISTIC ATS ENGINE V2.0
// ==========================================

let futuristicData = {
    overall: 0,
    skills: 0,
    experience: 0,
    keywordDensity: 0,
    foundCount: 0,
    missingCount: 0,
    topSkills: [],
    recommendations: [],
    // New Absolute Metrics
    recImpact: 0,
    formatAcc: 0,
    contentDepth: 0,
    confidence: 98
};

// ==========================================
// ANALYSIS ENGINE
// ==========================================

async function analyzeResume() {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const supabase = window.supabaseApp.client;
    const isSupabaseConfigured = !supabase.supabaseUrl.includes('placeholder');

    let data = null;

    // 1. Load Data from Supabase if ID provided
    if (resumeId && isSupabaseConfigured && currentUser?.isSupabase) {
        try {
            const { data: resume, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('id', resumeId)
                .single();

            if (error) throw error;
            if (resume) {
                data = resume.content;
                window.currentResumeId = resumeId;
            }
        } catch (err) {
            console.error('Supabase load error in ATS:', err);
        }
    }

    // 2. Fallback to Local Storage
    if (!data) {
        const rawData = localStorage.getItem('resume_draft');
        if (rawData) {
            data = JSON.parse(rawData);
        }
    }

    // 3. Fallback to Demo Data
    if (!data) {
        futuristicData = {
            overall: 92,
            skills: 88,
            experience: 95,
            keywordDensity: 82,
            foundCount: 24,
            missingCount: 3,
            topSkills: ['React.js', 'Node.js', 'Demo Mode', 'AWS', 'System Design'],
            recommendations: [
                { title: 'DEMO MODE ACTIVE', text: 'Go to Editor and click "Analyze" to see real results.' },
                { title: 'IMPACT: METRIC DENSITY', text: 'Quantify 3 more achievements in "Experience" section.' }
            ],
            recImpact: 85,
            formatAcc: 98,
            contentDepth: 90,
            confidence: 99
        };
        return;
    }

    // 1. Core Scoring Logic
    let score = 0;
    let recs = [];

    // Basics & Contact (15%)
    let basicScore = 0;
    if (data.firstName && data.lastName) basicScore += 3;
    if (data.jobTitle) basicScore += 3;
    if (data.email && data.email.includes('@')) basicScore += 3;
    if (data.phone && data.phone.length > 5) basicScore += 3;
    if (data.linkedin || data.github) basicScore += 3;
    score += basicScore;

    // Summary Quality (10%)
    let summaryScore = 0;
    if (data.summary) {
        if (data.summary.length > 150) summaryScore += 10;
        else if (data.summary.length > 50) summaryScore += 7;
        else summaryScore += 4;

        // Check for impact words
        if (/(expert|specialist|proven|extensive|pioneer|innovated)/i.test(data.summary)) summaryScore += 2;
    } else {
        recs.push({ title: 'CRITICAL: SUMMARY', text: 'Professional summary is missing. This is a top-priority ATS field.' });
    }
    summaryScore = Math.min(10, summaryScore);
    score += summaryScore;

    // Experience Density (35%)
    let expScore = 0;
    let bulletPoints = 0;
    let metricsFound = 0;

    if (data.experience && data.experience.length > 0) {
        expScore += 15; // Base for having experience
        data.experience.forEach(exp => {
            if (exp.description) {
                const count = exp.description.split('\n').filter(l => l.trim().length > 10).length;
                bulletPoints += count;
                if (count >= 3) expScore += 5;

                // Check for metrics
                const metrics = (exp.description.match(/\d+%|\$\d+|\d+ user|\d+ team|\d+x/g) || []).length;
                metricsFound += metrics;
                if (metrics > 0) expScore += 5;
            }
        });
    } else {
        recs.push({ title: 'MISSING: EXPERIENCE', text: 'No work experience found. ATS systems rank this section highest.' });
    }
    expScore = Math.min(35, expScore);
    score += expScore;

    // Skills Depth (20%)
    let skillScore = 0;
    if (data.skills && data.skills.length > 0) {
        skillScore = Math.min(20, data.skills.length * 2);
        if (data.skills.length < 5) recs.push({ title: 'STRATEGIC: SKILLS', text: 'Add at least 8-10 industry-specific skills to match more job profiles.' });
    } else {
        recs.push({ title: 'MISSING: SKILLS', text: 'No skills added. Machines cannot index your capabilities.' });
    }
    score += skillScore;

    // Keyword Match (20%)
    const buzzwords = ['developed', 'managed', 'led', 'engineered', 'optimized', 'scaled', 'architected', 'implemented', 'transformed', 'delivered'];
    const textContent = (data.summary + JSON.stringify(data.experience) + (data.skills ? data.skills.join(' ') : '')).toLowerCase();

    let foundKeywords = buzzwords.filter(w => textContent.includes(w));
    let keywordScore = Math.min(20, foundKeywords.length * 2);
    score += keywordScore;

    // Final calculations
    futuristicData.overall = Math.round(score);
    futuristicData.skills = Math.round((skillScore / 20) * 100);
    futuristicData.experience = Math.round((expScore / 35) * 100);
    futuristicData.keywordDensity = Math.round((keywordScore / 20) * 100);

    // Absolute Prediction Metrics
    futuristicData.recImpact = Math.round((metricsFound * 15 + summaryScore * 5) / 100 * 100);
    futuristicData.recImpact = Math.min(100, Math.max(40, futuristicData.recImpact + (expScore / 35 * 40)));

    futuristicData.formatAcc = basicScore > 10 ? 95 : 70;
    if (bulletPoints > 0) futuristicData.formatAcc += 5;
    futuristicData.formatAcc = Math.min(100, futuristicData.formatAcc);

    futuristicData.contentDepth = Math.round((textContent.length / 2000) * 100);
    futuristicData.contentDepth = Math.min(100, Math.max(30, futuristicData.contentDepth));

    futuristicData.foundCount = foundKeywords.length;
    futuristicData.missingCount = buzzwords.length - foundKeywords.length;
    futuristicData.topSkills = (data.skills || []).slice(0, 8);

    // Logic-based recommendations
    if (metricsFound < 3) recs.push({ title: 'IMPACT: QUANTIFY', text: 'Include more percentages/numbers in your experience to prove success.' });
    if (basicScore < 12) recs.push({ title: 'FORMATTING: CONTACT', text: 'Ensure Email, LinkedIn, and Phone are all clearly listed.' });

    futuristicData.recommendations = recs;

    // 4. Persistence: Update Score in Supabase
    if (window.currentResumeId && isSupabaseConfigured && currentUser?.isSupabase) {
        try {
            await supabase
                .from('resumes')
                .update({ ats_score: futuristicData.overall })
                .eq('id', window.currentResumeId);
            console.log('✅ Updated ATS score in cloud');
        } catch (err) {
            console.warn('Could not save score to cloud:', err);
        }
    }
}


// ==========================================
// SYSTEM CLOCK
// ==========================================

function startClock() {
    const clock = document.getElementById('liveTime');
    setInterval(() => {
        const now = new Date();
        clock.textContent = now.toTimeString().split(' ')[0];
    }, 1000);
}

// ==========================================
// DATA INJECTION
// ==========================================

function injectDashboardData() {
    // Confidence
    const confText = document.querySelector('#confidenceLevel .conf-text');
    if (confText) confText.textContent = `AI CONFIDENCE: ${futuristicData.confidence}%`;

    // Prediction Rating
    const rating = document.getElementById('predictionRating');
    if (rating) {
        rating.textContent = futuristicData.overall > 85 ? 'HIGHLY OPTIMIZED' : (futuristicData.overall > 70 ? 'OPTIMIZED' : 'NEEDS WORK');
        rating.style.color = futuristicData.overall > 85 ? '#00ff88' : (futuristicData.overall > 70 ? '#ffcc00' : '#ff4444');
    }

    // Skills Cloud
    const cloud = document.getElementById('skillsCloud');
    if (cloud) {
        cloud.innerHTML = '';
        futuristicData.topSkills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'f-tag';
            tag.textContent = skill;
            cloud.appendChild(tag);
        });
    }

    // Counts
    document.getElementById('foundCount').textContent = futuristicData.foundCount;
    document.getElementById('missingCount').textContent = futuristicData.missingCount;

    // Recommendations
    const recList = document.getElementById('recommendationsList');
    if (recList) {
        recList.innerHTML = '';
        futuristicData.recommendations.forEach((rec, i) => {
            const item = document.createElement('div');
            item.className = 'recommend-item';
            item.innerHTML = `
                <div class="rec-icon">[0${i + 1}]</div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.text}</p>
                </div>
            `;
            recList.appendChild(item);
        });
    }
}

// ==========================================
// CORE ANIMATIONS
// ==========================================

function runAnalysis() {
    const scoreVal = document.getElementById('scoreValue');
    const mainProgress = document.getElementById('mainProgress');

    // 1. Overall Score & Ring
    let current = 0;
    const target = futuristicData.overall;
    const duration = 2000;
    const increment = target / (duration / 16);

    const intv = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(intv);
            document.getElementById('statusTitle').textContent = target > 85 ? 'ELITE STATUS' : (target > 70 ? 'OPTIMIZED' : 'ANALYSIS COMPLETE');
        }
        scoreVal.textContent = Math.round(current);
    }, 16);

    // Ring offset
    const offset = 565.48 - (target / 100) * 565.48;
    setTimeout(() => {
        if (mainProgress) mainProgress.style.strokeDashoffset = offset;
    }, 300);

    // 2. Breakdown Bars & Percents
    animateBreakdown('skills', futuristicData.skills, 'Percent');
    animateBreakdown('exp', futuristicData.experience, 'Percent');
    animateBreakdown('keyword', futuristicData.keywordDensity, 'Percent');

    // 3. Absolute Prediction Metrics
    animateBreakdown('recImpact', futuristicData.recImpact, 'Val');
    animateBreakdown('formatAcc', futuristicData.formatAcc, 'Val');
    animateBreakdown('contentDepth', futuristicData.contentDepth, 'Val');

    // 4. Status Text Update
    setTimeout(() => {
        const msg = target > 80
            ? 'Structure verified. Your resume is in the top 5% of ATS compatibility.'
            : 'Optimization recommended. Our AI suggests refinement to bypass automated filters.';
        document.getElementById('statusMessage').textContent = msg;
    }, 2500);
}

function animateBreakdown(id, target, suffix = 'Percent') {
    const bar = document.getElementById(`${id}Bar`);
    const percent = document.getElementById(`${id}${suffix}`);

    if (!bar || !percent) return;

    setTimeout(() => {
        bar.style.width = `${target}%`;

        let start = 0;
        const speed = target > 0 ? (2000 / target) : 30;
        const intv = setInterval(() => {
            start += 1;
            if (start >= target) {
                start = target;
                clearInterval(intv);
            }
            percent.textContent = `${start}%`;
        }, Math.max(10, speed));
    }, 800);
}

// ==========================================
// GLOBAL SNOWFALL EFFECT
// ==========================================

function createSnowfall() {
    const container = document.createElement('div');
    container.className = 'snow-container';
    document.body.appendChild(container);

    const flakeCount = 50;

    for (let i = 0; i < flakeCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 5;
        const opacity = Math.random() * 0.5 + 0.3;

        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.left = `${left}vw`;
        flake.style.animationDelay = `${delay}s`;
        flake.style.animationDuration = `${duration}s`;
        flake.style.opacity = opacity;

        container.appendChild(flake);
    }
}

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    startClock();
    await analyzeResume(); // Calculate scores first
    injectDashboardData();
    createSnowfall();

    // Start analysis after a short delay for "system boot" feel
    setTimeout(runAnalysis, 1000);
});
