// Simulate the wheel spin
document.getElementById('spin-wheel').addEventListener('click', function() {
    let wheel = document.getElementById('wheel');
    wheel.style.transition = 'transform 2s ease-out';
    let randomDegree = Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${randomDegree}deg)`;
});

// Betting logic
let betAmountInput = document.getElementById('bet-amount');
let betHistory = document.querySelector('.history');

document.querySelectorAll('.bet-option').forEach(option => {
    option.addEventListener('click', function() {
        let multiplier = option.getAttribute('data-multiplier');
        let betAmount = betAmountInput.value;
        if (betAmount && multiplier) {
            placeBet(betAmount, multiplier);
        }
    });
});

function placeBet(amount, multiplier) {
    let betHistoryItem = document.createElement('div');
    betHistoryItem.classList.add('bet-history-item');
    betHistoryItem.innerHTML = `
        <div>Bet: $${amount}</div>
        <div>Multiplier: ${multiplier}</div>
    `;
    betHistory.appendChild(betHistoryItem);
}
