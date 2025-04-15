document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const navLinks = document.getElementById('navLinks');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');

    // Mobile Navigation Toggle
    mobileNavToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        // Change icon between hamburger and X
        if (navLinks.classList.contains('active')) {
            mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile nav when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Animate sections on scroll
        animateSections();

        // Animate skill bars when skills section is in view
        animateSkillBars();
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in class to elements
    document.querySelectorAll('.skill-category, .achievement-card, .timeline-item').forEach(element => {
        element.classList.add('fade-in');
    });

    // Function to animate sections on scroll
    function animateSections() {
        const triggerBottom = window.innerHeight * 0.8;

        document.querySelectorAll('.fade-in').forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                // Add delay classes dynamically
                element.classList.add(`delay-${(index % 5) + 1}`);
                element.classList.add('show');
            }
        });
    }

    // Function to animate skill bars when in view
    function animateSkillBars() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
            skillBars.forEach(bar => {
                const progress = bar.dataset.progress;
                bar.style.width = `${progress}%`;
            });
        }
    }

    // Initial animations
    setTimeout(() => {
        animateSections();
        animateSkillBars();
    }, 300);
});