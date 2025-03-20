document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        
        // Transform hamburger into X
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Create space particles
    createSpaceParticles();
    
    // Add floating animation to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.animation = `floating ${3 + (index % 3) * 0.5}s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Move stars and twinkling layers at different speeds
        document.querySelector('.stars').style.transform = `translateY(${scrollPosition * 0.1}px)`;
        document.querySelector('.twinkling').style.transform = `translateY(${scrollPosition * 0.15}px)`;
        
        // Parallax for section titles
        document.querySelectorAll('.section-title').forEach(title => {
            const distanceFromTop = title.getBoundingClientRect().top;
            if (distanceFromTop < window.innerHeight) {
                title.style.transform = `translateY(${(window.innerHeight - distanceFromTop) * 0.05}px)`;
            }
        });
    });
    
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(0, 191, 255, 0.9)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.event-card, .coordinator');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Call reveal function on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial call to reveal visible elements
    revealOnScroll();
});

// Create space particles
function createSpaceParticles() {
    const mainBanner = document.querySelector('.main-banner');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('space-particle');
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.bottom = '0';
        
        // Random color
        const colors = ['#ffffff', '#8a2be2', '#00bfff', '#ff1493'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        mainBanner.appendChild(particle);
    }
}

// Add cosmic typing effect to banner text
document.addEventListener('DOMContentLoaded', function() {
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    
    // Clear the original text
    subtitle.textContent = '';
    
    // Type effect function
    function typeEffect(element, text, speed, callback) {
        let i = 0;
        const timer = setInterval(function() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }
    
    // Start typing after a short delay
    setTimeout(() => {
        typeEffect(subtitle, originalText, 100, function() {
            // Add blinking cursor after typing
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            subtitle.appendChild(cursor);
            
            // Add blinking keyframe
            const style = document.createElement('style');
            style.textContent = `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });
    }, 1000);
});