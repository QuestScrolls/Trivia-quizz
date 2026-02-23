# Trivia Game

A simple, interactive trivia game built with HTML, CSS, and JavaScript.  
Test your knowledge with a few fun questions and get instant feedback!

## Features
- Clean, responsive design with a gradient background.
- Questions with multiple‑choice answers.
- Immediate visual feedback for correct/incorrect answers.
- Score tracking throughout the game.
- Option to restart after completing the quiz.
- Fully keyboard‑accessible and screen‑reader friendly.

## Technologies
- HTML5
- CSS3 (with Flexbox and transitions)
- Vanilla JavaScript (no external libraries)

## How to Play
1. Open `index.html` in any modern web browser.
2. Read the question and click on one of the answer buttons.
3. If you're correct, you'll see a green highlight and move to the next question automatically.
4. If you're wrong, the correct answer is highlighted in green, your choice in red, and you can try again after a short pause.
5. Your score is shown at the top.
6. After answering all questions, you'll see your final score and a "Play Again" button.

## Project Structure
trivia-game/
│
├── index.html # Main HTML page
├── style.css # All styling
├── script.js # Game logic
└── README.md # This file


## Customizing Questions
To add or modify questions, edit the `quizData` array in `script.js`.  
Each question object should have:
- `question`: string
- `choices`: array of strings (4 or more)
- `correct`: exact string matching one of the choices

Example:
```javascript
{
    question: "What is the largest ocean?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
}
