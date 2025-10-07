document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('intro-screen');
    const introImage = document.getElementById('intro-image');
    const welcomeText = document.getElementById('welcome-text');
    const mainContent = document.getElementById('main-content');
    
    const fullWelcomeText = "Welcome to my Portfolio"; 
    let i = 0;
    
    const sparkleContainer = document.getElementById('sparkle-container');
    const actionButtons = document.querySelectorAll('.action-btn');
    const closeOverlayButtons = document.querySelectorAll('.close-overlay');
    const body = document.body;
    
    // ===============================================
    //           INTRO ANIMATION SEQUENCE
    // ===============================================

    // 1. (0.25s) Image fades in
    setTimeout(() => {
        introImage.style.opacity = 1;
    }, 250); 

    // 2. (1.5s) Start the typing effect
    setTimeout(() => {
        typeWriter();
    }, 1500);

    function typeWriter() {
        if (i < fullWelcomeText.length) {
            welcomeText.innerHTML += fullWelcomeText.charAt(i);
            i++;
            welcomeText.style.opacity = 1; 
            
            // لإعطاء تأثير "اللمعان" لكل حرف بعد كتابته
            welcomeText.style.textShadow = '0 0 10px silver, 0 0 20px #222, 0 0 30px #a0c0e0';
            setTimeout(() => {
                welcomeText.style.textShadow = '0 0 5px silver, 0 0 10px #222';
            }, 50);

            setTimeout(typeWriter, 70); // سرعة الكتابة 70ms
        } else {
            // 3. (بعد اكتمال الكتابة) بدء تأثير الحركة واللمعان الكامل
            const typingDuration = fullWelcomeText.length * 70; // حساب مدة الكتابة
            
            setTimeout(() => {
                // تفعيل الحركة المعقدة بعد اكتمال الكتابة
                welcomeText.style.animation = 'text-slide-in-glow 3s ease-out forwards';
            }, 500); // 0.5 ثانية انتظار بعد اكتمال الكتابة
        }
    }

    // 4. (6.0s) Animation ends and transitions to main content
    // التوقيت الإجمالي: 1.5s (بداية) + (طول الجملة * 70ms) + 0.5s (انتظار) + 3s (حركة)
    // تقريبيًا: 1.5s + 1.6s + 0.5s + 3s = 6.6s. سنثبتها عند 7.0s لضمان رؤية التأثير
    setTimeout(() => {
        mainContent.classList.add('show');
        introScreen.style.opacity = 0;
        
        setTimeout(() => {
             introScreen.style.display = 'none';
        }, 1000); 

    }, 7000); // تم تعديلها إلى 7 ثواني (7000ms)

    // ===============================================
    //           EXISTING SITE LOGIC (Overlays & Sparkles)
    // ===============================================
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const targetOverlayId = this.dataset.target;
            if (targetOverlayId) {
                const targetOverlay = document.getElementById(targetOverlayId);
                if (targetOverlay) {
                    targetOverlay.classList.add('active');
                    body.classList.add('paused-animation');
                }
            }
        });
    });

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentOverlay = this.closest('.overlay');
            if (parentOverlay) {
                parentOverlay.classList.remove('active');
                body.classList.remove('paused-animation');
            }
        });
    });

    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                body.classList.remove('paused-animation');
            }
        });
    });
    
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
});
