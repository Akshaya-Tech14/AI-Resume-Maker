// ==========================================
// SUCCESS PAGE ANIMATIONS
// ==========================================

// ==========================================
// CONFETTI EFFECT (OPTIONAL)
// ==========================================

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#fbbf24'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.opacity = '1';
            confetti.style.transform = 'rotate(0deg)';
            confetti.style.transition = 'all 3s ease-out';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = window.innerHeight + 'px';
                confetti.style.left = (parseFloat(confetti.style.left) + (Math.random() - 0.5) * 200) + 'px';
                confetti.style.opacity = '0';
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            }, 50);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

// ==========================================
// DOWNLOAD FUNCTIONALITY
// ==========================================

function downloadPDF() {
    console.log('Downloading PDF...');
    // In production, this would call the backend API
    showDownloadNotification('PDF');
}

function downloadWord() {
    console.log('Downloading Word document...');
    // In production, this would call the backend API
    showDownloadNotification('Word');
}

function showDownloadNotification(format) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '1.5rem 2rem';
    notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    notification.style.color = 'white';
    notification.style.borderRadius = '12px';
    notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.animation = 'slideInRight 0.5s ease';
    notification.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
        </svg>
        <span>Your ${format} resume is downloading...</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');

    statValues.forEach((stat, index) => {
        const text = stat.textContent;

        // Only animate numeric values
        if (!isNaN(text)) {
            const target = parseInt(text);
            let current = 0;
            const increment = target / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
}

// ==========================================
// CARD HOVER EFFECTS
// ==========================================

function initCardEffects() {
    const cards = document.querySelectorAll('.download-card, .next-step-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// BUTTON CLICK HANDLERS
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Supabase Connection
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const supabase = window.supabaseApp.client;
    const isSupabaseConfigured = !supabase.supabaseUrl.includes('placeholder');

    if (resumeId && isSupabaseConfigured && currentUser?.isSupabase) {
        try {
            const { data: resume, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('id', resumeId)
                .single();

            if (error) throw error;
            if (resume) {
                // Update ATS Score Stat
                const statCards = document.querySelectorAll('.stat-card');
                if (statCards[0]) statCards[0].querySelector('.stat-value').textContent = resume.ats_score || '0';

                // Update Keyword Stat (if content.skills exists)
                if (statCards[1] && resume.content?.skills) {
                    statCards[1].querySelector('.stat-value').textContent = resume.content.skills.length;
                }
            }
        } catch (err) {
            console.error('Error loading stats from Supabase:', err);
        }
    }

    // Download buttons
    const pdfBtn = document.querySelector('.btn-download-primary');
    const wordBtn = document.querySelector('.btn-download-secondary');

    if (pdfBtn) {
        pdfBtn.addEventListener('click', downloadPDF);
    }

    if (wordBtn) {
        wordBtn.addEventListener('click', downloadWord);
    }

    // AI Cover Letter Builder
    const aiBuilderBtn = document.querySelector('.btn-ai-builder');
    if (aiBuilderBtn) {
        aiBuilderBtn.addEventListener('click', () => {
            alert('AI Cover Letter Builder would open here. This feature uses GPT-4 to generate personalized cover letters based on your resume and job description.');
        });
    }

    // Next step links
    const stepLinks = document.querySelectorAll('.step-link');
    stepLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This would navigate to the respective resource page.');
        });
    });
});

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    // Trigger confetti after checkmark animation
    setTimeout(() => {
        createConfetti();
    }, 1500);

    // Animate stats
    setTimeout(() => {
        animateStats();
    }, 2000);

    // Initialize card effects
    initCardEffects();

    console.log('✅ Success page loaded');
});

// ==========================================
// SOCIAL SHARE (OPTIONAL)
// ==========================================

function shareSuccess(platform) {
    const message = "I just created my professional resume with ResumeAI Pro! 🎉";
    const url = window.location.href;

    let shareUrl;
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

window.shareSuccess = shareSuccess;
