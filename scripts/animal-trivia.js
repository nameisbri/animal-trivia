// Game state variables
let currentQuestion = 0;
let score = 0;
let playerName = "";
let questions = [];
const introForm = document.getElementById("intro__form");

// Function to start game
function startGame(e) {
  e.preventDefault();

  // Get player name from input
  playerName = e.target.name.value;

  console.log(playerName);

  // Hide intro screen
  // You'll need: querySelector for the intro screen div
  // Load questions from API and store them
  // You already have your init() function doing this, but where should the questions be stored?
  // Show first question
  // You'll need to call displayQuestion()
}

// Function to display question
function displayQuestion() {
  // Show current question number
  // Display question text
  // Display answer choices
  // Update score display
}

// Function to handle answer selection
function handleAnswer(selectedAnswer) {
  // Check if answer is correct
  // Update score if correct
  // Show feedback
  // Move to next question or end game if last question
}

// Function to end game
function endGame() {
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

const allQuestions = new AnimalTrivia();

// Test the API
async function init() {
  try {
    const questions = await allQuestions.fetchTriviaQuestions();

    console.log("Questions loaded:", questions);
  } catch (error) {
    console.error("Failed to load questions:", error);
  }
}

init();
