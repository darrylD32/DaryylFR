let balance = 1000;
let currentBet = 0;

document.getElementById('placeBet').addEventListener('click', function() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount > 0 && betAmount <= balance) {
        currentBet = betAmount;
        balance -= betAmount;
        document.getElementById('balance').textContent = `Balance: ${balance} coins`;
        alert(`You placed a bet of ${betAmount} coins.`);
    } else {
        alert('Invalid bet amount or insufficient balance.');
    }
});

document.getElementById('spinButton').addEventListener('click', function() {
    if (currentBet === 0) {
        alert('Please place a bet before spinning.');
        return;
    }

    const roulette = document.getElementById('roulette');
    const resultElement = document.getElementById('result');
    const spinButton = document.getElementById('spinButton');
    
    spinButton.disabled = true;
    resultElement.textContent = 'Spinning...';
    
    const randomDegree = Math.floor(Math.random() * 360) + 1440; // Spin at least 4 full rotations
    roulette.style.transform = `rotate(${randomDegree}deg)`;
    
    setTimeout(() => {
        const actualDegree = randomDegree % 360;
        const segment = Math.floor(actualDegree / 24); // 360 / 15 = 24 degrees per segment
        let result;
        let multiplier;

        if (segment === 0) {
            result = 'Green (0)';
            multiplier = 14;
        } else if (segment % 2 === 1) {
            result = `Red (${segment})`;
            multiplier = 2;
        } else {
            result = `Black (${segment})`;
            multiplier = 2;
        }

        const winnings = currentBet * multiplier;
        balance += winnings;
        document.getElementById('balance').textContent = `Balance: ${balance} coins`;
        resultElement.textContent = `Landed on: ${result}. You won ${winnings} coins!`;
        spinButton.disabled = false;
        currentBet = 0;
    }, 3000);
});
