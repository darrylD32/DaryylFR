// Constants and IDs
const WHEEL_WIDTH = 400;
const WHEEL_HEIGHT = 400;
const WHEEL_SIZE = 35; // Size in pixels

// Wheel background image
const wheelImage = 'wheel Background.jpg';

// Slot information (position, dimensions)
const slots = [
    { x: 100, y: 100, width: 50, height: 50 },
    { x: 200, y: 300, width: 50, height: 50 },
    // Add more slot positions as needed
];

// Button IDs
const placeBetButtonId = 'place_bet';
const spinButtonId = 'spin_wheel';

// Result indicator container ID
const resultIndicatorId = 'result_indicator';

// Table header and data columns
const tableHeadHeaders = ['Slot Number', 'Odds'];
const winningOdds = [
    { slotNumber: 1, odds: 'High' },
    { slotNumber: 2, odds: 'Medium' },
    // Add more slots with their respective odds
];
function initializeWheel() {
    // Randomize wheel numbers
    const wheelNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    random.shuffle(wheelNumbers);
    
    // Assign numbers to slots (example)
    let slotNumber = 1;
    for (let i = 0; i < slots.length; i++) {
        const slot = {
            ...slots[i], // Copy slot position
            number: wheelNumbers[slotNumber++] 
        };
        assignSlotToSlot(slot);
    }
}

function assignSlotToSlot(slot) {
    // Function to randomly assign numbers to slots (you can modify this as needed)
    return;
}

function placeBet(accountId, selectedSlot) {
    // Add bet to account
    account.bets.set(accountId, [...account.bets.get(accountId), selectedSlot]);

    // Visual feedback when slot is selected
    selectedSlot.element.style.backgroundColor = '#ff0000';
    selectedSlot.element.classList.add('selected');

    // Handle win checking if slot matches wheel result
    checkWin(selectedSlot);
}

function spinWheel() {
    // Start animation and spin the wheel
    showAnimation(true);

    // Spin logic (simulated)
    const winner = Math.floor(Math.random() * slots.length) + 1;
    
    // Check if selected slot is a winner
    let isWinner = false;
    for (let slot of account.bets) {
        if (slot === winner) {
            isWinner = true;
            break;
        }
    }

    // Show result based on win/lose
    showResult(isWinner);
}

function showAnimation(start) {
    if (!start) return;

    // Animate slots lighting up
    slots.forEach(slot => {
        slot.element.classList.add('lightingUp');
        
        setTimeout(() => {
            slot.element.classList.remove('lightingUp');
        }, 50);
    });

    // Animate wheel spinning
    showWheelRotation();

    setTimeout(() => {
        // Reset animation after 1 second (you can modify as needed)
        clearAnimations();
    }, 1000);
}

function showResult(isWinner) {
    const result = document.getElementById(resultIndicatorId);

    if (!isWinner) {
        result.innerHTML = 'Spun! Try Again!';
    } else {
        // Example payout calculation
        const payout = account.bets.get(accountId).length * 10;
        
        result.innerHTML = `
            <h3>🎉 Big Win! 🎉</h3>
            Spun: ${winner}
            Payout: $${payout}
            <small>Odds: ${winningOdds[winner - 1].odds}</small>
        `;
    }
}

// Check if slot matches wheel result (simulated)
function checkWin(selectedSlot) {
    // You can modify this function based on your game rules
    return;
}
function showWheelRotation() {
    const animation = requestAnimationFrame((timestamp) => {
        if (timestamp > 0 && timestamp < 2000) {
            const rotation = Math.sin(timestamp * 0.5);
            
            // Animate wheel background
            document.getElementById('wheelBackground').style.transform = 
                `rotate(${rotation}deg)`;

            return true;
        } else {
            return false;
        }
    });

    return requestAnimationFrame(animation);
}

function clearAnimations() {
    const animation = window.animations.find('rotating');
    if (animation) animation.stop();
}
// Handle button clicks
document.getElementById(placeBetButtonId).addEventListener('click', (e) => {
    e.preventDefault();
    
    // Visual feedback when clicking on a slot
    slots.forEach(slot => {
        if (slot.element === e.target) {
            slot.element.style.backgroundColor = '#ff0000';
            document.querySelectorAll('#wheelBackground').forEach(bg => bg.style.backgroundColor = '');
            
            setTimeout(() => {
                slot.element.classList.remove('selected');
                showResult(true);
            }, 300);
        }
    });
});

document.getElementById(spinButtonId).addEventListener('click', spinWheel);

// Handle clicking on slots
window.addEventListener('click', (e) => {
    if (!e.target.matches('.slot')) return;

    placeBet(e.target.accountId, e.target.dataset.slotNumber); // Assuming data attributes are added to slot elements
});
// Update the table whenever new bets are placed or results change

function updateTable() {
    const table = document.querySelector('.winning-table');

    table.innerHTML = `
        <table>
            <thead>
                <tr>${tableHeadHeaders.join('</th>')}</th></tr>
            </thead>
            <tbody>
                ${winningOdds.map(slot => `
                    <tr>
                        <td>${slot.slotNumber}</td>
                        <td>${slot.odds}</td>
                    </tr>
                `).join('')}.
            </tbody>
        </table>
    `;
}

// Call updateTable when new bets are placed or results change
document.getElementById('resultIndicatorId').addEventListener('click', updateTable);
function initGame() {
    // Initialize wheel with random numbers
    initializeWheel();

    // Show animation
    showAnimation(true);

    // Start game loop
    const gameLoop = setInterval(() => spinWheel(), 1000); // Spin every second

    // Cleanup
    clearInterval(gameLoop);
}

// Run the game
initGame();
