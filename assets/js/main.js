/**
 * WebStore Hub - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const offcanvasThemeToggle = document.getElementById('offcanvasThemeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function applyThemeChange() {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', applyThemeChange);
    }

    if (offcanvasThemeToggle) {
        offcanvasThemeToggle.addEventListener('click', applyThemeChange);
    }

    function updateThemeIcon(theme) {
        const isDark = theme === 'dark';
        const iconClass = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        // Update navbar toggle icon
        const navIcon = themeToggle?.querySelector('i');
        if (navIcon) navIcon.className = iconClass;

        // Update offcanvas toggle icon & text
        if (offcanvasThemeToggle) {
            const offIcon = offcanvasThemeToggle.querySelector('i');
            if (offIcon) offIcon.className = iconClass + ' me-2';
            offcanvasThemeToggle.childNodes[offcanvasThemeToggle.childNodes.length - 1].textContent = ' ' + label;
        }
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-up').forEach(el => observer.observe(el));

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Hero Section Mouse Tracking
    const heroSection = document.querySelector('.hero-section');
    const blobs = document.querySelectorAll('.bloom-blob');

    if (heroSection && blobs.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 30;
            const moveY = (clientY - centerY) / 30;

            blobs[0].style.transform = `translate(${moveX}px, ${moveY}px)`;
            blobs[1].style.transform = `translate(${-moveX}px, ${-moveY}px)`;
            blobs[2].style.transform = `translate(${moveX * 0.5}px, ${-moveY * 0.5}px)`;
        });
    }
});
