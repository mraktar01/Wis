// --- Security Check Start ---
if (sessionStorage.getItem("allowed") !== "true") {
    window.location.replace("index.html");
}
// --- Security Check End ---

// Your existing code starts here
document.addEventListener('DOMContentLoaded', function () {
    console.log('Birthday Surprise Website Loaded!');
    // ... rest of your code
// Main JavaScript file
        document.addEventListener('DOMContentLoaded', function () {
            console.log('Birthday Surprise Website Loaded!');

            // Elements
            const landingSection = document.getElementById('landingSection');
            const secondModal = document.getElementById('secondModal');
            const wishModal = document.getElementById('wishModal');
            const photoSection = document.getElementById('photoSection');
            const photoModal = document.getElementById('photoModal');

            const firstButton = document.getElementById('firstButton');
            const secondButton = document.getElementById('secondButton');
            const loveButton = document.getElementById('loveButton');
            const closePhotoModal = document.getElementById('closePhotoModal');

            const musicToggle = document.getElementById('musicToggle');
            const bgMusic = document.getElementById('bgMusic');

            const photoFrames = document.querySelectorAll('.photo-frame');
            const photoImage = document.getElementById('photoImage');
            const photoMessageText = document.getElementById('photoMessageText');

            // Photo messages
            const photoMessages = [
                "You are the quiet melody my heart remembers, even when the world is loud.",
                "In every crowded room, my eyes still seek your light first.",
                "My life wasn't missing anything, but you made it meaningful.",
                "Your presence is the anchor that makes even the wildest days feel calm.",
                "I find the profound joy in the small, sudden ways you simply exist.",
                "You are the beautiful contradiction: my greatest adventure and my safest home.",
                "Every care I hold is only a shadow of the deep, boundless care I hold for you.",
                "I didn't choose to love you; my soul simply recognized its direction."
            ];

            // Create particles
            createParticles();

            // Music toggle
            let musicPlaying = false;
            musicToggle.addEventListener('click', function () {
                if (musicPlaying) {
                    bgMusic.pause();
                    musicToggle.classList.remove('playing');
                } else {
                    bgMusic.play();
                    musicToggle.classList.add('playing');
                }
                musicPlaying = !musicPlaying;
            });

            // First button - Show second modal
            firstButton.addEventListener('click', function () {
                secondModal.classList.add('active');
            });

            // Second button - Show wish modal
            secondButton.addEventListener('click', function () {
                secondModal.classList.remove('active');
                setTimeout(() => {
                    wishModal.classList.add('active');
                }, 300);
            });

            // Love button - Show photo section
            loveButton.addEventListener('click', function () {
                wishModal.classList.remove('active');

                // --- This is the fix ---
                // Play music if it's not already playing
                if (!musicPlaying) {
                    bgMusic.play();
                    musicPlaying = true;
                    musicToggle.classList.add('playing');
                }
                // --- End of fix ---

                setTimeout(() => {
                    landingSection.classList.remove('active');
                    photoSection.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500);
            });

            // Photo frames click
            photoFrames.forEach((frame, index) => {
                frame.addEventListener('click', function () {
                    const placeholder = frame.querySelector('.photo-placeholder');
                    const img = frame.querySelector('img');

                    if (img) {
                        photoImage.src = img.src;
                    } else {
                        // Use placeholder gradient if no image
                        photoImage.src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:rgb(102,126,234);stop-opacity:1" />
                                <stop offset="100%" style="stop-color:rgb(118,75,162);stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <rect width="400" height="400" fill="url(#grad)" />
                        <text x="50%" y="50%" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.5">${index + 1}</text>
                    </svg>
                `);
                    }

                    photoMessageText.textContent = photoMessages[index];
                    photoModal.classList.add('active');
                });
            });

            // Close photo modal
            closePhotoModal.addEventListener('click', function () {
                photoModal.classList.remove('active');
            });

            // Close photo modal on background click
            photoModal.addEventListener('click', function (e) {
                if (e.target === photoModal) {
                    photoModal.classList.remove('active');
                }
            });

            // Create floating particles
            function createParticles() {
                const particlesContainer = document.getElementById('particles');
                const particleCount = 50;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';

                    // Random position
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';

                    // Random animation delay and duration
                    particle.style.animationDelay = Math.random() * 8 + 's';
                    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

                    // Random size
                    const size = Math.random() * 3 + 2;
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';

                    particlesContainer.appendChild(particle);
                }
            }

            // Smooth scroll behavior
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Add sparkle effect on mouse move
            document.addEventListener('mousemove', function (e) {
                if (Math.random() > 0.95) {
                    createSparkle(e.clientX, e.clientY);
                }
            });

            function createSparkle(x, y) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleAnim 1s ease-out forwards;
        `;
                document.body.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }

            // Add sparkle animation
            const style = document.createElement('style');
            style.textContent = `
        @keyframes sparkleAnim {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }
    `;
            document.head.appendChild(style);

        });
