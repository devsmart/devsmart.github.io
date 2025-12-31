// Modern Personal Website - JavaScript

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to OS preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Check OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme
function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update icon
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme on page load
const preferredTheme = getPreferredTheme();
setTheme(preferredTheme);

// Theme toggle event listener
themeToggle?.addEventListener('click', toggleTheme);

// Listen for OS theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll event for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate on Scroll (AOS) - Simple implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(el => observer.observe(el));

// Particle effect for hero section
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particle-float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text.replace('+', ''));

                animateCounter(stat, number);
                if (hasPlus) {
                    stat.textContent = number + '+';
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.background = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.zIndex = '9999';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.cursor = 'pointer';
            lightbox.style.animation = 'fadeIn 0.3s ease';

            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.maxWidth = '90%';
            lightboxImg.style.maxHeight = '90%';
            lightboxImg.style.objectFit = 'contain';
            lightboxImg.style.borderRadius = '0.5rem';

            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
        }
    });
});

// Add fade animations
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeStyle);

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        const scrolled = window.scrollY;
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skill tags animation on hover
const skillTags = document.querySelectorAll('.skill-tags span');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
});

// Form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy loading for images
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

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add cursor effect (optional fancy feature)
let cursor = null;
let cursorFollower = null;

function createCustomCursor() {
    cursor = document.createElement('div');
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.border = '2px solid #6366f1';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '10000';
    cursor.style.transition = 'transform 0.1s ease';

    cursorFollower = document.createElement('div');
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
    cursorFollower.style.border = '1px solid #6366f1';
    cursorFollower.style.borderRadius = '50%';
    cursorFollower.style.position = 'fixed';
    cursorFollower.style.pointerEvents = 'none';
    cursorFollower.style.zIndex = '9999';
    cursorFollower.style.transition = 'transform 0.15s ease';
    cursorFollower.style.opacity = '0.5';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 5 + 'px';
        cursor.style.top = e.clientY - 5 + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 50);
    });

    // Scale cursor on hover over clickable elements
    const clickables = document.querySelectorAll('a, button, .gallery-item');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Only create custom cursor on desktop
if (window.innerWidth > 768) {
    createCustomCursor();
}

// Console message
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #94a3b8;');
console.log('%cEmail: me@harshana.net', 'font-size: 12px; color: #cbd5e1;');

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');

    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});
