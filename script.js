document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.getElementById('balance');
    const betInput = document.getElementById('bet-input');
    const betOptions = document.querySelectorAll('.bet-option');
    const resultsList = document.querySelector('.results-list');
    const slotsContainer = document.querySelector('.slots');
    const countdownElement = document.getElementById('countdown');
    const notification = document.getElementById('notification');

    let balance = 1000;
    let currentBet = 10;
    let selectedColor = null;
    let countdown = 10;
    let countdownInterval;
    let isSpinning = false;
    let bets = [];

    // Generate roulette slots (7 red, 7 black, 1 green)
    const totalSlots = 30; // Ensure a larger set of slots for infinite scrolling
    const slots = [];

    // Create slot elements
    for (let i = 0; i < totalSlots; i++) {
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

    // Duplicate slots for infinite scrolling effect
    slotsContainer.innerHTML += slotsContainer.innerHTML;

    // Update balance display
    function updateBalance() {
        balanceElement.textContent = balance;
    }

    // Show notification
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
        const randomSlot = Math.floor(Math.random() * totalSlots);
        const winningColor = slots[randomSlot].classList.contains('red') ? 'red' :
            slots[randomSlot].classList.contains('black') ? 'black' : 'green';

        // Ensure smooth, left-to-right movement of the wheel
        const spinDistance = randomSlot * 60; // 60px width per slot
        wheel.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1)';
        wheel.style.transform = `translateX(-${spinDistance}px)`; // Only translate left-to-right

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

            // Notify the player
            if (totalWinnings > 0) {
                showNotification(`+${totalWinnings} coins!`, true);
            } else {
                showNotification(`-${bets.reduce((sum, bet) => sum + bet.amount, 0)} coins`, false);
            }

            // Reset for the next round
            isSpinning = false;
            bets = [];
            countdown = 10;
            countdownElement.textContent = countdown;
            startCountdown();
        }, 3000);
    }

    // Start the initial countdown
    startCountdown();
});

