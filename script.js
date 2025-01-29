let balance = 1000;
let currentBet = { red: 0, black: 0, green: 0 };
let isSpinning = false;

const roulette = document.getElementById('roulette');
const resultElement = document.getElementById('result');
const betRedAmount = document.getElementById('betRedAmount');
const betBlackAmount = document.getElementById('betBlackAmount');
const betGreenAmount = document.getElementById('betGreenAmount');

function createRouletteBox(number) {
    const box = document.createElement('div');
    box.className = 'number';
    box.textContent = number;
    box.style.backgroundColor = number === 0 ? 'green' : (number % 2 === 1 ? 'red' : 'black');
    return box;
}

function initializeRoulette() {
    for (let i = 0; i < 15; i++) {
        roulette.appendChild(createRouletteBox(i));
    }
}

initializeRoulette();

function addMoreBoxes() {
    for (let i = 0; i < 15; i++) {
        roulette.appendChild(createRouletteBox(i));
    }
}

document.getElementById('placeBet').addEventListener('click', function() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount > 0 && betAmount <= balance && (currentBet.red > 0 || currentBet.black > 0 || currentBet.green > 0)) {
        balance -= betAmount;
        document.getElementById('balance').textContent = `Balance: ${balance} coins`;
        spinRoulette();
    } else {
        alert('Invalid bet amount, insufficient balance, or no bet option selected.');
    }
});

document.getElementById('betRed').addEventListener('click', function() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount > 0 && betAmount <= balance) {
        currentBet.red += betAmount;
        betRedAmount.textContent = `Bet on Red: ${currentBet.red} coins`;
    }
});

document.getElementById('betBlack').addEventListener('click', function() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount > 0 && betAmount <= balance) {
        currentBet.black += betAmount;
        betBlackAmount.textContent = `Bet on Black: ${currentBet.black} coins`;
    }
});

document.getElementById('betGreen').addEventListener('click', function() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount > 0 && betAmount <= balance) {
        currentBet.green += betAmount;
        betGreenAmount.textContent = `Bet on Green: ${currentBet.green} coins`;
    }
});

function spinRoulette() {
    if (isSpinning) return;
    isSpinning = true;

    const randomSegment = Math.floor(Math.random() * 15); // 0-14
    const resultColor = randomSegment === 0 ? 'green' : (randomSegment % 2 === 1 ? 'red' : 'black');
    
    const segmentWidth = 60; // Width of each segment
    const targetPosition = -(randomSegment * segmentWidth) - (3 * 15 * segmentWidth); // 3 full rounds

    addMoreBoxes(); // Add more boxes to ensure continuous display

    roulette.style.transition = 'transform 3s ease-out';
    roulette.style.transform = `translateX(${targetPosition}px)`;
    
    setTimeout(() => {
        let multiplier;
        if (resultColor === 'green') {
            multiplier = 14;
        } else {
            multiplier = 2;
        }

        let winnings = 0;
        if (resultColor === 'red' && currentBet.red > 0) {
            winnings = currentBet.red * multiplier;
        } else if (resultColor === 'black' && currentBet.black > 0) {
            winnings = currentBet.black * multiplier;
        } else if (resultColor === 'green' && currentBet.green > 0) {
            winnings = currentBet.green * multiplier;
        }

        balance += winnings;
        resultElement.textContent = `Landed on: ${resultColor} (${randomSegment}). You won ${winnings} coins!`;
        document.getElementById('balance').textContent = `Balance: ${balance} coins`;

        // Reset roulette position and continue spinning
        roulette.style.transition = 'none';
        roulette.style.transform = 'translateX(0)';
        setTimeout(() => {
            roulette.style.transition = 'transform 3s ease-out';
            isSpinning = false;
        }, 50);

        // Reset bets
        currentBet = { red: 0, black: 0, green: 0 };
        betRedAmount.textContent = 'Bet on Red: 0 coins';
        betBlackAmount.textContent = 'Bet on Black: 0 coins';
        betGreenAmount.textContent = 'Bet on Green: 0 coins';
    }, 3000);
}
