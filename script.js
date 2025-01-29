let balance = 1000;
let currentBet = 0;
let betOn = null;

document.getElementById('placeBet').addEventListener('click', function() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount > 0 && betAmount <= balance && betOn !== null) {
        currentBet = betAmount;
        balance -= betAmount;
        document.getElementById('balance').textContent = `Balance: ${balance} coins`;
        alert(`You placed a bet of ${betAmount} coins on ${betOn}.`);
        spinRoulette();
    } else {
        alert('Invalid bet amount, insufficient balance, or no bet option selected.');
    }
});

document.getElementById('betRed').addEventListener('click', function() {
    betOn = 'Red';
    alert('You are betting on Red (2x).');
});

document.getElementById('betBlack').addEventListener('click', function() {
    betOn = 'Black';
    alert('You are betting on Black (2x).');
});

document.getElementById('betGreen').addEventListener('click', function() {
    betOn = 'Green';
    alert('You are betting on Green (14x).');
});

function spinRoulette() {
    const roulette = document.getElementById('roulette');
    const resultElement = document.getElementById('result');
    
    resultElement.textContent = 'Spinning...';
    
    const randomSegment = Math.floor(Math.random() * 15); // 0-14
    const resultColor = randomSegment === 0 ? 'Green' : (randomSegment % 2 === 1 ? 'Red' : 'Black');
    
    setTimeout(() => {
        let multiplier;
        if (resultColor === 'Green') {
            multiplier = 14;
        } else {
            multiplier = 2;
        }

        if (betOn === resultColor) {
            const winnings = currentBet * multiplier;
            balance += winnings;
            resultElement.textContent = `Landed on: ${resultColor} (${randomSegment}). You won ${winnings} coins!`;
        } else {
            resultElement.textContent = `Landed on: ${resultColor} (${randomSegment}). You lost ${currentBet} coins.`;
        }

        document.getElementById('balance').textContent = `Balance: ${balance} coins`;
        currentBet = 0;
        betOn = null;
    }, 3000);
}
