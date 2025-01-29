// Generate Recent Results
const resultsGrid = document.querySelector('.results-grid');
for (let i = 0; i < 100; i++) {
  const result = document.createElement('div');
  result.textContent = Math.floor(Math.random() * 37);
  result.style.backgroundColor = ['red', 'green', 'black'][Math.floor(Math.random() * 3)];
  resultsGrid.appendChild(result);
}

// Roulette Wheel Simulation
const wheel = document.querySelector('.wheel');
wheel.addEventListener('click', () => {
  wheel.style.transition = 'transform 3s ease-out';
  const randomRotation = Math.floor(Math.random() * 360) + 1080; // Spin at least 3 full rotations
  wheel.style.transform = `rotate(${randomRotation}deg)`;
});

// Bet Amount Adjustment
const betInput = document.querySelector('.bet-amount input');
document.querySelectorAll('.bet-amount button').forEach(button => {
  button.addEventListener('click', () => {
    const currentValue = parseInt(betInput.value);
    if (button.classList.contains('decrement')) {
      betInput.value = Math.max(1, currentValue - 1);
    } else if (button.classList.contains('increment')) {
      betInput.value = currentValue + 10;
    } else if (button.classList.contains('quick-bet')) {
      const multiplier = button.getAttribute('data-multiplier');
      if (multiplier === 'max') {
        betInput.value = 1000;
      } else {
        betInput.value = Math.round(currentValue * multiplier);
      }
    }
  });
});

// Place Bet
document.querySelectorAll('.bet-option').forEach(option => {
  option.addEventListener('click', () => {
    const multiplier = option.getAttribute('data-multiplier');
    alert(`You placed a bet to win ${multiplier}x!`);
  });
});
