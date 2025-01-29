document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.querySelector('.results-container');
    const spinButton = document.getElementById('spin-button');
    const betInput = document.getElementById('bet-input');
    const increaseBet = document.getElementById('increase-bet');
    const decreaseBet = document.getElementById('decrease-bet');
    const betOptions = document.querySelectorAll('.bet-option');
    const historyContainer = document.querySelector('.history-container');
    const pausePlayButton = document.getElementById('pause-play');
    const coinCounter = document.querySelector('.coin-counter');
    const balanceDisplay = document.querySelector('.balance');

    let balance = 1000;
    let betAmount = 10;
    let isPaused = false;

    // Function to update balance display
    function updateBalance() {
        balanceDisplay.textContent = balance;
    }

    // Function to add a new result
    function addResult(result) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.textContent = result;
        resultsContainer.appendChild(resultDiv);
        resultsContainer.scrollLeft = resultsContainer.scrollWidth;
    }

    // Function to spin the wheel
    function spinWheel() {
        if (balance < betAmount) {
            alert('Insufficient balance!');
            return;
        }

        balance -= betAmount;
        updateBalance();

        const result = Math.floor(Math.random() * 15);
        addResult(result);

        // Simulate winning or losing
        if (result === 7) { // Example winning condition
            const winnings = betAmount * 14;
            balance += winnings;
            updateBalance();
            coinCounter.textContent = parseInt(coinCounter.textContent) + winnings;
            alert(`You won ${winnings}!`);
        } else {
            alert('You lost!');
        }
    }

    // Event listeners
    spinButton.addEventListener('click', spinWheel);

    increaseBet.addEventListener('click', () => {
        betAmount += 10;
        betInput.value = betAmount;
    });

    decreaseBet.addEventListener('click', () => {
        if (betAmount > 10) {
            betAmount -= 10;
            betInput.value = betAmount;
        }
    });

    betOptions.forEach(option => {
        option.addEventListener('click', () => {
            alert(`You placed a ${option.dataset.bet} bet!`);
        });
    });

    pausePlayButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pausePlayButton.textContent = isPaused ? 'Play' : 'Pause';
    });
});
