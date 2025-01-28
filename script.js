let balance = 100;
let currentBet = null;
let wheel = document.getElementById('roulette-wheel');
let wheelContent = wheel.innerHTML;
let spinCount = 0;
let lastResult = 0;

function placeBet(color) {
    if (balance < 10) {
        alert("You don't have enough coins to bet!");
        return;
    }
    currentBet = color;
    balance -= 10;
    document.getElementById('balance').textContent = balance;
    document.getElementById('bet-placed').textContent = `Bet placed on ${color}`;
}

function spinWheel() {
    spinCount++;
    
    // Add more wheel content to keep it continuous
    let currentTransform = window.getComputedStyle(wheel).transform;
    let matrix = new DOMMatrix(currentTransform);
    let translateX = Math.abs(matrix.m41 || 0);
    let wheelWidth = wheel.scrollWidth;

    if (translateX > wheelWidth / 2) {
        wheel.innerHTML += wheelContent;
    }
    
    // Determine the result
    const result = Math.floor(Math.random() * 15); // Random number 0-14
    const resultElement = document.getElementById('result');
    
    // Start the wheel from where it left off
    wheel.style.transform = `translateX(-${(lastResult * 60) + translateX}px)`;
    wheel.style.transition = 'none';
    
    // Spin animation
    setTimeout(() => {
        wheel.style.transition = `transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        wheel.style.transform = `translateX(-${(result * 60) + translateX}px)`;
    }, 10);
    
    // Update lastResult for next spin
    lastResult = result;
    
    // Show countdown
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3em; color: #ff5722;';
    document.body.appendChild(countdownElement);
    
    let countdown = 5;
    const interval = setInterval(() => {
        countdownElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            document.body.removeChild(countdownElement);
            
            // Determine if the bet was correct
            let winningColor = result === 14 ? 'green' : result % 2 === 0 ? 'red' : 'black';
            if (currentBet === winningColor) {
                let multiplier = winningColor === 'green' ? 14 : 2;
                balance += 10 * multiplier;
                resultElement.textContent = `You won ${10 * multiplier} coins!`;
            } else if (currentBet !== null) {
                resultElement.textContent = "You lost 10 coins.";
            } else {
                resultElement.textContent = `Result: ${winningColor}`;
            }
            document.getElementById('balance').textContent = balance;
            document.getElementById('bet-placed').textContent = ''; // Clear bet message
            currentBet = null; // Reset bet for next round
        }
        countdown--;
    }, 1000);
}

// Start the wheel spinning every 5 seconds
setInterval(spinWheel, 5000);
