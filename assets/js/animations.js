/* ==========================================
   SHREEJI DIGITECH - ANIMATIONS
   Scroll Animations & Interactive Effects
   Author: Piyush Gupta
   ========================================== */

(function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed
    let counterAnimated = false;

    /**
     * Animate counter numbers
     */
    function animateCounters() {
        if (counterAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / speed;

            if (count < target) {
                const updateCount = () => {
                    const currentCount = parseInt(counter.innerText);
                    if (currentCount < target) {
                        counter.innerText = Math.ceil(currentCount + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            }
        });

        counterAnimated = true;
    }

    /**
     * Check if counter is in viewport
     */
    function checkCounters() {
        const triggerBottom = window.innerHeight * 0.8;

        counters.forEach(counter => {
            const counterTop = counter.getBoundingClientRect().top;

            if (counterTop < triggerBottom && !counterAnimated) {
                animateCounters();
            }
        });
    }

    // Scroll event for counters
    if (counters.length > 0) {
        window.addEventListener('scroll', checkCounters);
        checkCounters(); // Check on load
    }

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function parallaxScroll() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', parallaxScroll);
    }

    // Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');

    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    if (revealElements.length > 0) {
        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing Effect
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
        let index = 0;

        element.innerText = '';

        function type() {
            if (index < text.length) {
                element.innerText += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    });

    // Fade In Elements
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }

    if (fadeElements.length > 0) {
        window.addEventListener('scroll', checkFade);
        checkFade(); // Check on load
    }

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const barFill = bar.querySelector('.progress-fill');
            
            if (barFill) {
                const elementTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight * 0.8) {
                    barFill.style.width = progress + '%';
                }
            }
        });
    }

    if (progressBars.length > 0) {
        window.addEventListener('scroll', animateProgressBars);
        animateProgressBars(); // Check on load
    }

    // Stagger Animation
    const staggerGroups = document.querySelectorAll('[data-stagger]');

    staggerGroups.forEach(group => {
        const children = group.children;
        const delay = parseInt(group.getAttribute('data-stagger')) || 100;

        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * delay}ms`;
        });
    });

    // Mouse Move Parallax Effect
    const parallaxMouseElements = document.querySelectorAll('[data-parallax-mouse]');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxMouseElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-mouse')) || 0.5;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;

            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Loading Animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Image Lazy Loading (Fallback for older browsers)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Scroll Direction Detection
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            document.body.classList.add('scroll-down');
            document.body.classList.remove('scroll-up');
        } else {
            // Scrolling up
            document.body.classList.add('scroll-up');
            document.body.classList.remove('scroll-down');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

})();