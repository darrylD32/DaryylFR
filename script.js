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

// Implement spinWheel function here
});

// Initial setup for wheel
wheel.style.animation = 'none'; // Start without animation
