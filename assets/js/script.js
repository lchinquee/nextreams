// WHEN I click the start button
// THEN a timer starts and I am presented with a question

var questionsEl = document.querySelector("#quiz-questions");
var optionsEl = document.querySelector("#multiple-choice");
var answerEl = document.querySelector("#results");
var countdownTimer = document.querySelector("#countdown-timer");
var nextQuestion = document.querySelector("#next-question");

var questionList = 0;
var count = 0;

// Code Quiz Questions
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Alerts",
    },
    {
        question: "The condition in an if/else statement is enclosed with _________.",
        options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        correctAnswer: "Parenthesis",
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        options: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        correctAnswer: "All of the Above",
    },
    {
        question: "String values must be enclosed within _________ when being assigned to variables.",
        options: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        correctAnswer: "Quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "Terminal/Bash", "for loops", "console.log"],
        correctAnswer: "console.log",
    },
];

var questionDisplay = function() {
    //Question generation
    questionsEl.textContent = questions[questionList].question;
    optionsEl.innerHTML = "";

    //Question options
    var options = questions[questionList].options;
    var optionsEnd = options.length;

    for (var i = 0; i < options.length; i++) {
        var questionsListNewItem = document.createElement("li");
        questionsListNewItem.textContent = options[i];
        optionsEl.append(questionsListNewItem);
    }

}

questionDisplay();

// Event listener to Next Question button
nextQuestion.addEventListener("click", function() {
    questionList++;

    if (questionList < 5) {
        questionDisplay();
    }
    // NEED TO INCLUDE ELSE TO NAVIGATE TO SCORING AND INITIAL ENTRY
});

// WHEN I answer a question
// THEN I am presented with another question
   

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and score
    // <textarea for initial entry

// View high scores screen
    // Ordered list of high scores