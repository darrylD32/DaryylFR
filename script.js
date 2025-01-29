document.getElementById('playButton').addEventListener('click', function() {
    const outcomes = ['Win', 'Lose'];
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    const resultElement = document.getElementById('result');
    
    if (randomOutcome === 'Win') {
        resultElement.textContent = 'Congratulations! You won!';
        resultElement.style.color = '#4CAF50';
    } else {
        resultElement.textContent = 'Sorry, you lost. Try again!';
        resultElement.style.color = '#f44336';
    }
});
