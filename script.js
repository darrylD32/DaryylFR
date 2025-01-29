document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.getElementById('balance');
    const betInput = document.getElementById('bet-input');
    const placeBetButton = document.getElementById('place-bet');
    const betOptions = document.querySelectorAll('.bet-option');
    const resultsList = document.querySelector('.results-list');
    const slotsContainer = document.querySelector('.slots');

    let balance = 1000;
    let currentBet = 10;
    let selectedColor = null;

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

    // Update balance display
    function updateBalance() {
        balanceElement.textContent = balance;
    }

    // Handle bet placement
    placeBetButton.addEventListener('click', function () {
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

        // Spin the wheel
        spinWheel(betAmount, selectedColor);
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
    function spinWheel(betAmount, selectedColor) {
        const wheel = document.querySelector('.wheel');
        const slots = document.querySelectorAll('.slot');
        const randomSlot = Math.floor(Math.random() * 15);
        const winningColor = slots[randomSlot].classList.contains('red') ? 'red' :
            slots[randomSlot].classList.contains('black') ? 'black' : 'green';

        // Stop the wheel at the winning slot
        wheel.style.animation = 'none';
        void wheel.offsetWidth; // Trigger reflow
        wheel.style.transform = `translateX(-${randomSlot * 60}px)`;

        // Check if the player won
        if (selectedColor === winningColor) {
            let multiplier = 1;
            if (winningColor === 'green') {
                multiplier = 14; // Green pays 14x
            } else {
                multiplier = 2; // Red/Black pays 2x
            }
            const winnings = betAmount * multiplier;
            balance += winnings;
            updateBalance();
            alert(`You won ${winnings} coins!`);
        } else {
            alert('You lost!');
        }

        // Add result to the list
        const resultItem = document.createElement('p');
        resultItem.textContent = `Bet: ${betAmount} on ${selectedColor} - Result: ${winningColor}`;
        resultsList.appendChild(resultItem);
    }
});
