document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.getElementById('balance');
    const betInput = document.getElementById('bet-input');
    const placeBetButton = document.getElementById('place-bet');
    const betOptions = document.querySelectorAll('.bet-option');
    const resultsList = document.querySelector('.results-list');
    const slotsContainer = document.querySelector('.slots');
    const countdownElement = document.getElementById('countdown');

    let balance = 1000;
    let currentBet = 10;
    let selectedColor = null;
    let countdown = 10;
    let countdownInterval;
    let isSpinning = false;

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
    placeBetButton.addEventListener('click', function () {
        if (isSpinning) {
            alert('Wait for the current spin to finish!');
            return;
        }

        const betAmount = parseInt(betInput.value);
        if (betAmount < 1 || betAmount > balance) {
            alert('Invalid bet amount!');
            return;
        }

        if (!selectedColor) {
            alert('Please select a color to bet on!');
            return;
        }

        // Deduct bet amount from balance
        balance -= betAmount;
        updateBalance();

        // Add bet to results
        const resultItem = document.createElement('p');
        resultItem.textContent = `Bet: ${betAmount} on ${selectedColor}`;
        resultsList.appendChild(resultItem);
    });

    // Handle color selection
    betOptions.forEach(option => {
        option.addEventListener('click', function () {
            selectedColor = this.dataset.color;
            betOptions.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
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
        wheel.style.transform = `translateX(-${randomSlot * 60}px)`;

        // Check if the player won
        setTimeout(() => {
            if (selectedColor === winningColor) {
                let multiplier = 1;
                if (winningColor === 'green') {
                    multiplier = 14; // Green pays 14x
                } else {
                    multiplier = 2; // Red/Black pays 2x
                }
                const winnings = currentBet * multiplier;
                balance += winnings;
                updateBalance();
                alert(`You won ${winnings} coins!`);
            } else {
                alert('You lost!');
            }

            // Add result to the list
            const resultItem = document.createElement('p');
            resultItem.textContent = `Result: ${winningColor}`;
            resultsList.appendChild(resultItem);

            // Reset for the next round
            isSpinning = false;
            countdown = 10;
            countdownElement.textContent = countdown;
            startCountdown();
        }, 3000);
    }

    // Start the initial countdown
    startCountdown();
});
