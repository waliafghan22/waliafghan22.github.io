// Smooth scrolling for navigation links, including '/#section' on home page
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href) return;

        // Determine the hash target
        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;
        const hash = href.slice(hashIndex);
        const target = document.querySelector(hash);

        // Only intercept if link points to the same page (root or current path)
        const link = this;
        const linkPath = link.pathname || '';
        const samePage = (linkPath === window.location.pathname) || (linkPath === '/' && window.location.pathname === '/');

        if (samePage && target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

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
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            // update active state on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const show = filter === 'all' || category === filter;
                card.style.display = show ? '' : 'none';
            });
        });
    });
}