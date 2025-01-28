let balance = 100;
let currentBet = null;
let wheel = document.getElementById('roulette-wheel');
let wheelContent = wheel.innerHTML;
let isSpinning = false;

function placeBet(color) {
    if (balance < 10) {
        alert("You don't have enough coins to bet!");
        return;
    }
    currentBet = color;
    balance -= 10;
    document.getElementById('balance').textContent = balance;
    document.getElementById('result').textContent = `Bet placed on ${color}`;
}

function spinWheel() {
    if (isSpinning) return; // Prevent multiple spins if one is already in progress
    isSpinning = true;
    
    // Determine the result
    const result = Math.floor(Math.random() * 15); // Random number 0-14
    const resultElement = document.getElementById('result');
    
    // Add more wheel content to keep it continuous
    wheel.innerHTML += wheelContent;
    
    // Spin animation
    wheel.style.transition = 'none';
    wheel.style.transform = 'translateX(0)'; // Reset position
    
    setTimeout(() => {
        wheel.style.transition = `transform 5s cubic-bezier(0, 0, 0.2, 1)`;
        wheel.style.transform = `translateX(-${result * 60}px)`; // Adjust based on spot width from your original design
        
        // Wait for the animation to finish
        setTimeout(() => {
            let winningColor = result === 14 ? 'green' : result % 2 === 0 ? 'red' : 'black';
            if (currentBet === winningColor) {
                let multiplier = winningColor === 'green' ? 14 : 2;
                balance += 10 * multiplier;
                resultElement.textContent = `You won ${10 * multiplier} coins! (${winningColor})`;
            } else if (currentBet !== null) {
                resultElement.textContent = `You lost 10 coins. (${winningColor} won)`;
            } else {
                resultElement.textContent = `Result: ${winningColor}`;
            }
            document.getElementById('balance').textContent = balance;
            currentBet = null; // Reset bet for next round
            isSpinning = false;
        }, 5000);
    }, 10);
}

// Start the wheel spinning every 10 seconds
setInterval(spinWheel, 10000);

// Initial balance display
document.getElementById('balance').textContent = balance;
