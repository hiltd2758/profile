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

function initMusicEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentIndex = 0;

    document.addEventListener('keydown', (event) => {
        if (event.key === konamiCode[currentIndex]) {
            currentIndex++;

            if (currentIndex === konamiCode.length) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start();
                oscillator.stop(audioContext.currentTime + 1);

                alert('🎉 Bạn đã kích hoạt chế độ bí mật của nhạc sĩ công nghệ! 🎵');
                currentIndex = 0;
            }
        } else {
            currentIndex = 0;
        }
    });
}
function createScrollMusicVisualization() {
    const musicNotes = [ '♫', '♪','</>'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    window.addEventListener('scroll', () => {
        const note = document.createElement('div');
        note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)];
        note.style.position = 'absolute';
        note.style.left = `${Math.random() * window.innerWidth}px`;
        note.style.top = `${window.scrollY + Math.random() * 100}px`;
        note.style.fontSize = `${Math.random() * 30 + 10}px`;
        note.style.opacity = '0.3';
        note.style.transition = 'all 2s ease-out';

        container.appendChild(note);

        setTimeout(() => {
            note.style.transform = `translateY(${window.innerHeight}px)`;
            note.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            container.removeChild(note);
        }, 2000);
    });
}

function initAdvancedInteractions() {
    function addGlowEffect() {
        const interactiveElements = document.querySelectorAll('.project-card, .skill-category, .btn');

        interactiveElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                element.style.setProperty('--mouse-x', `${x}px`);
                element.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    function addVibrateEffect() {
        const vibrateElements = document.querySelectorAll('.btn, .social-icon');

        vibrateElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('vibrate');
                setTimeout(() => {
                    element.classList.remove('vibrate');
                }, 300);
            });
        });
    }

    function initParticleEffect() {
        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        document.body.addEventListener('click', (e) => {
            for (let i = 0; i < 10; i++) {
                createParticle(
                    e.clientX + (Math.random() - 0.5) * 50,
                    e.clientY + (Math.random() - 0.5) * 50
                );
            }
        });
    }

    addGlowEffect();
    addVibrateEffect();
    initParticleEffect();
}

function initUserInteractionTracking() {
    const interactionData = {
        pageViews: 0,
        scrollDepth: 0,
        timeSpent: 0,
        clickEvents: []
    };

    interactionData.pageViews++;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        interactionData.scrollDepth = Math.round(
            (scrollPosition / (documentHeight - windowHeight)) * 100
        );
    });


    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        interactionData.timeSpent = Math.round((Date.now() - startTime) / 1000);

        console.log('Dữ liệu tương tác:', interactionData);
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        const clickEvent = {
            element: target.tagName,
            class: target.className,
            timestamp: Date.now()
        };

        interactionData.clickEvents.push(clickEvent);
    });
}

function initializePageEffects() {
    initMouseNoteEffect();
    initCardTiltEffect();
    setupContactForm();
    initTypewriterEffect();
    setupSmoothScroll();
    initSectionRevealEffect();
    setupMobileMenu();

    initMusicEasterEgg();
    createScrollMusicVisualization();
    initAdvancedInteractions();
    initUserInteractionTracking();



}


document.addEventListener('DOMContentLoaded', initializePageEffects);