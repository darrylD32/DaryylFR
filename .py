import random

class CSGORoulette:
    def __init__(self):
        # Initialize the player's balance with some coins
        self.balance = 100
        # The wheel has 15 slots: 7 red, 7 black, 1 green
        self.wheel = ["red"] * 7 + ["black"] * 7 + ["green"] * 1

    def place_bet(self, amount):
        if amount > self.balance:
            print("Not enough balance!")
            return False
        self.balance -= amount
        return True

    def spin_wheel(self):
        return random.choice(self.wheel)

    def check_winnings(self, bet, color):
        result = self.spin_wheel()
        if color == result:
            if color == "green":
                # Green pays 14x the bet amount
                winnings = bet * 14
            else:
                # Red or Black pays 2x the bet amount
                winnings = bet * 2
            self.balance += winnings
            return f"You won {winnings} coins! The wheel landed on {result}."
        else:
            return f"You lost. The wheel landed on {result}."

    def play_round(self):
        print(f"Your current balance: {self.balance}")
        try:
            bet_amount = int(input("How much do you want to bet? "))
            if not self.place_bet(bet_amount):
                return

            color = input("Choose a color (red/black/green): ").lower()
            if color not in ["red", "black", "green"]:
                print("Invalid color choice!")
                return

            result = self.check_winnings(bet_amount, color)
            print(result)
            print(f"New balance: {self.balance}")
        except ValueError:
            print("Please enter a valid number for the bet amount.")

# Main game loop
game = CSGORoulette()
while True:
    game.play_round()
    if game.balance <= 0:
        print("You're out of coins! Game over.")
        break
    if input("Do you want to play another round? (yes/no): ").lower() != 'yes':
        print("Thanks for playing!")
        break
