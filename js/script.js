let lastNoteTime = 0;
function initMouseNoteEffect() {
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastNoteTime < 100) return;
        lastNoteTime = now;

        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = '<i class="fas fa-music"></i>';
        note.style.left = e.clientX + 'px';
        note.style.top = e.clientY + 'px';
        document.body.appendChild(note);

        setTimeout(() => {
            note.style.transform = 'translate(-50%, -80px)';
            note.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            note.remove();
        }, 1000);
    });
}

function initCardTiltEffect() {
    document.addEventListener('mousemove', (e) => {
        const skillCards = document.querySelectorAll('.skill-category, .project-card');
        skillCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const centerX = rect.width / 2;


            const rotateY = Math.max(-10, Math.min(10, (x - centerX) / 10));

            card.style.transform = `
                perspective(1000px) 
                rotateY(${rotateY}deg)
            `;
        });
    });

    document.querySelectorAll('.skill-category, .project-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0)';
        });
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.backgroundColor = '#ff9900';

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Submitted successfully';
                btn.style.backgroundColor = '#48bb78';

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    btn.style.backgroundColor = '';
                }, 1000);

                this.reset();
            }, 2000);
        });
    }
}

function initTypewriterEffect() {
    const heroText = document.querySelector('.highlight');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        window.addEventListener('load', typeWriter);
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navLinks && menuToggle && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }

                if (targetId === '#contact') {
                    const contactForm = document.getElementById('contactForm');
                    if (contactForm) {
                        setTimeout(() => {
                            const firstInput = contactForm.querySelector('input, textarea');
                            if (firstInput) firstInput.focus();
                        }, 500);
                    }
                }
            }
        });
    });
}

function initSectionRevealEffect() {
    const revealSections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        revealSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('revealed');
            }
        });
    });
}
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}



function initializePageEffects() {
    initMouseNoteEffect();
    initCardTiltEffect();
    setupContactForm();
    initTypewriterEffect();
    setupSmoothScroll();
    initSectionRevealEffect();
    setupMobileMenu();

    //update: 27/11/2024
    initAdvancedDarkMode();
}


document.addEventListener('DOMContentLoaded', initializePageEffects);