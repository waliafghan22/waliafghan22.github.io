/*!
 * Portfolio Theme - Complete JavaScript
 * Author: Mohammed Wali
 * Version: 3.2.0
 * Features: Theme Toggle, Navigation, Filtering, Animations, Scroll Effects
 */

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Debounce function to limit event handler calls
 */
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function for scroll events
 */
const throttle = (func, limit = 100) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/* ========================================
   DARK/LIGHT THEME TOGGLE
   ======================================== */

const initThemeToggle = () => {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button if it doesn't exist
    let themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        // Create toggle button
        themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.setAttribute('title', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.innerHTML = savedTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        // Add to nav menu
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const themeItem = document.createElement('li');
            themeItem.className = 'nav-item';
            themeItem.appendChild(themeToggle);
            navMenu.appendChild(themeItem);
        }
    }
    
    // Toggle theme function
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon and tooltip
        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('title', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        
        // Optional: Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    };
    
    // Add click event
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
};

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */

const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
};

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

const initSmoothScrolling = () => {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;

            // Determine the hash target
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;
            
            const hash = href.slice(hashIndex);
            if (hash === '#') return;
            
            const target = document.querySelector(hash);

            // Only intercept if link points to the same page
            const linkPath = this.pathname || '';
            const currentPath = window.location.pathname;
            const samePage = (linkPath === currentPath) || 
                            (linkPath === '/' && currentPath === '/') ||
                            linkPath === '';

            if (samePage && target) {
                e.preventDefault();
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, hash);
                }
            }
        });
    });
};

/* ========================================
   MOBILE MENU
   ======================================== */

const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (!hamburger || !navMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
};

// Export close menu function for external use
const closeMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

/* ========================================
   ACTIVE NAVIGATION HIGHLIGHT
   ======================================== */

