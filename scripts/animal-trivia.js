// API CONSTRUCTOR

class AnimalTrivia {
  constructor() {
    this.baseURL = "https://opentdb.com/api.php?amount=50&category=27";
  }

  async fetchTriviaQuestions() {
    try {
      const response = await axios.get(`${this.baseURL}`);

      if (response.data.response_code === 0) {
        const randomQuestions = getRandomQuestions(response.data.results, 20);
        return randomQuestions;
      } else {
        console.log("Failed to get questions from API");
      }
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  }
}

function getRandomQuestions(questions, amount) {
  const shuffledQuestions = questions.slice();

  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const randNum = Math.floor(Math.random() * (i + 1));
    const question = shuffledQuestions[i];
    shuffledQuestions[i] = shuffledQuestions[randNum];
    shuffledQuestions[randNum] = question;
  }

  return shuffledQuestions.slice(0, amount);
}

//GAME LOGIC

const allQuestions = new AnimalTrivia();

// Game state variables
let currentQuestion = 0;
let score = 0;
let playerName = "";
let questions = [];

const introScreen = document.querySelector(".intro-screen");
const questionScreen = document.querySelector(".question-screen");
const scoreScreen = document.querySelector(".score-screen");
const startForm = document.querySelector(".form");
// const answerSelection = document.querySelectorAll(".game__answer");

async function startGame(e) {
  e.preventDefault();

  // Get player name from input
  playerName = e.target.querySelector(".form__input").value;

  // Hide intro screen and show question screen
  introScreen.style.display = "none";
  questionScreen.style.display = "block";

  // Load questions from API and store them
  questions = await allQuestions.fetchTriviaQuestions();

  displayQuestion(); // Show first question
}

// Function to display question
function displayQuestion() {
  const questionTitle = document.querySelector(".q__title");
  const questionContent = document.querySelector(".q__content");
  const optionElements = document.querySelectorAll(".q__option");

  const currentQ = questions[currentQuestion];

  // Update question number and text
  questionTitle.textContent = `Question: ${currentQuestion + 1}`;
  questionContent.textContent = currentQ.question;

  // Combine and shuffle all answers
  const allAnswers = currentQ.incorrect_answers.slice();
  allAnswers.push(currentQ.correct_answer);

  // Fisher-Yates shuffle
  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = allAnswers[i];
    allAnswers[i] = allAnswers[j];
    allAnswers[j] = temp;
  }

  // Update answer options
  optionElements.forEach((option, index) => {
    option.textContent = allAnswers[index];

    // Remove old event listeners
    const oldItem = option.closest(".q__item");
    const newItem = oldItem.cloneNode(true);
    oldItem.parentNode.replaceChild(newItem, oldItem);

    // Add new click handler
    newItem.addEventListener("click", () => {
      handleAnswer(allAnswers[index]);
    });
  });

  // Update score display
  document.querySelector(".coins__number").textContent = score;
}

// Function to handle answer selection
function handleAnswer(selectedAnswer) {
  const currentQ = questions[currentQuestion];

  // Check if answer is correct
  if (selectedAnswer === currentQ.correct_answer) {
    score += 5; // Add 5 coins for correct answer
    document.querySelector(".coins__number").textContent = score;
  }

  // Move to next question or end game
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    endGame();
  }
}

// Function to end game
function endGame() {
  // Hide question screen and show score screen
  questionScreen.style.display = "none";
  scoreScreen.style.display = "block";

  // Update final score displays
  document.querySelector(".score-board__score").textContent = `${score}/100`;
  document.querySelector(".score-summary__coin-number").textContent = score;
}

// Event Listeners
// - Start button click
startForm.addEventListener("submit", startGame);

// - Play again button click
document.getElementById("restartButton").addEventListener("click", () => {
  // Reset game state
  currentQuestion = 0;
  score = 0;
  playerName = "";
  questions = [];

  // Reset displays
  document.querySelector(".coins__number").textContent = "0";

  // Show intro screen, hide others
  introScreen.style.display = "block";
  questionScreen.style.display = "none";
  scoreScreen.style.display = "none";
});
