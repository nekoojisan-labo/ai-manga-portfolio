/* ═══════════════════════════════════════════════════════
   茶々丸。ポートフォリオ - JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initCookieBanner();
    initNavigation();
    initSmoothScroll();
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
