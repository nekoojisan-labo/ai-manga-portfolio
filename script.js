'use strict';

/* ═══════════════════════════════════════════════════════
   XSS Escape Function
   ═══════════════════════════════════════════════════════ */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* ═══════════════════════════════════════════════════════
   Form Validators
   ═══════════════════════════════════════════════════════ */
const validators = {
    required: (value) => value.trim() !== '' || 'この項目は必須です',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '正しいメールアドレスを入力してください',
    noScript: (value) => !/<script|javascript:|on\w+=/i.test(value) || '不正な文字が含まれています'
};

/* ═══════════════════════════════════════════════════════
   DOM Content Loaded
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

    /* Cookie Banner */
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    if (cookieBanner && cookieAccept) {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            cookieBanner.classList.add('hidden');
        }
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.add('hidden');
        });
    }

    /* Header Scroll Effect */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolled', window.scrollY > 50);
        });
    }

    /* Mobile Menu */
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
        });
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.setAttribute('aria-expanded', 'false');
                navList.classList.remove('active');
            });
        });
    }

    /* Scroll Animation */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    /* Form Validation */
    const form = document.getElementById('contactForm');
    if (form) {
        function validateField(field) {
            const value = field.value.trim();
            const errorEl = document.getElementById(field.id + '-error');
            let isValid = true;
            let message = '';

            if (field.required && !value) {
                isValid = false;
                message = 'この項目は必須です';
            } else if (field.type === 'email' && value) {
                const result = validators.email(value);
                if (result !== true) { isValid = false; message = result; }
            } else if (value) {
                const result = validators.noScript(value);
                if (result !== true) { isValid = false; message = result; }
            }

            if (errorEl) errorEl.textContent = message;
            field.classList.toggle('form__input--error', !isValid);
            field.setAttribute('aria-invalid', !isValid);
            return isValid;
        }

        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) { console.log('Bot detected'); return; }

            let isValid = true;
            form.querySelectorAll('input[required], textarea[required]').forEach(field => {
                if (!validateField(field)) isValid = false;
            });

            if (isValid) {
                alert('送信が完了しました！（デモ）');
                form.reset();
            }
        });
    }

    /* Smooth Scroll for Anchor Links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
