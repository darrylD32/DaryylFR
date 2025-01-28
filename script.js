let balance = 100;
let currentBet = null;
let wheel = document.getElementById('roulette-wheel');
let wheelContent = wheel.innerHTML;

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
        wheel.style.transform = `translateX(-${result * 80}px)`; // Adjust based on spot width
        
        // Wait for the animation to finish
        setTimeout(() => {
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
            currentBet = null; // Reset bet for next round
        }, 5000);
    }, 10);
}

// Initial balance display
document.getElementById('balance').textContent = balance;
