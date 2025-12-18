document.addEventListener('DOMContentLoaded', function() {
    const giftBox = document.getElementById('giftBox');
    const notesContainer = document.getElementById('notesContainer');
    const closeNotes = document.getElementById('closeNotes');
    const confettiContainer = document.getElementById('confetti-container');
    const balloonsContainer = document.getElementById('balloons-container');
    
    let boxOpened = false;
    let isAnimating = false; // NEW: Track if animation is in progress
    
    // Open gift box when clicked
    giftBox.addEventListener('click', function() {
        // NEW: Prevent clicking if already opened or animating
        if (boxOpened || isAnimating) {
            return;
        }
        
        openGiftBox();
    });
    
    // Close notes when close button is clicked
    closeNotes.addEventListener('click', function() {
        notesContainer.style.display = 'none';
    });
    
    function openGiftBox() {
        // Set animation flag to true
        isAnimating = true;
        
        // Visual feedback: change cursor to "not-allowed" during animation
        giftBox.style.cursor = 'not-allowed';
        
        // Add open animation to the box
        giftBox.classList.add('box-open');
        
        // Create confetti effect
        createConfetti();
        
        // Create balloons
        createBalloons();
        
        // Show birthday notes after a delay
        setTimeout(function() {
            notesContainer.style.display = 'block';
            boxOpened = true;
            
            // Reset cursor after all animations are complete
            setTimeout(() => {
                giftBox.style.cursor = 'pointer';
                // Allow clicking again but box is already opened
                // Change cursor to indicate it's already been opened
                giftBox.style.cursor = 'default';
                giftBox.style.opacity = '0.7';
            }, 3000);
        }, 1000);
        
        // Play a sound effect (optional - you can add a birthday sound file)
        playBirthdaySound();
        
        // NEW: Reset animation flag after all effects are done
        setTimeout(() => {
            isAnimating = false;
        }, 4000); // 4 seconds should cover all animations
    }
    
    function createConfetti() {
        const colors = ['#ff4d94', '#ff80ab', '#ffeb3b', '#ff9800', '#e91e63', '#9c27b0'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            
            // Apply styles
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}vw`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `fall ${animationDuration}s linear forwards`;
            
            // Add custom animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fall {
                    0% {
                        top: -20px;
                        transform: rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        top: 100vh;
                        transform: rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, animationDuration * 1000);
        }
    }
    
    function createBalloons() {
        const balloonColors = ['#ff4d94', '#ff80ab', '#ffeb3b', '#ff9800', '#e91e63', '#9c27b0', '#4CAF50', '#2196F3'];
        
        for (let i = 0; i < 20; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Random properties
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            const size = Math.random() * 30 + 30;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 5 + 8;
            
            // Apply styles
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.2}px`;
            balloon.style.backgroundColor = color;
            balloon.style.left = `${left}vw`;
            balloon.style.borderRadius = '50%';
            balloon.style.animation = `floatUp ${animationDuration}s ease-in forwards`;
            
            // Add custom animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        top: 100vh;
                        transform: translateX(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        top: -100px;
                        transform: translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Add shine effect to balloon
            balloon.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${darkenColor(color, 20)})`;
            
            balloonsContainer.appendChild(balloon);
            
            // Remove balloon after animation completes
            setTimeout(() => {
                balloon.remove();
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, animationDuration * 1000);
        }
    }
    
    function darkenColor(color, percent) {
        // Simple function to darken a color
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    function playBirthdaySound() {
        // You can add a birthday sound file here if you want
        // For now, we'll just log to console
        console.log("🎵 Birthday music playing! 🎵");
        
        // If you have a sound file, uncomment and modify this:
        /*
        const audio = new Audio('birthday-song.mp3');
        audio.volume = 0.3;
        audio.play();
        */
    }
    
    // Add hover effect for gift box (only before it's opened)
    giftBox.addEventListener('mouseenter', function() {
        if (!boxOpened && !isAnimating) {
            document.querySelector('.instruction').style.transform = 'scale(1.1)';
        }
    });
    
    giftBox.addEventListener('mouseleave', function() {
        document.querySelector('.instruction').style.transform = 'scale(1)';
    });
    
    // Easter egg: double click for extra celebration (only after box is opened)
    giftBox.addEventListener('dblclick', function() {
        if (boxOpened && !isAnimating) {
            // Only create minimal effects for double click
            createConfetti();
            createBalloons();
        }
    });
    
    // NEW: Add a message when trying to click an opened box
    giftBox.addEventListener('click', function() {
        if (boxOpened) {
            // Show a temporary message
            const message = document.createElement('div');
            message.textContent = '🎁 Already opened! Check your birthday messages! 🎉';
            message.style.position = 'fixed';
            message.style.top = '20px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.background = 'rgba(255, 77, 148, 0.9)';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '20px';
            message.style.zIndex = '10000';
            message.style.fontWeight = 'bold';
            message.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            
            document.body.appendChild(message);
            
            // Remove message after 2 seconds
            setTimeout(() => {
                message.remove();
            }, 2000);
        }
    });
});