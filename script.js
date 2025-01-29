document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.getElementById('balance');
    const betInput = document.getElementById('bet-input');
    const betOptions = document.querySelectorAll('.bet-option');
    const resultsList = document.querySelector('.results-list');
    const slotsContainer = document.querySelector('.slots');
    const countdownElement = document.getElementById('countdown');
    const redDisplay = document.getElementById('red-display');
    const blackDisplay = document.getElementById('black-display');
    const greenDisplay = document.getElementById('green-display');

    let balance = 1000;
    let currentBet = 10;
    let selectedColor = null;
    let countdown = 10;
    let countdownInterval;
    let isSpinning = false;
    let bets = [];

    // Generate roulette slots (7 red, 7 black, 1 green)
    const slots = [];
    for (let i = 0; i < 15; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.textContent = i;
        if (i === 0) {
            slot.classList.add('green');
        } else if (i % 2 === 0) {
            slot.classList.add('black');
        } else {
            slot.classList.add('red');
        }
        slots.push(slot);
        slotsContainer.appendChild(slot);
    }

    // Duplicate slots for infinite scrolling
    slotsContainer.innerHTML += slotsContainer.innerHTML;

    // Update balance display
    function updateBalance() {
        balanceElement.textContent = balance;
    }

    // Start the countdown timer
    function startCountdown() {
        countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                spinWheel();
            }
        }, 1000);
    }

    // Handle bet placement
    betOptions.forEach(option => {
        option.addEventListener('click', function () {
            if (isSpinning) {
                return; // Do not accept bets during spin
            }

            const betAmount = parseInt(betInput.value);
            if (betAmount < 1 || betAmount > balance) {
                return; // Invalid bet amount
            }

            selectedColor = this.dataset.color;

            // Deduct bet amount from balance
            balance -= betAmount;
            updateBalance();

            // Add bet to the list
            bets.push({ amount: betAmount, color: selectedColor });

            // Display bet under the selected color button
            const displayElement = document.getElementById(`${selectedColor}-display`);
            displayElement.textContent = `Bet: ${betAmount}`;
        });
    });

    // Spin the wheel
    function spinWheel() {
        isSpinning = true;
        const wheel = document.querySelector('.wheel');
        const slots = document.querySelectorAll('.slot');
        const randomSlot = Math.floor(Math.random() * 15);
        const winningColor = slots[randomSlot].classList.contains('red') ? 'red' :
            slots[randomSlot].classList.contains('black') ? 'black' : 'green';

        // Stop the wheel at the winning slot
        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `translateX(-${randomSlot * 80}px)`; // Adjusted for wider slots

        // Check if the player won
        setTimeout(() => {
            let totalWinnings = 0;
            bets.forEach(bet => {
                if (bet.color === winningColor) {
                    let multiplier = bet.color === 'green' ? 14 : 2;
                    const winnings = bet.amount * multiplier;
                    totalWinnings += winnings;
                    balance += winnings + bet.amount; // Return bet + winnings
                }
            });

            // Display winnings under the selected color button
            const displayElement = document.getElementById(`${selectedColor}-display`);
            if (totalWinnings > 0) {
                displayElement.textContent = `+${totalWinnings}`;
            } else {
                displayElement.textContent = `-${bets.reduce((sum, bet) => sum + bet.amount, 0)}`;
            }

            // Clear winnings display after 3 seconds
            setTimeout(() => {
                displayElement.textContent = '';
                // Reset for the next round
                isSpinning = false;
                bets = [];
                countdown = 10;
                countdownElement.textContent = countdown;
                startCountdown();
            }, 3000);
        }, 3000);
    }

    // Start the initial countdown
    startCountdown();
});
