/* ═══════════════════════════════════════════════════════
   茶々丸。ポートフォリオ - JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initCookieBanner();
    initNavigation();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations();
});

/* Cookie Banner */
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    
    if (!banner || !acceptBtn) return;
    
    // Check if already accepted
    if (localStorage.getItem('cookieAccepted')) {
        banner.classList.add('hidden');
        return;
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        banner.classList.add('hidden');
    });
}

/* Navigation */
function initNavigation() {
    const nav = document.querySelector('.nav-main');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    // Scroll effect
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

/* Smooth Scroll */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.nav-main')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const links = document.querySelector('.nav-links');
            const toggle = document.querySelector('.nav-toggle');
            if (links?.classList.contains('active')) {
                links.classList.remove('active');
                toggle?.classList.remove('active');
            }
        });
    });
}

/* Form Validation */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const validators = {
        name: {
            validate: (value) => value.trim().length >= 1 && value.trim().length <= 100,
            message: 'お名前を入力してください'
        },
        email: {
            validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) && value.length <= 254;
            },
            message: '有効なメールアドレスを入力してください'
        },
        message: {
            validate: (value) => value.trim().length >= 1 && value.trim().length <= 5000,
            message: 'お問い合わせ内容を入力してください'
        }
    };
    
    // Real-time validation
    Object.keys(validators).forEach(fieldName => {
        const field = form.querySelector(`#${fieldName}`);
        const errorEl = document.getElementById(`${fieldName}-error`);
        
        if (!field || !errorEl) return;
        
        field.addEventListener('blur', () => {
            validateField(field, validators[fieldName], errorEl);
        });
        
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field, validators[fieldName], errorEl);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Honeypot check
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            console.log('Bot detected');
            return;
        }
        
        let isValid = true;
        
        Object.keys(validators).forEach(fieldName => {
            const field = form.querySelector(`#${fieldName}`);
            const errorEl = document.getElementById(`${fieldName}-error`);
            
            if (!validateField(field, validators[fieldName], errorEl)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信しました！';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

function validateField(field, validator, errorEl) {
    if (!field || !validator || !errorEl) return true;
    
    const isValid = validator.validate(field.value);
    
    if (isValid) {
        field.classList.remove('error');
        errorEl.textContent = '';
        return true;
    } else {
        field.classList.add('error');
        errorEl.textContent = validator.message;
        return false;
    }
}

/* Scroll Animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-grid, .problem-card, .testimonial-card, ' +
        '.work-card, .process-step, .service-card, .contact-wrapper'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}
