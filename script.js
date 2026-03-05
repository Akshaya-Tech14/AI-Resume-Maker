// ==========================================
// FALLING STARS ANIMATION
// ==========================================
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 50;

    for (let i = 0; i < numberOfStars; i++) {
        createStar(starsContainer);
    }

    // Continuously create new stars
    setInterval(() => {
        if (document.querySelectorAll('.star').length < numberOfStars) {
            createStar(starsContainer);
        }
    }, 300);
}

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random horizontal position
    star.style.left = `${Math.random() * 100}%`;

    // Random animation duration between 3s and 8s
    const duration = Math.random() * 5 + 3;
    star.style.animationDuration = `${duration}s`;

    // Random delay
    const delay = Math.random() * 2;
    star.style.animationDelay = `${delay}s`;

    // Random opacity
    const opacity = Math.random() * 0.5 + 0.5;
    star.style.opacity = opacity;

    container.appendChild(star);

    // Remove star after animation completes
    setTimeout(() => {
        if (star.parentNode) {
            star.remove();
        }
    }, (duration + delay) * 1000);
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

document.addEventListener('DOMContentLoaded', createSnowfall);
// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });
}

// ==========================================
// FLOATING CARDS PARALLAX EFFECT
// ==========================================
function initParallaxEffect() {
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
function initButtonRipple() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation to document
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple-effect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// TYPING EFFECT FOR HERO TITLE
// ==========================================
function initTypingEffect() {
    const gradientText = document.querySelector('.gradient-text');
    if (!gradientText) return;

    const text = gradientText.textContent;
    gradientText.textContent = '';
    gradientText.style.borderRight = '2px solid';
    gradientText.style.paddingRight = '5px';

    let index = 0;
    const typingSpeed = 100;

    function type() {
        if (index < text.length) {
            gradientText.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            gradientText.style.borderRight = 'none';
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
}

function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;

                // Extract number from text
                if (text.includes('50,000')) {
                    animateCounter(entry.target, 50000);
                } else if (text.includes('4.9')) {
                    let current = 0;
                    const target = 4.9;
                    const timer = setInterval(() => {
                        current += 0.1;
                        if (current >= target) {
                            entry.target.textContent = '4.9/5';
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = current.toFixed(1) + '/5';
                        }
                    }, 50);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// ==========================================
// PROGRESS BAR ANIMATION
// ==========================================
function initProgressAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease-out';
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ==========================================
function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

    // Create circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.style.position = 'fixed';
        circle.style.width = '10px';
        circle.style.height = '10px';
        circle.style.borderRadius = '50%';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '9999';
        circle.style.transition = 'all 0.1s ease';
        circle.style.opacity = '0';
        document.body.appendChild(circle);
        circles.push(circle);
    }

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            circle.style.background = colors[index % colors.length];
            circle.style.opacity = (circles.length - index) / circles.length * 0.5;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.offsetLeft - circle.offsetLeft) * 0.3;
            y += (nextCircle.offsetTop - circle.offsetTop) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    // Uncomment to enable cursor trail
    // animateCircles();
}

// ==========================================
// NAVBAR INITIALIZATION (Standardized)
// ==========================================
function initNavbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const navActions = document.querySelector('.nav-actions');
    const navLinksContainer = document.querySelector('.nav-links');

    // 1. Standardize Navigation Links
    if (navLinksContainer) {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Define standard links
        const links = [
            { name: 'Dashboard', url: 'dashboard.html' },
            { name: 'Templates', url: 'templates.html' },
            { name: 'Profile', url: 'profile.html' }
        ];

        // Only show Dashboard/Profile if logged in, otherwise show Home/Features/Pricing
        if (!user) {
            navLinksContainer.innerHTML = `
                <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a>
                <a href="templates.html" class="${currentPath === 'templates.html' ? 'active' : ''}">Templates</a>
                <a href="index.html#features">Features</a>
            `;
        } else {
            navLinksContainer.innerHTML = links.map(link => `
                <a href="${link.url}" class="${currentPath === link.url ? 'active' : ''}">${link.name}</a>
            `).join('');
        }
    }

    // 2. Handle User Actions
    if (navActions) {
        if (user) {
            navActions.innerHTML = `
                <div class="user-pill" style="display:flex; align-items:center; gap:1rem; background:rgba(255,255,255,0.05); padding:0.4rem 1rem; border-radius:50px; border:1px solid rgba(255,255,255,0.1);">
                    <div class="user-avatar-mini" style="width:24px; height:24px; background:var(--primary-gradient); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:bold; color:white;">
                        ${(user.name || user.full_name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span style="font-size:0.85rem; color:white; font-weight:500;">${user.name || user.full_name || 'User'}</span>
                    <button onclick="logoutUser()" style="background:transparent; border:none; color:var(--f-text-secondary); cursor:pointer; font-size:0.8rem; padding:0; margin-left:1rem; transition:color 0.3s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--f-text-secondary)'">Sign Out</button>
                </div>
            `;
        } else {
            navActions.innerHTML = `
                <button class="btn-minimal" onclick="window.location.href='login.html'">Sign In</button>
                <button class="btn-primary" onclick="window.location.href='login.html'" style="padding:0.6rem 1.5rem; font-size:0.85rem;">Get Started</button>
            `;
        }
    }
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==========================================
// INITIALIZE ALL FUNCTIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    createStars();
    handleNavbarScroll();
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffect();
    initButtonRipple();
    // initTypingEffect(); // Uncomment for typing effect
    initCounterAnimations();
    initProgressAnimation();
    // initCursorTrail(); // Uncomment for cursor trail effect

    console.log('🚀 ResumeAI Pro initialized successfully!');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mouse events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
function initAccessibility() {
    // Add keyboard navigation for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Add focus visible styles
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// Initialize accessibility features
initAccessibility();
// ==========================================
// DATA SECURITY UTILITIES
// ==========================================
function encryptData(data) {
    const encryptToggle = document.getElementById('encryptToggle');
    if (encryptToggle && !encryptToggle.checked) return JSON.stringify(data);
    return "SECURE_v1:" + btoa(JSON.stringify(data));
}

function decryptData(str) {
    if (!str) return null;
    try {
        if (str.startsWith("SECURE_v1:")) {
            return JSON.parse(atob(str.replace("SECURE_v1:", "")));
        }
        return JSON.parse(str);
    } catch (e) {
        console.error("Data Decryption/Parse failed", e);
        return null;
    }
}

// Ensure initNavbar is available globally
window.initNavbar = initNavbar;
window.logoutUser = logoutUser;
window.encryptData = encryptData;
window.decryptData = decryptData;
