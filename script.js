document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach((element) => {
            const top = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (top < windowHeight - 80) {
                element.classList.add('active');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Bubble Effect on Click
    const bubblesContainer = document.getElementById('bubblesContainer');
    
    document.addEventListener('click', (e) => {
        createBubbles(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createBubbles(touch.clientX, touch.clientY);
    }, { passive: true });

    function createBubbles(x, y) {
        const bubbleCount = Math.random() > 0.5 ? 3 : 5;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = Math.random() * 40 + 20;
            const floatX = (Math.random() - 0.5) * 100;
            
            bubble.style.left = (x - size / 2) + 'px';
            bubble.style.top = (y - size / 2) + 'px';
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.setProperty('--float-x', floatX + 'px');
            
            bubblesContainer.appendChild(bubble);
            
            setTimeout(() => bubble.remove(), 3000);
        }
    }
});

