// Mobile Menu Infrastructure
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

// Smooth Scroll Setup for Anchor Targets
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Subtle Element Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .experience-item, .project-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
});

// Dynamic Number Ticker Animation
const runCounterAnimation = (element, target, suffix = '') => {
    const duration = 1600;
    const startTime = performance.now();
    
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function outQuad
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(target * easeProgress);
        
        element.textContent = currentVal + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    };
    requestAnimationFrame(update);
};

const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            const numEl = entry.target.querySelector('.stat-number');
            if (numEl) {
                const text = numEl.textContent;
                const numeric = parseInt(text.match(/\d+/)?.[0] || '0', 10);
                const suffix = text.replace(/\d/g, '');
                runCounterAnimation(numEl, numeric, suffix);
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.stat-box').forEach(box => metricObserver.observe(box));
