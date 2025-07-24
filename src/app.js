// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle hamburger icon
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for animations
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

// Observe all project cards and section titles
document.querySelectorAll('.project-card, .section-title').forEach(el => {
    observer.observe(el);
});

// Add staggered animation delay to project cards
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateX(10px)';
        skill.style.color = '#4fc3a5';
    });

    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateX(0)';
        skill.style.color = '#64ffda';
    });
});

// Add parallax effect to hero section (only on desktop)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.floating-code');

    // Only apply parallax on desktop (screen width > 768px)
    if (parallax && window.innerWidth > 768) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add click tracking for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const projectTitle = link.closest('.project-card').querySelector('.project-title').textContent;
        console.log(`Project link clicked: ${projectTitle}`);
        // You can add analytics tracking here
    });
});

// Add dynamic copyright year
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Chris Davis. Built with passion and lots of coffee.`;
}

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #64ffda;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Add theme toggle functionality (optional)
const addThemeToggle = () => {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #64ffda;
        border: none;
        color: #0f0f23;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
        themeToggle.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.4)';
    });

    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
        themeToggle.style.boxShadow = 'none';
    });

    document.body.appendChild(themeToggle);
};

// Initialize theme toggle
addThemeToggle();

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);

        // Show a fun message
        const message = document.createElement('div');
        message.textContent = '🎉 Konami Code Activated! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #64ffda;
            color: #0f0f23;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);

        konamiCode = [];
    }
});

// Performance optimization - Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add animation on scroll for elements
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-item, .contact-item');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(el => elementObserver.observe(el));
};

// Initialize animations
animateOnScroll();

// Add random floating particles (optional visual enhancement)
const createParticles = () => {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #64ffda;
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
};

// Initialize particles on hero section only
if (document.querySelector('.hero')) {
    createParticles();
}

// ============================================
// MOBILE PROJECTS MODAL FUNCTIONALITY
// ============================================

const mobileCards = document.querySelectorAll('.mobile-card');
let modalOverlay = null;

// Create modal overlay
function createModal() {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title"></h2>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-frame"></div>
                <div class="modal-info">
                    <div class="modal-description"></div>
                    <div class="modal-tech"></div>
                    <div class="modal-features">
                        <h4>Key Features</h4>
                        <ul class="modal-features-list"></ul>
                    </div>
                </div>
                <div class="modal-gallery">
                    <h4>Project Gallery</h4>
                    <div class="gallery-grid"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // Close modal functionality
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

// Open modal with project data
function openModal(card) {
    if (!modalOverlay) {
        createModal();
    }

    const title = card.dataset.title;
    const description = card.dataset.description;
    const tech = card.dataset.tech;
    const features = card.dataset.features;
    const gallery = JSON.parse(card.dataset.gallery);

    // Populate modal content
    modalOverlay.querySelector('.modal-title').textContent = title;
    modalOverlay.querySelector('.modal-description').textContent = description;

    // Clone the mobile frame for the modal
    const originalFrame = card.querySelector('.mobile-frame');
    const modalFrame = modalOverlay.querySelector('.modal-frame');
    modalFrame.innerHTML = originalFrame.outerHTML;

    // Add tech stack
    const techContainer = modalOverlay.querySelector('.modal-tech');
    techContainer.innerHTML = '';
    tech.split(', ').forEach(techItem => {
        const tag = document.createElement('span');
        tag.className = 'modal-tech-tag';
        tag.textContent = techItem;
        techContainer.appendChild(tag);
    });

    // Add features
    const featuresList = modalOverlay.querySelector('.modal-features-list');
    featuresList.innerHTML = '';
    features.split(', ').forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Add gallery images
    const galleryGrid = modalOverlay.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';
    gallery.forEach(imageUrl => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${imageUrl}" alt="Project screenshot" loading="lazy">`;
        galleryGrid.appendChild(galleryItem);

        // Add click handler for full-size image view
        galleryItem.addEventListener('click', () => {
            openImageViewer(imageUrl);
        });
    });

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Image viewer for gallery images
function openImageViewer(imageUrl) {
    const viewer = document.createElement('div');
    viewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
    `;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    `;
    
    viewer.appendChild(img);
    document.body.appendChild(viewer);

    viewer.addEventListener('click', () => {
        document.body.removeChild(viewer);
    });
}

// Add click handlers to mobile cards
mobileCards.forEach(card => {
    card.addEventListener('click', () => {
        openModal(card);
    });
});