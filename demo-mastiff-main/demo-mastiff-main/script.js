// Enhanced JavaScript for the wireframe
// Handles interactive elements, animations, and event planner functionality

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('fade-out');
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statsSection = document.querySelector('.about-stats');
        
        const animateStats = function() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const timer = setInterval(function() {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
            });
        };
        
        // Trigger animation when stats section is in view
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
        
        observer.observe(statsSection);
    }

    // Case Studies Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseSlides = document.querySelectorAll('.case-slide');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide case studies based on filter
                caseSlides.forEach(slide => {
                    if (filter === 'all' || slide.getAttribute('data-category') === filter) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                });
            });
        });
    }

    // Case Studies Slider Navigation
    const caseSlider = document.querySelector('.case-slider');
    const casePrev = document.querySelector('.case-prev');
    const caseNext = document.querySelector('.case-next');
    
    if (caseSlider && casePrev && caseNext) {
        let currentSlide = 0;
        const visibleSlides = window.innerWidth < 768 ? 1 : 2;
        const totalSlides = caseSlides.length;
        
        // Initialize slider
        updateSlider();
        
        casePrev.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        caseNext.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        function updateSlider() {
            caseSlides.forEach((slide, index) => {
                if (index >= currentSlide && index < currentSlide + visibleSlides) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }
        
        // Update slider on window resize
        window.addEventListener('resize', function() {
            const newVisibleSlides = window.innerWidth < 768 ? 1 : 2;
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                updateSlider();
            }
        });
    }

    // Interactive Event Planner
    const plannerSteps = document.querySelectorAll('.planner-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const eventTypeCards = document.querySelectorAll('.event-type-card');
    
    if (plannerSteps.length > 0) {
        // Event type selection
        eventTypeCards.forEach(card => {
            card.addEventListener('click', function() {
                eventTypeCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                // Store selected event type
                const eventType = this.querySelector('.event-type-title').textContent;
                document.getElementById('selected-event-type').textContent = eventType;
            });
        });
        
        // Next step buttons
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = parseInt(this.closest('.planner-step').getAttribute('data-step'));
                const nextStep = parseInt(this.getAttribute('data-next'));
                
                // Hide current step
                document.querySelector(`.planner-step[data-step="${currentStep}"]`).classList.remove('active');
                document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
                
                // Show next step
                document.querySelector(`.planner-step[data-step="${nextStep}"]`).classList.add('active');
                document.querySelector(`.progress-step[data-step="${nextStep}"]`).classList.add('active');
            });
        });
        
        // Previous step buttons
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = parseInt(this.closest('.planner-step').getAttribute('data-step'));
                const prevStep = parseInt(this.getAttribute('data-prev'));
                
                // Hide current step
                document.querySelector(`.planner-step[data-step="${currentStep}"]`).classList.remove('active');
                document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
                
                // Show previous step
                document.querySelector(`.planner-step[data-step="${prevStep}"]`).classList.add('active');
                document.querySelector(`.progress-step[data-step="${prevStep}"]`).classList.add('active');
            });
        });
        
        // Form submission
        const plannerForm = document.querySelector('.planner-step[data-step="4"] form');
        if (plannerForm) {
            plannerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                const formContainer = this.closest('.planner-content');
                formContainer.innerHTML = `
                    <div class="submission-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p>Your event planning request has been submitted successfully. One of our event specialists will contact you within 24 hours to discuss your requirements in detail.</p>
                        <button class="btn btn-primary" onclick="window.location.reload()">Plan Another Event</button>
                    </div>
                `;
            });
        }
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .case-slide, .team-member, .event-type-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Hero parallax
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
        
        // About image parallax
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            const aboutOffset = aboutImage.offsetTop;
            if (scrollPosition > aboutOffset - window.innerHeight) {
                const parallaxValue = (scrollPosition - (aboutOffset - window.innerHeight)) * 0.1;
                aboutImage.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
    });
});
