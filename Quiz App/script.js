
const correctUsername = "tanisha";
const correctPassword = "1234";

const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const loginSection = document.getElementById("login-section");
const quizSection = document.getElementById("quiz-section");


loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === correctUsername && password === correctPassword) {
    loginSection.style.display = "none";
    quizSection.style.display = "block";
    startQuiz();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
});


const questions = [
  {
    question: "How do you check equality without type conversion?",
    answers: [
      { text: "==", correct: false },
      { text: "!=", correct: false },
      { text: "===", correct: true },
      { text: "<>", correct: false }
    ]
  },
  {
    question: "Which method converts JSON string to JS object?",
    answers: [
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.objectify()", correct: false },
      { text: "JSON.toObject()", correct: false }
    ]
  },
  {
    question: "What is the result of 2 + '2'?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "NaN", correct: false },
      { text: "undefined", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    answers: [
      { text: "let", correct: false },
      { text: "var", correct: false },
      { text: "const", correct: true },
      { text: "define", correct: false }
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Manager", correct: false },
      { text: "Display Object Method", correct: false },
      { text: "Document Order Mode", correct: false }
    ]
  },
  {
    question: "Which event runs when a user clicks an HTML element?",
    answers: [
      { text: "onmouseover", correct: false },
      { text: "onmouseclick", correct: false },
      { text: "onclick", correct: true },
      { text: "onchange", correct: false }
    ]
  },
  {
    question: "What is the default behavior of 'position: static;' in CSS?",
    answers: [
      { text: "Relative to parent", correct: false },
      { text: "Ignores positioning", correct: true },
      { text: "Fixed at top", correct: false },
      { text: "Moves with scroll", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: [
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Object", correct: false }
    ]
  },
  {
    question: "What method is used to add an element to an array?",
    answers: [
      { text: "add()", correct: false },
      { text: "insert()", correct: false },
      { text: "push()", correct: true },
      { text: "append()", correct: false }
    ]
  },
  {
    question: "Which of these is used for comments in JavaScript?",
    answers: [
      { text: "// comment", correct: true },
      { text: "# comment", correct: false },
      { text: "<!-- comment -->", correct: false },
      { text: "** comment", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
