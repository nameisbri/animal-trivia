class AnimalTrivia {
  constructor() {
    this.baseURL = "https://opentdb.com/api.php?amount=50&category=27";
  }

  // Function to fetch questions from Open Trivia DB
  async fetchTriviaQuestions() {
    try {
      const response = await axios.get(`${this.baseURL}`);
      // Check if we got valid data
      if (response.data.response_code === 0) {
        // Get random 20 questions from the 50
        const randomQuestions = getRandomQuestions(response.data.results, 20);
        return randomQuestions;
      } else {
        console.log("Failed to get questions from API");
      }
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  }

  // Function to format/clean API response
  async formatQuestions(apiResponse) {
    // Clean HTML entities if any
    // Structure questions in consistent format
    // Return cleaned questions array
  }
}

function getRandomQuestions(questions, amount) {
  // Create a copy of the array to shuffle
  const shuffledQuestions = questions.slice();

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const randNum = Math.floor(Math.random() * (i + 1));
    const question = shuffledQuestions[i];
    shuffledQuestions[i] = shuffledQuestions[randNum];
    shuffledQuestions[randNum] = question;
  }

  // Return first 20 questions
  return shuffledQuestions.slice(0, amount);

  // Create a copy of the array
  const questionsCopy = questions.slice();
  // Shuffle array and get first 20 questions
  return questionsCopy.sort(() => Math.random() - 0.5).slice(0, amount);
}
