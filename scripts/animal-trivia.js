// Decode HTML entities
function decodeHtmlEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

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

let currentQuestion = 0;
let score = 0;
let playerName = "";
let questions = [];

const introScreen = document.querySelector(".intro-screen");
const questionScreen = document.querySelector(".question-screen");
const scoreScreen = document.querySelector(".score-screen");
const startForm = document.querySelector(".form");
async function startGame(e) {
  e.preventDefault();

  playerName = e.target.querySelector(".form__input").value;

  introScreen.style.display = "none";

  questions = await allQuestions.fetchTriviaQuestions();

  const questionContainer = document.querySelector(".q__wrapper");
  questionContainer.addEventListener("click", (e) => {
    const clickedOption = e.target.closest(".q__item");
    if (clickedOption) {
      const selectedAnswer =
        clickedOption.querySelector(".q__option").textContent;
      handleAnswer(selectedAnswer, clickedOption); // Pass the clicked element
    }
  });

  displayQuestion();

  questionScreen.style.display = "block";
}

function displayQuestion() {
  const questionTitle = document.querySelector(".q__title");
  const questionContent = document.querySelector(".q__content");
  const qWrapper = document.querySelector(".q__wrapper");

  const existingItems = document.querySelectorAll(".q__item");
  existingItems.forEach((item) => item.remove());

  const currentQ = questions[currentQuestion];

  questionTitle.textContent = `Question: ${currentQuestion + 1}`;
  questionContent.textContent = decodeHtmlEntities(currentQ.question);

  const allAnswers = currentQ.incorrect_answers.slice().map(decodeHtmlEntities);
  allAnswers.push(decodeHtmlEntities(currentQ.correct_answer));

  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = allAnswers[i];
    allAnswers[i] = allAnswers[j];
    allAnswers[j] = temp;
  }

  allAnswers.forEach((answer) => {
    const qItem = document.createElement("div");
    qItem.classList.add("q__item");

    const qOption = document.createElement("p");
    qOption.classList.add("q__option");
    qOption.textContent = answer;

    qItem.appendChild(qOption);
    qWrapper.appendChild(qItem);
  });

  document.querySelector(".coins__number").textContent = score;
}

function handleAnswer(selectedAnswer, clickedItem) {
  const currentQ = questions[currentQuestion];

  if (selectedAnswer === decodeHtmlEntities(currentQ.correct_answer)) {
    clickedItem.classList.add("correct");
    score += 5;
    console.log("Score increased! New score:", score);
    document.querySelector(".coins__number").textContent = score;
  } else {
    clickedItem.classList.add("wrong");
    // Show correct answer
    const allItems = document.querySelectorAll(".q__item");
    allItems.forEach((item) => {
      if (
        item.querySelector(".q__option").textContent ===
        decodeHtmlEntities(currentQ.correct_answer)
      ) {
        item.classList.add("correct");
      }
    });
  }

  const allItems = document.querySelectorAll(".q__item");
  allItems.forEach((item) => {
    item.style.pointerEvents = "none";
  });

  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      displayQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  questionScreen.style.display = "none";
  scoreScreen.style.display = "block";

  document.querySelector(".score-board__score").textContent = `${score}/100`;
  document.querySelector(".score-summary__coin-number").textContent = score;
}

startForm.addEventListener("submit", startGame);

document.getElementById("restartButton").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  playerName = "";
  questions = [];

  document.querySelector(".coins__number").textContent = "0";

  introScreen.style.display = "block";
  questionScreen.style.display = "none";
  scoreScreen.style.display = "none";
});
