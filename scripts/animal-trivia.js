// Game state variables
let currentQuestion = 0;
let score = 0;
let playerName = "";
let questions = [];

// Function to start game
function startGame() {
  // Get player name from input
  // Hide intro screen
  // Load questions from API
  // Show first question
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
