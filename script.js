document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.getElementById('balance');
    const betInput = document.getElementById('bet-input');
    const betOptions = document.querySelectorAll('.bet-option');
    const slotsContainer = document.querySelector('.slots');
    const countdownElement = document.getElementById('countdown');
    const notification = document.getElementById('notification');

    let balance = 1000;
    let countdown = 10;
    let countdownInterval;
    let isSpinning = false;
    let bets = [];
    let selectedColor = null;

    // Generate roulette slots (7 red, 7 black, 1 green)
    for (let i = 0; i < 15; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.textContent = i;
        if (i === 0) slot.classList.add('green');
        else if (i % 2 === 0) slot.classList.add('black');
        else slot.classList.add('red');
        slotsContainer.appendChild(slot);
    }

    // Update the balance display
    function updateBalance() {
        balanceElement.textContent = balance;
    }

    // Show notifications
    function showNotification(message, isWin) {
        notification.textContent = message;
        notification.style.backgroundColor = isWin ? '#4dff4d' : '#ff4d4d';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }

    // Start the countdown timer
    function startCountdown() {
        countdownElement.textContent = countdown;
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
                showNotification('Wait for the current spin to finish!', false);
                return;
            }

            const betAmount = parseInt(betInput.value);
            if (betAmount < 1 || betAmount > balance) {
                showNotification('Invalid bet amount!', false);
                return;
            }

            selectedColor = this.dataset.color;

            // Deduct bet amount from balance
            balance -= betAmount;
            updateBalance();

            // Add bet to the list
            bets.push({ amount: betAmount, color: selectedColor });

            // Notify the player
            showNotification(`Bet placed: ${betAmount} on ${selectedColor}`, false);
        });
    });

    // Spin the wheel
    function spinWheel() {
        isSpinning = true;
        const wheel = document.querySelector('.wheel');
        const slots = document.querySelectorAll('.slot');
        const randomSlot = Math.floor(Math.random() * 15); // Select a winning slot
        const winningColor = slots[randomSlot].classList.contains('red') ? 'red' :
            slots[randomSlot].classList.contains('black') ? 'black' : 'green';

        // Distance to move the wheel
        const distance = randomSlot * 60 + 3600; // Add extra distance for smooth deceleration
        wheel.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1)';
        wheel.style.transform = `translateX(-${distance}px)`;

        // Check results after the spin
        setTimeout(() => {
            let totalWinnings = 0;
            bets.forEach(bet => {
                if (bet.color === winningColor) {
                    const multiplier = bet.color === 'green' ? 14 : 2;
                    const winnings = bet.amount * multiplier;
                    totalWinnings += winnings;
                    balance += winnings + bet.amount; // Return bet + winnings
                }
            });

            // Notify the player
            if (totalWinnings > 0) {
                showNotification(`You won +${totalWinnings} coins!`, true);
            } else {
                showNotification('You lost your bet!', false);
            }

            // Reset for the next round
            isSpinning = false;
            bets = [];
            countdown = 10;
            updateBalance();
            startCountdown();
        }, 3000);
    }

    // Start the initial countdown
    updateBalance();
    startCountdown();
});
