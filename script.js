let balance = 1000;
let recentResults = [];

const spinButton = document.getElementById('spinBtn');
const wheel = document.getElementById('wheel');
const balanceDisplay = document.getElementById('balance');
const recentResultsDisplay = document.getElementById('recentResults');
const betAmountInput = document.getElementById('betAmount');
const betBtns = document.querySelectorAll('.bet-btn');

function updateBalance() {
    balanceDisplay.textContent = balance;
}

function addRecentResult(result) {
    recentResults.unshift(result);
    if (recentResults.length > 5) {
        recentResults.pop(); // Keep the list size to 5
    }
    displayRecentResults();
}

function displayRecentResults() {
    recentResultsDisplay.innerHTML = recentResults.join(' | ');
}

function spinWheel() {
    const spinDuration = Math.random() * 2 + 3; // Spin time between 3-5 seconds
    const spinAngle = Math.random() * 360; // Random spin angle
    wheel.style.transition = `transform ${spinDuration}s ease-out`;
    wheel.style.transform = `rotate(${spinAngle + 3600}deg)`; // Extra spins for effect

    setTimeout(() => {
        const result = Math.floor(Math.random() * 15); // Numbers 0-14
        addRecentResult(result);
        balance += parseInt(betAmountInput.value); // Temporary win logic for demo
        updateBalance();
    }, spinDuration * 1000);
}

spinButton.addEventListener('click', () => {
    if (balance >= betAmountInput.value) {
        balance -= betAmountInput.value; // Deduct bet
        updateBalance();
        spinWheel();
    } else {
        alert('Not enough balance!');
    }
});

// For bet options (temporary functionality)
betBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert(`You selected: ${btn.dataset.bet}`);
    });
});

updateBalance(); // Initial balance update
