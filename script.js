// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navbar.style.backgroundColor = 'var(--bg-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for fade-in animations
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

// Observe all service cards, experience items, project cards
document.querySelectorAll('.service-card, .experience-item, .project-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const errorContainer = document.createElement('div');
errorContainer.id = 'form-errors';
errorContainer.style.display = 'none';
errorContainer.style.padding = '1rem';
errorContainer.style.marginBottom = '1rem';
errorContainer.style.background = '#fee';
errorContainer.style.border = '1px solid #fcc';
errorContainer.style.borderRadius = '8px';
errorContainer.style.color = '#c33';

if (contactForm) {
    contactForm.parentNode.insertBefore(errorContainer, contactForm);
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        errorContainer.style.display = 'none';
        errorContainer.innerHTML = '';
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            company: document.getElementById('company').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };
        
        const errors = [];
        
        // Validate form
        if (!formData.name) errors.push('Name is required');
        if (!formData.email) errors.push('Email is required');
        if (!formData.subject) errors.push('Subject is required');
        if (!formData.message) errors.push('Message is required');
        
        // Email validation using standard pattern
        if (formData.email && !/^[^\s@]+@[^\s@.]+\.[^\s@.]+$/.test(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (errors.length > 0) {
            errorContainer.innerHTML = '<strong>Please fix the following errors:</strong><ul style="margin: 0.5rem 0 0 1.5rem;">' + 
                errors.map(e => `<li>${e}</li>`).join('') + '</ul>';
            errorContainer.style.display = 'block';
            return;
        }
        
        // Show success message
        errorContainer.style.background = '#efe';
        errorContainer.style.border = '1px solid #cfc';
        errorContainer.style.color = '#3c3';
        errorContainer.innerHTML = '<strong>Thank you!</strong> Your message has been received. I will get back to you soon.';
        errorContainer.style.display = 'block';
        contactForm.reset();
        
        // In a production environment, you would send this data to a server
        console.log('Form submitted:', formData);
    });
}

// Add animation to skill tags on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Trigger counter animation when stat boxes come into view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const target = parseInt(statNumber.textContent);
                animateCounter(statNumber, target);
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statObserver.observe(box);
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active styling for navigation links
const style = document.createElement('style');
style.innerHTML = `
    .nav-link.active {
        color: var(--primary-light) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Lazy load images if any are added in the future
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Log that script has loaded
console.log('Portfolio interactive features loaded successfully!');
