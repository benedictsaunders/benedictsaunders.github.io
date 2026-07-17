/**
 * Personal Website - Interactive Scripts
 * Minimal JavaScript for enhanced UX
 */

(function() {
    'use strict';

    // ========================================
    // Dark Mode Toggle
    // ========================================
    
    const themeSwitch = document.querySelector('.theme-switch');
    const html = document.documentElement;
    
    // Check for saved preference or system preference
    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function setTheme(theme) {
        const isDark = theme === 'dark';
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
        
        // Update aria-checked for accessibility
        if (themeSwitch) {
            themeSwitch.setAttribute('aria-checked', isDark);
        }
    }
    
    // Initialize theme
    setTheme(getPreferredTheme());
    
    // Toggle on click
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ========================================
    // Live Clock in Footer
    // ========================================
    
    const timeElement = document.getElementById('currentTime');
    
    function updateTime() {
        if (timeElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Section Highlighting
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.style.color = '';
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.style.color = 'var(--color-text)';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // ========================================
    // Typing Effect for Terminal (Optional)
    // ========================================
    
    const heroName = document.querySelector('.hero-name');
    
    if (heroName && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.visibility = 'visible';
        
        let index = 0;
        function typeText() {
            if (index < text.length) {
                heroName.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe cards for fade-in animation
        document.querySelectorAll('.project-card, .research-card, .skill-category').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(card);
        });
    }

    // ========================================
    // Console Easter Egg
    // ========================================
    
    console.log('%c Hello there! 👋', 'font-size: 20px; font-weight: bold;');
    console.log('%c Curious about the code? Check out the source!', 'font-size: 14px;');
    console.log('%c Built with raw HTML, CSS, and vanilla JS.', 'font-size: 12px; color: #666;');

})();
