var timerElement = document.getElementById('timer');
var startBtn = document.getElementById('start-btn');
var quizContainer = document.getElementById('quiz-container');
var questionElement = document.getElementById('question');
var optionsElement = document.getElementById('options');
var feedbackElement = document.getElementById('feedback');
var nextBtn = document.getElementById('next-btn');

var time = 60;
var currentQuestionIndex = 0;
var score = 0;

// Create the submit button
const submitBtn = document.createElement('button');
submitBtn.textContent = 'Submit';
submitBtn.id = 'submitBtn';
submitBtn.style.display = 'none'; // Initially hide the submit button
document.body.appendChild(submitBtn);

function updateTimer() {
  timerElement.textContent = 'Time: ' + time + ' seconds';
}

function startTimer() {
  updateTimer();
  var timerInterval = setInterval(function () {
    time--;
    updateTimer();
    if (time <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function startQuiz() {
  document.getElementById('quiz-container').style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion();
  startTimer();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.textContent = option;
    optionBtn.addEventListener('click', () => checkAnswer(option));
    optionsElement.appendChild(optionBtn);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  feedbackElement.textContent = selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!';
  time -= selectedOption === currentQuestion.correctAnswer ? 0 : 10;
  if (time < 0) time = 0;

  nextBtn.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  feedbackElement.textContent = '';
  nextBtn.style.display = 'none';

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // Show the Submit button after the last question
    submitBtn.style.display = 'block';
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = 'none';

  // If it's the last question, redirect to result.html with the score
  if (currentQuestionIndex === questions.length) {
    setTimeout(function () {
      window.location.href = 'result.html?score=' + score;
    }, 0);
  }
}

// Attach an event listener to the submit button
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  saveScore();
  window.location.href = 'result.html';
});

function saveScore() {
  const initials = prompt('Enter your initials:');
  console.log(`Initials: ${initials}, Score: ${score}`);
  submitQuiz(); 
}

function submitQuiz() {
  // Redirect to the result page after submitting initials
  window.location.href = 'result.html';
}

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// Start the timer when the page loads
document.addEventListener('DOMContentLoaded', function () {
  updateTimer();
});
