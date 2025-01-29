let balance = 1000;
let betAmount = 10;
let gameActive = false;
let multiplier = 1.0;
let gameInterval;

const balanceElement = document.getElementById('balance');
const multiplierElement = document.getElementById('multiplier');
const startButton = document.getElementById('start-button');
const cashoutButton = document.getElementById('cashout-button');
const betAmountInput = document.getElementById('bet-amount');
const historyList = document.getElementById('history-list');

// Update balance display
function updateBalance() {
  balanceElement.textContent = balance;
}

// Start the game
startButton.addEventListener('click', () => {
  if (gameActive) return;
  const bet = parseInt(betAmountInput.value);
  if (bet > balance || bet < 1) {
    alert('Invalid bet amount!');
    return;
  }
  balance -= bet;
  updateBalance();
  gameActive = true;
  startButton.disabled = true;
  cashoutButton.disabled = false;
  multiplier = 1.0;
  multiplierElement.textContent = `${multiplier.toFixed(2)}x`;

  gameInterval = setInterval(() => {
    multiplier += 0.01;
    multiplierElement.textContent = `${multiplier.toFixed(2)}x`;
    if (Math.random() < 0.005) {
      endGame();
    }
  }, 100);
});

// Cash out
cashoutButton.addEventListener('click', () => {
  if (!gameActive) return;
  endGame();
});

// End the game
function endGame() {
  clearInterval(gameInterval);
  const bet = parseInt(betAmountInput.value);
  const winnings = bet * multiplier;
  balance += winnings;
  updateBalance();
  gameActive = false;
  startButton.disabled = false;
  cashoutButton.disabled = true;
  addToHistory(winnings);
}

// Add result to history
function addToHistory(winnings) {
  const li = document.createElement('li');
  li.textContent = `Cashed out at ${multiplier.toFixed(2)}x - Won ${winnings.toFixed(2)} coins`;
  historyList.appendChild(li);
}

// Initialize
updateBalance();
