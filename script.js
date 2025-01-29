document.addEventListener('DOMContentLoaded', function() {
    const spinButton = document.getElementById('spinButton');
    const resultDiv = document.getElementById('result');
    const boxes = document.querySelectorAll('.box');

    function getRandomColor() {
        const colors = ['red', 'black', 'green'];
        const weights = [7, 7, 1]; // 7 reds, 7 blacks, 1 green
        const total = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * total;
        
        for (let i = 0; i < colors.length; i++) {
            random -= weights[i];
            if (random < 0) {
                return colors[i];
            }
        }
    }

    function animateWheel() {
        boxes.forEach(box => {
            box.style.backgroundColor = getRandomColor();
            box.style.transform = `rotate(${Math.random() * 360}deg)`;
        });
    }

    spinButton.addEventListener('click', function() {
        animateWheel();
        setTimeout(() => {
            const resultColor = getRandomColor();
            boxes.forEach(box => {
                box.style.backgroundColor = resultColor;
                box.style.transform = 'rotate(0deg)';
            });
            const multiplier = resultColor === 'green' ? '14x' : '2x';
            resultDiv.textContent = `The wheel landed on ${resultColor}. You win ${multiplier}!`;
        }, 1500); // Delay to simulate spinning
    });
});
