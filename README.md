# Mine Sweeper 🎮

A simple educational Mine Sweeper game built with HTML, CSS, and Vanilla JavaScript.

---

## 📚 About This Project

This project was built as a learning exercise to practice:
- DOM manipulation
- Event handling
- Game logic in JavaScript

---

## 🎮 How to Play

- **You start each game with 3 lives (hearts).**
- **Select a difficulty level before starting the game:**
  - **Beginner**: Smaller board with fewer mines.
  - **Medium**: Standard board and mine count.
  - **Expert**: Larger board with many mines.
- Left-click on a cell to reveal it:
  - If you click on a mine, you lose one life.
  - The game continues until all lives are lost or all non-mine cells are revealed.
- Right-click on a cell to place or remove a flag.
- Numbers on cells show how many mines are adjacent to that cell.
- Timer and mine counter help track your progress.

💡 **Note:** Unlike classic Minesweeper, this version allows up to 3 mistakes before the game is over!

---

## ✨ Game Features

- 🎛️ **Difficulty Levels**: Beginner, Medium, Expert.
- ❤️ **Lives System**: 3 hearts per game — survive up to 3 mistakes.
- 🕒 **Timer**: Tracks how long each game takes.
- 💾 **Best Score Tracking**: Saves your best times per difficulty level.
- 💡 **Hints**: Reveal neighboring cells temporarily.
- 🛡️ **Safe Click**: Highlights a safe cell to help you progress.
- 🔍 **Mega Hint**: Temporarily reveals a larger area of the board.
- 🌙 **Dark Mode**: Toggle between light and dark themes.

---

## ⚙️ Game Logic Overview

- **Board Initialization:**
  - The board is generated as a 2D array.
  - Mines are randomly placed after the first click to avoid immediate loss.
  - The number of mines depends on the selected difficulty.

- **Revealing Cells:**
  - Clicking a cell triggers a recursive reveal if there are no adjacent mines.
  - If a cell has mines nearby, it shows a number.

- **Flagging:**
  - Right-click toggles a flag on a cell to mark suspected mines.

- **Winning Condition:**
  - The player wins when all non-mine cells are revealed.

- **Losing Condition:**
  - The player loses after revealing mines and losing all 3 lives.

---

## 🚀 How to Run the Game

### Option 1: Open Directly in Browser
1. Clone or download the repository:
   ```bash
   git clone https://github.com/OrAntebi/Mine-Sweeper-main.git

---

## 📸 Screenshot

Here’s what the game looks like while playing:

<img width="700" alt="image1" src="https://github.com/user-attachments/assets/9667a5e4-33ce-4f8a-8a18-37795adc66d0" />
<img width="700" alt="image2" src="https://github.com/user-attachments/assets/4a027f2a-debd-4a06-9393-516dffa4051a" />
<img width="700" alt="image3" src="https://github.com/user-attachments/assets/e2aeb89c-d13f-44e9-ace0-a68f7910983e" />

