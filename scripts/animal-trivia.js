const allQuestions = new AnimalTrivia();

// Game state variables
let currentQuestion = 0;
let score = 0;
let playerName = "";
let questions = [];
const introForm = document.getElementById("intro__form");
const introScreen = document.querySelector(".intro");
const gameScreen = document.querySelectorAll(".game");
// const answerSelection = document.querySelectorAll(".game__answer");

async function startGame(e) {
  e.preventDefault();

  playerName = e.target.name.value;

  console.log(playerName); // Get player name from input

  introScreen.classList.toggle("intro--hidden"); // Hide intro screen

  questions = await allQuestions.fetchTriviaQuestions(); // Load questions from API and store them

  displayQuestion(); // Show first question
}

// Function to display question
function displayQuestion() {
  const questionContainer = document.querySelector(".game__question-container");
  const answerContainer = document.querySelector(".game__answer-container");

  answerContainer.innerHTML = "";
  questionContainer.innerHTML = "";

  const currentQ = questions[currentQuestion];

  console.log("current question number:", currentQuestion + 1);

  const newQuestion = document.createElement("p");
  newQuestion.classList.add("game__question");
  questionContainer.appendChild(newQuestion);

  newQuestion.innerText = `Question number ${currentQuestion + 1}: ${
    currentQ.question
  }`;

  const incorrectA = currentQ.incorrect_answers;

  for (let i = 0; i < incorrectA.length; i++) {
    const newAnswer = document.createElement("p");
    newAnswer.classList.add("game__answer");

    newAnswer.innerText = incorrectA[i];
    answerContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", function () {
      handleAnswer(incorrectA[i]); // Pass the selected answer text
    });
  }

  const correctAnswer = document.createElement("p");
  correctAnswer.classList.add("game__answer");

  correctAnswer.innerText = currentQ.correct_answer;
  answerContainer.appendChild(correctAnswer);

  // Update score display
}

function nextQuestion() {
  console.log("I'm clicked!");
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    endGame();
  }
}

// Function to handle answer selection
function handleAnswer(selectedAnswer) {
  alert("I've been clicked!", selectedAnswer);
  // nextQuestion(); //moves to next question;
  // Check if answer is correct
  // Update score if correct
  // Show feedback
  // Move to next question or end game if last question
}

// Function to end game
function endGame() {
  console.log("Game over!");
  // Hide question screen
  // Show end screen
  // Display final score with player name
  // Show play again button
}

// Event Listeners
// - Start button click
introForm.addEventListener("submit", startGame);

// - Answer choice clicks

// - Play again button click
