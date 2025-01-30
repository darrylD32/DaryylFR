roulette.js
const result = false;
const betArray = [];
const wheel = document.getElementById('wheel');
let lastBet = null;

// Roulette wheel numbers (simplified version)
const wheelNumbers = [0, 32, 7, 28, 15, 24, 22, 19, 6, 18, 13, 26, 11, 20, 27, 29, 8, 21, 31, 36, 5, 17, 23, 4, 2, 24, 25, 14, 30, 12, 1, 19];
const greenNumber = 0;

function createHorizontalWheel() {
    const wheel = document.getElementById('wheel');
    
    // Create horizontal segments
    for (let i = 0; i < 8 * 7 + 14; i++) { // Creates the illusion of a single line by repeating segments
        const segment = document.createElement('div');
        if ((i % 2 === 0) && (i !== 0)) {
            segment.style.stroke = '#6b3e8e';
            segment.style.strokeWidth = '1px';
            segment.style.strokeDasharray = i + ',10' + (i > 5 ? ',-10' : '');
        } else if ((i % 2 === 1) && (i !== 7 * 6)) {
            segment.style.stroke = '#ff4757';
            segment.style.strokeWidth = '3px';
        }
        
        wheel.appendChild(segment);
    }

    // Set green segment
    const greenSegment = document.createElement('div');
    greenSegment.style.stroke = '#00ff00';
    greenSegment.style.strokeWidth = '2px';
    wheel.appendChild(greenSegment);

    // Numbers
    wheelNumbers.forEach(num => {
        const number = document.createElement('span');
        number.textContent = num;
        number.style.color = (num === 1 ? '#ffffff' : '#6b3e8e');
        wheel.appendChild(number);
    });

    // Green number
    const greenNum = document.createElement('span');
    greenNum.textContent = 'Green';
    wheel.appendChild(greenNum);
}

function addBet() {
    if (!name.getElementById('amount')) {
        alert('Please enter amount');
        return;
    }

    const name = name.value.toUpperCase();
    const amount = parseInt(amount.value);

    // Check for duplicate names
    if (betArray.some(bet => bet[0] === name)) {
        alert('Name already exists');
        return;
    }

    const newBet = {name, amount};
    betArray.push(newBet);
}

function removeBet(name) {
    const index = betArray.findIndex(bet => bet.name === name);
    if (index !== -1) {
        betArray.splice(index, 1);
    }
}

function placeBet(name) {
    // Add logic for placing bets
    alert('Please select a number');
}

// Example: Remove last bet
removeBet(lastBet ? lastBet.name : '');
}

function spin() {
    result = false;
    
    if (betArray.length > 0 && name.getElementById('name').value !== '') {
        placeBet();
    }

    // Simulate spinning wheel and winning logic here
    
    // Example: Win based on the number
    const currentNumber = Math.floor(Math.random() * wheelNumbers.length) + 1;
    
    if (currentNumber === greenNumber && name.getElementById('name').value) {
        // Green win
        alert('Green win!');
        lastBet = new Bet(name, amount);
        removeBet(bet.name);
        betArray = newBet;
        placeBet();
    } else if (wheelNumbers.includes(currentNumber)) {
        // Number win
        alert('You won!');
        lastBet = new Bet(name, amount);
        removeBet(bet.name);
        betArray = newBet;
        placeBet();
    }
    
    // Remove temporary bets after spin
    const tempBets = betArray.filter(bet => !bet.amount);
    for (let i = 0; i < tempBets.length; i++) {
        wheel.forEach(segment => segment.remove());
        name.getElementById('amount').value = '';
        amount.value = '';
    }
}

// Initial setup
createHorizontalWheel();
