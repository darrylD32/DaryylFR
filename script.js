document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    let countdown = 3.16;
    const countdownElement = document.getElementById('countdown');

    const timer = setInterval(() => {
        countdown -= 0.01;
        countdownElement.textContent = countdown.toFixed(2);

        if (countdown <= 0) {
            clearInterval(timer);
            countdownElement.textContent = "0.00";
            // Trigger roll logic here
        }
    }, 10);
});
