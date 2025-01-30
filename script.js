<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSGO Roulette</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header>
            <h1>CSGO Roulette</h1>
            <div class="balance">
                <span>Coins: </span>
                <span id="balance">1000</span>
            </div>
        </header>

        <!-- Main Game Area -->
        <main>
            <!-- Timer Display -->
            <section class="timer">
                <h2>Time Left: <span id="countdown">10</span>s</h2>
            </section>

            <!-- Roulette Wheel -->
            <section class="roulette-wheel">
                <div class="wheel">
                    <div class="slots">
                        <!-- Slots will be generated dynamically -->
                    </div>
                </div>
                <div class="pointer"></div>
            </section>

            <!-- Betting Area -->
            <section class="betting-area">
                <div class="bet-amount">
                    <label for="bet-input">Bet Amount:</label>
                    <input type="number" id="bet-input" value="10" min="1">
                </div>
                <div class="bet-options">
                    <div class="bet-option-container">
                        <button class="bet-option red" data-color="red">Red</button>
                        <div class="bet-display" id="red-display"></div>
                    </div>
                    <div class="bet-option-container">
                        <button class="bet-option black" data-color="black">Black</button>
                        <div class="bet-display" id="black-display"></div>
                    </div>
                    <div class="bet-option-container">
                        <button class="bet-option green" data-color="green">Green</button>
                        <div class="bet-display" id="green-display"></div>
                    </div>
                </div>
            </section>

            <!-- Results Section -->
            <section class="results">
                <h2>Recent Results</h2>
                <div class="results-list">
                    <!-- Results will be added dynamically -->
                </div>
            </section>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>
