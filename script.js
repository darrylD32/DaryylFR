let balance = 100;
let currentBet = null;
let wheel = document.getElementById('roulette-wheel');
let wheelContent = wheel.innerHTML;
let spinCount = 0;
let lastResult = 0;
let isSpinning = false;

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
    if (isSpinning) return; // Prevent multiple spins if one is already in progress
    isSpinning = true;
    
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
    
    // Spin animation with deceleration
    let totalSpins = 10; // Total number of spins before deceleration
    let spinDuration = 0.5; // Duration of each spin in seconds
    let decelerationStart = 5; // After how many spins to start deceleration
    
    function animateSpin(spinNumber) {
        if (spinNumber <= totalSpins) {
            let speed = spinNumber < decelerationStart ? 1 : (1 - (spinNumber - decelerationStart) / (totalSpins - decelerationStart));
            let distance = 60 * 15 * speed; // 15 is the number of spots, adjust as necessary
            let newTranslateX = translateX + distance;
            
            wheel.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
            wheel.style.transform = `translateX(-${newTranslateX}px)`;
            
            setTimeout(() => {
                if (spinNumber === totalSpins) {
                    // Final spin to land on the result
                    wheel.style.transition = `transform 2s cubic-bezier(0, 0, 0.2, 1)`; // Slower and smoother for the final stop
                    wheel.style.transform = `translateX(-${(result * 60) + translateX}px)`;
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
                            isSpinning = false; // Allow next spin
                        }
                        countdown--;
                    }, 1000);
                } else {
                    animateSpin(spinNumber + 1);
                }
            }, spinDuration * 1000);
        }
    }
    
    animateSpin(1);
}

// Start the wheel spinning every 5 seconds
setInterval(() => {
    if (!isSpinning) {
        spinWheel();
    }
}, 5000);

// Initial spin to start the game
spinWheel();