const initActiveNavigation = () => {
    const handleScroll = debounce(() => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active state on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (!href) return;
            
            let targetId = '';
            if (href.startsWith('#')) {
                targetId = href.slice(1);
            } else if (href.includes('#')) {
                targetId = href.split('#')[1];
            }
            
            if (targetId && targetId === current) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
};

/* ========================================
   PROJECT FILTERING
   ======================================== */

const initProjectFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with staggered animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    // Show card with delay
                    card.classList.remove('hidden');
                    card.style.display = '';
                    card.style.animation = 'none';
                    
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.5s ease forwards`;
                    }, index * 50);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
};

/* ========================================
   SKILL PROGRESS BARS ANIMATION
   ======================================== */

const initSkillProgressBars = () => {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const progress = bar.style.getPropertyValue('--progress');
                        if (progress) {
                            bar.style.width = progress;
                        }
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        // Reset progress bars
        document.querySelectorAll('.skill-progress-bar').forEach(bar => {
            bar.style.width = '0%';
        });
        observer.observe(skillsSection);
    }
};

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.remove('fade-out');
            }
        });
    }, observerOptions);

    // Observe sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .skill-category, .contact-card, .stat-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });
};

/* ========================================
   HERO TYPING ANIMATION (Optional)
   ======================================== */

const initTypingAnimation = () => {
    const heroTitle = document.querySelector('.title-main');
    if (!heroTitle || heroTitle.dataset.typed) return;

    const text = heroTitle.textContent;
    const shouldAnimate = window.innerWidth > 768; // Only on desktop
    
    if (!shouldAnimate) return;
    
    heroTitle.dataset.typed = 'true';
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
};

/* ========================================
   HERO STATS COUNTER ANIMATION
   ======================================== */

const initStatsCounter = () => {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));

                if (!isNaN(numericValue) && numericValue > 0) {
                    animateCounter(target, numericValue, finalValue);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
};

const animateCounter = (element, target, originalText) => {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    const suffix = originalText.replace(/[\d,]/g, ''); // Get '+' or other suffix

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
};

/* ========================================
   SCREENSHOT CAROUSEL (Project Detail Pages)
   ======================================== */

const initScreenshotNavigation = () => {
    const scroller = document.querySelector('.screenshots-scroller');
    const dots = document.querySelectorAll('.screenshot-dot');
    const screenshots = document.querySelectorAll('.screenshot-card');
    
    if (!scroller || !dots.length || !screenshots.length) return;

    let modal = document.querySelector('.screenshot-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'screenshot-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" aria-label="Close full screen screenshot">&times;</button>
                <img class="modal-image" src="" alt="Full size screenshot">
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('.modal-image');
    const closeModalBtn = modal.querySelector('.close-modal');

    // Drag state
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let startTime = 0;
    let isClick = true;

    const setBodySelection = (value) => {
        document.body.style.userSelect = value ? '' : 'none';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Attach drag listeners
    scroller.addEventListener('mousedown', handleDragStart);
    scroller.addEventListener('touchstart', handleDragStart, { passive: false });
    scroller.addEventListener('mousemove', handleDrag);
    scroller.addEventListener('touchmove', handleDrag, { passive: false });
    scroller.addEventListener('mouseup', handleDragEnd);
    scroller.addEventListener('touchend', handleDragEnd);
    scroller.addEventListener('mouseleave', handleDragEnd);

    // Prevent default dragging on images + zoom
    scroller.querySelectorAll('img').forEach((img) => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.addEventListener('click', () => {
            if (!isDragging && isClick) {
                modalImg.src = img.src.replace('-thumb', '');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    function handleDragStart(e) {
        isDragging = true;
        isClick = true;
        startTime = Date.now();
        startX = (e.pageX || e.touches?.[0].pageX || 0) - scroller.offsetLeft;
        scrollStart = scroller.scrollLeft;
        scroller.style.scrollBehavior = 'auto';
        scroller.classList.add('is-dragging');
        setBodySelection(false);
    }

    function handleDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = (e.pageX || e.touches?.[0].pageX || 0) - scroller.offsetLeft;
        const walk = (currentPosition - startX) * 1.4;
        scroller.scrollLeft = scrollStart - walk;
        if (Math.abs(walk) > 5) {
            isClick = false;
        }
        updateActiveDot();
    }

    function handleDragEnd() {
        if (!isDragging) return;
        const dragDuration = Date.now() - startTime;
        isDragging = false;
        scroller.classList.remove('is-dragging');
        setBodySelection(true);

        if (dragDuration < 150 && isClick) {
            return;
        }

        const positions = Array.from(screenshots).map((card) => card.offsetLeft);
        const targetIndex = positions.reduce((closestIndex, currentPos, index) => {
            const currentDiff = Math.abs(currentPos - scroller.scrollLeft);
            const closestDiff = Math.abs(positions[closestIndex] - scroller.scrollLeft);
            return currentDiff < closestDiff ? index : closestIndex;
        }, 0);

        goToSlide(targetIndex);
    }

    function goToSlide(index) {
        const safeIndex = Math.max(0, Math.min(index, screenshots.length - 1));
        const targetCard = screenshots[safeIndex];
        if (!targetCard) return;

        scroller.style.scrollBehavior = 'smooth';
        scroller.scrollTo({
            left: targetCard.offsetLeft,
            behavior: 'smooth'
        });
        updateActiveDot(safeIndex);
    }

    function updateActiveDot(forcedIndex) {
        let activeIndex = forcedIndex;
        if (typeof activeIndex !== 'number') {
            const scrollLeft = scroller.scrollLeft;
            const positions = Array.from(screenshots).map((card) => card.offsetLeft);
            activeIndex = positions.reduce((closestIndex, currentPos, index) => {
                const currentDiff = Math.abs(currentPos - scrollLeft);
                const closestDiff = Math.abs(positions[closestIndex] - scrollLeft);
                return currentDiff < closestDiff ? index : closestIndex;
            }, 0);
        }

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === activeIndex);
        });
    }

    updateActiveDot(0);
    scroller.addEventListener('scroll', debounce(() => updateActiveDot(), 120), { passive: true });
};

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */

const initBackToTop = () => {
    let backToTop = document.querySelector('.back-to-top');
    
    // Create button if it doesn't exist
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.setAttribute('title', 'Back to top');
        document.body.appendChild(backToTop);
    }

    const handleScroll = throttle(() => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
};

/* ========================================
   LAZY LOADING IMAGES (Fallback)
   ======================================== */

const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }

    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

/* ========================================
   EXTERNAL LINKS
   ======================================== */

const initExternalLinks = () => {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        const url = new URL(link.href);
        const currentDomain = window.location.hostname;
        
        // If link is external and doesn't already have target
        if (url.hostname !== currentDomain && !link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
};

/* ========================================
   FORM VALIDATION (if you add contact form)
   ======================================== */

const initFormValidation = () => {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get all required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit form or send data
                console.log('Form is valid, submitting...');
                // form.submit(); or use fetch/axios
            }
        });
    });
};

/* ========================================
   PERFORMANCE MONITORING (Development)
   ======================================== */

const logPerformance = () => {
    if ('performance' in window && window.location.hostname === 'localhost') {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('📊 Performance Metrics:');
                    console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
                    console.log('DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart), 'ms');
                    console.log('First Paint:', Math.round(perfData.responseEnd - perfData.fetchStart), 'ms');
                }
            }, 0);
        });
    }
};

/* ========================================
   INITIALIZE ALL FEATURES
   ======================================== */

const init = () => {
    console.log('🚀 Initializing Portfolio...');
    
    // Theme (Must be first)
    initThemeToggle();
    
    // Core functionality
    initNavbarScroll();
    initSmoothScrolling();
    initMobileMenu();
    initActiveNavigation();
    
    // Content features
    initProjectFiltering();
    initSkillProgressBars();
    initScrollAnimations();
    
    // Optional animations (can be disabled for performance)
    // initTypingAnimation();
    initStatsCounter();
    initScreenshotNavigation();
    
    // Enhancements
    initLazyLoading();
    initBackToTop();
    initExternalLinks();
    initFormValidation();
    
    // Development
    logPerformance();
    
    console.log('✅ Portfolio initialized successfully!');
};

/* ========================================
   START APPLICATION
   ======================================== */

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}

/* ========================================
   EVENT HANDLERS
   ======================================== */

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause videos or animations when page is hidden
        document.querySelectorAll('video').forEach(video => video.pause());
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('🟢 Back online');
});

window.addEventListener('offline', () => {
    console.log('🔴 Connection lost');
});

/* ========================================
   EXPORT FOR TESTING (Optional)
   ======================================== */

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        closeMobileMenu,
        debounce,
        throttle
    };
}

/* ========================================
   END OF MAIN.JS
   ======================================== */