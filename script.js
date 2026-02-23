// Data: array of question objects
const quizData = [
    {
        question: "What's the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"],
        correct: "Da Vinci"
    }
];

// Game state
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = quizData.length;
let answerLock = false; // prevents multiple answers while showing feedback

// DOM elements
const questionEl = document.getElementById('question');
const choicesContainer = document.getElementById('choices-container');
const scoreSpan = document.getElementById('score');
const totalSpan = document.getElementById('total-questions');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');

// Initialize total questions display
totalSpan.textContent = totalQuestions;

// Display current question and choices
function displayQuestion() {
    if (currentQuestionIndex < totalQuestions) {
        const q = quizData[currentQuestionIndex];
        questionEl.textContent = q.question;
        choicesContainer.innerHTML = ''; // clear previous buttons
        q.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice;
            btn.dataset.choice = choice; // store the choice text
            btn.addEventListener('click', handleAnswer);
            choicesContainer.appendChild(btn);
        });
        answerLock = false; // allow answering
        resultDiv.innerHTML = ''; // clear any previous messages
    } else {
        // Game over
        questionEl.textContent = '';
        choicesContainer.innerHTML = '';
        resultDiv.innerHTML = `You scored ${score} out of ${totalQuestions}!`;
        restartBtn.style.display = 'inline-block';
    }
    updateScoreDisplay();
}

// Handle answer click
function handleAnswer(e) {
    if (answerLock) return; // ignore if already answered
    const selectedBtn = e.target;
    const selectedAnswer = selectedBtn.dataset.choice;
    const currentQ = quizData[currentQuestionIndex];
    const isCorrect = (selectedAnswer === currentQ.correct);

    // Disable all buttons to prevent further clicks
    const allBtns = document.querySelectorAll('.choice-btn');
    allBtns.forEach(btn => btn.disabled = true);

    // Visual feedback
    allBtns.forEach(btn => {
        if (btn.dataset.choice === currentQ.correct) {
            btn.classList.add('correct'); // highlight correct answer
        } else if (btn === selectedBtn && !isCorrect) {
            btn.classList.add('wrong'); // highlight wrong selection
        }
    });

    if (isCorrect) {
        score++;
        resultDiv.innerHTML = '✅ Correct!';
        // Automatically move to next question after a short delay
        answerLock = true;
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1000);
    } else {
        resultDiv.innerHTML = '❌ Wrong! Try again.';
        // Re-enable buttons after a short delay to let user see feedback
        answerLock = true;
        setTimeout(() => {
            // Re-enable all buttons and remove feedback classes
            allBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'wrong');
            });
            resultDiv.innerHTML = ''; // clear message
            answerLock = false;
        }, 1500);
    }
    updateScoreDisplay();
}

// Update score display
function updateScoreDisplay() {
    scoreSpan.textContent = score;
}

// Restart the game
function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    answerLock = false;
    restartBtn.style.display = 'none';
    displayQuestion();
}

// Event listener for restart button
restartBtn.addEventListener('click', restartGame);

// Start the game
displayQuestion();
