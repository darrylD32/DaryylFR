let balance = 100;
let currentBet = null;
let wheel = document.getElementById('roulette-wheel');
let wheelContent = wheel.innerHTML;
let spinCount = 0;
let lastResult = 0; // To keep track of where the wheel should start

// Adding a winning indicator line
const winningIndicator = document.createElement('div');
winningIndicator.className = 'winning-indicator';
wheel.parentElement.appendChild(winningIndicator);

// Function to show bet placed
function showBetPlaced(color) {
    const betPlacedElement = document.querySelector('.bet-placed');
    if (betPlacedElement) {
        wheel.parentElement.removeChild(betPlacedElement);
    }
    const newBetPlacedElement = document.createElement('div');
    newBetPlacedElement.className = 'bet-placed';
    newBetPlacedElement.textContent = `Bet placed on ${color}`;
    wheel.parentElement.appendChild(newBetPlacedElement);
}

function placeBet(color) {
    if (balance < 10) {
        alert("You don't have enough coins to bet!");
        return;
    }
    currentBet = color;
    balance -= 10;
    document.getElementById('balance').textContent = balance;
    showBetPlaced(color);
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
    wheel.style.transition = `transform ${5 + (spinCount / 2)}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    wheel.style.transform = `translateX(-${(result * 60) + translateX}px)`;
    
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
            currentBet = null; // Reset bet for next round
        }
        countdown--;
    }, 1000);
    
    // Schedule next spin regardless of bet
    setTimeout(spinWheel, 5000);
}

// Start the wheel spinning
spinWheel();
