document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('intro-screen');
    const countdownTimer = document.getElementById('countdown-timer');
    const mainContent = document.getElementById('main-content');
    const sparkleContainer = document.getElementById('sparkle-container');
    const actionButtons = document.querySelectorAll('.action-btn');
    const closeOverlayButtons = document.querySelectorAll('.close-overlay');
    
    let count = 3;
    const countdownInterval = setInterval(() => {
        if (count > 0) {
            countdownTimer.textContent = count;
            count--;
        } else {
            clearInterval(countdownInterval);
            introScreen.style.opacity = 0;
            mainContent.classList.add('show');
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 1000);
        }
    }, 1000);

    document.addEventListener('mousemove', function(e) {
        let sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    });

    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const targetOverlayId = this.dataset.target;
            if (targetOverlayId) {
                const targetOverlay = document.getElementById(targetOverlayId);
                if (targetOverlay) {
                    targetOverlay.classList.add('active');
                }
            }
        });
    });

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentOverlay = this.closest('.overlay');
            if (parentOverlay) {
                parentOverlay.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
});