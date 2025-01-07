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
