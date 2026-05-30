// Mobile Navigation Infrastructure
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

// Close Mobile Overlay When a Navigation Target is Tapped
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
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

// Clean Dynamic Elements Counter Animation
const runCounterAnimation = (element, target, suffix = '') => {
    const duration = 1600;
    const startTime = performance.now();
    
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
}, { threshold: 0.15 });

document.querySelectorAll('.stat-box').forEach(box => metricObserver.observe(box));

// Handle Keyboard Escape Commands to Dismiss Mobile Drawer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});
