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

    const slots = [];
    for (let i = 0; i < 15; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        if (i === 0) slot.classList.add('green');
        else if (i % 2 === 0) slot.classList.add('black');
        else slot.classList.add('red');
        slots.push(slot);
        slotsContainer.appendChild(slot);
    }

    function startCountdown() {
        countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            if (countdown <= 0) clearInterval(countdownInterval);
        }, 1000);
    }

    function spinWheel() {
        const randomSlot = Math.floor(Math.random() * slots.length);
        const wheel = document.querySelector('.wheel');
        const distance = 60 * 30 + randomSlot * 60;
        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `translateX(-${distance}px)`;
    }

    startCountdown();
});
