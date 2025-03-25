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
});const angle = 20;

const lerp = (start, end, amount) => {
    return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    return Math.min(Math.max(newValue, -newMax), newMax);
};

window.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const centerX = (rect.left + rect.right) / 2;
            const centerY = (rect.top + rect.bottom) / 2;
            const posX = event.clientX - centerX;
            const posY = event.clientY - centerY;
            const x = remap(posX, rect.width / 2, angle);
            const y = remap(posY, rect.height / 2, angle);

            card.dataset.rotateX = x;
            card.dataset.rotateY = -y;
        });

        card.addEventListener("mouseout", () => {
            card.dataset.rotateX = 0;
            card.dataset.rotateY = 0;
        });
    });

    const update = () => {
        cards.forEach((card) => {
            let currentX = parseFloat(card.style.getPropertyValue('--rotateY')) || 0;
            let currentY = parseFloat(card.style.getPropertyValue('--rotateX')) || 0;
            const x = lerp(currentX, card.dataset.rotateX, 0.1);
            const y = lerp(currentY, card.dataset.rotateY, 0.1);

            card.style.setProperty("--rotateY", x + "deg");
            card.style.setProperty("--rotateX", y + "deg");
        });
    };

    setInterval(update, 1000 / 60);

    // Initialize Swiper with extra left padding for the first card
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3, // Show 3 cards at once
        spaceBetween: 30,
        loop: false,
        centeredSlides: true, // Center the slides
        slidesPerGroup: 3, // Move 3 slides at a time
        initialSlide: 0, // Start from the first card
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    });
});
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 500 / 700, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(450, 500);
document.getElementById('left-side').appendChild(renderer.domElement);

// Load GLTF 3D Rocket Model
const loader = new THREE.GLTFLoader();
let rocket;

loader.load('models/rocket.glb', function (gltf) {
    rocket = gltf.scene;
    rocket.scale.set(2, 2, 2);  // Adjust rocket size
    rocket.position.y = -1;  // Center the model
    scene.add(rocket);
}, undefined, function (error) {
    console.error("Error loading the model:", error);
});

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Camera Position
camera.position.z = 6;

// Hover Animation (Tilt Effect)
document.querySelector(".card-container").addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (rocket) {
        rocket.rotation.y = x * 0.5;
        rocket.rotation.x = y * 0.5;
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if (rocket) {
        rocket.rotation.y  += 0.005;  // Slow auto-rotation
    }
    renderer.render(scene, camera);
}
animate();


