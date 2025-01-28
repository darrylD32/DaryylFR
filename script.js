let balance = 100;
let currentBet = null;
let wheel = document.getElementById('roulette-wheel');
let wheelContent = wheel.innerHTML;
let spinCount = 0; // To track spins for adding more content

function placeBet(color) {
    if (balance < 10) {
        alert("You don't have enough coins to bet!");
        return;
    }
    currentBet = color;
    balance -= 10;
    document.getElementById('balance').textContent = balance;
    
    // Countdown before spinning
    let countdown = 5;
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3em; color: #ff5722;';
    document.body.appendChild(countdownElement);
    
    const interval = setInterval(() => {
        countdownElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            document.body.removeChild(countdownElement);
            spinWheel();
        }
        countdown--;
    }, 1000);
}

function spinWheel() {
    spinCount++;
    
    // Add more wheel content to keep it continuous
    // This logic now checks if the wheel has scrolled less than 50% of its content
    let currentTransform = window.getComputedStyle(wheel).transform;
    let matrix = new DOMMatrix(currentTransform);
    let translateX = Math.abs(matrix.m41 || 0); // Get the absolute value of translateX
    let wheelWidth = wheel.scrollWidth; // Total width of the wheel

    if (translateX > wheelWidth / 2) {
        wheel.innerHTML += wheelContent; // Append the existing wheel content if we're past halfway
    }
    
    const result = Math.floor(Math.random() * 15); // Random number 0-14
    const resultElement = document.getElementById('result');
    
    // Continue from where it left off rather than resetting
    wheel.style.animation = `none`;
    wheel.offsetHeight; // Trigger reflow to reset animation

    // Calculate new animation duration based on current position
    let duration = 5 + (translateX / 60); // Adjust duration based on how far wheel has moved

    wheel.style.animation = `spin ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`;
    wheel.style.animationPlayState = 'running'; // Ensure animation starts

    setTimeout(() => {
        let winningColor = result === 14 ? 'green' : result % 2 === 0 ? 'red' : 'black';
        if (currentBet === winningColor) {
            let multiplier = winningColor === 'green' ? 14 : 2;
            balance += 10 * multiplier;
            resultElement.textContent = `You won ${10 * multiplier} coins!`;
        } else {
            resultElement.textContent = "You lost 10 coins.";
        }
        document.getElementById('balance').textContent = balance;
    }, duration * 1000); // Wait for spin animation, adjust based on duration
}

// Reset wheel position for continuous effect
wheel.addEventListener('animationend', () => {
    wheel.style.animation = 'none';
    setTimeout(() => wheel.style.animation = '', 10); // Reset immediately
});

// Initial setup for wheel
wheel.style.animation = 'none'; // Start without animation
