// Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe step cards and battle cards
    document.querySelectorAll('.step-item, .battle-card, .place-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add telegram bot link functionality (placeholder)
    document.querySelectorAll('.btn[href="#"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would redirect to your actual Telegram bot
            // For now, show an alert
            alert('Telegram-бот скоро будет доступен! Следите за обновлениями.');
        });
    });

    // Countdown timer for the first battle
    const battleDate = new Date('2025-12-11T11:00:00');

    let previousValues = {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    };

    function updateCountdown() {
        const now = new Date();
        const diff = battleDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Update each value with flip animation
            updateValue('days', days);
            updateValue('hours', hours);
            updateValue('minutes', minutes);
            updateValue('seconds', seconds);
        } else {
            // Battle has started
            document.querySelectorAll('.countdown-value').forEach(el => {
                el.textContent = '00';
            });
        }
    }

    function updateValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            const paddedValue = String(value).padStart(2, '0');

            if (previousValues[id] !== paddedValue) {
                // Add flip animation
                element.classList.add('flip-animation');

                setTimeout(() => {
                    element.textContent = paddedValue;
                    element.classList.remove('flip-animation');
                }, 300);

                previousValues[id] = paddedValue;
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second

    // Add animation to stats numbers
    const stats = document.querySelectorAll('.stat-value');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        statsObserver.observe(document.querySelector('.hero-stats'));
    }

    function animateStats() {
        stats.forEach(stat => {
            const target = stat.textContent;
            const number = parseInt(target.replace(/[^0-9]/g, ''));
            const suffix = target.replace(/[0-9]/g, '');
            let current = 0;
            const increment = number / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    }

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            // Mobile menu functionality can be added here
        }
    };

    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
});