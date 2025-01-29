document.addEventListener('DOMContentLoaded', function() {
    const spinButton = document.getElementById('spinButton');
    const resultDiv = document.getElementById('result');
    
    spinButton.addEventListener('click', function() {
        fetch('/spin', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            const boxes = document.querySelectorAll('.box');
            // Animate the wheel
            boxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.backgroundColor = data.result === 'red' ? '#FF0000' : 
                                              (data.result === 'black' ? '#000000' : '#00FF00');
                    box.style.transform = `rotate(${Math.random() * 360}deg)`;
                }, index * 50); // delay for animation effect
            });
            // Display result after animation
            setTimeout(() => {
                const multiplier = data.result === 'green' ? '14x' : '2x';
                resultDiv.textContent = `The wheel landed on ${data.result}. You win ${multiplier}!`;
            }, 15 * 50); // After all boxes have changed
        });
    });
});
