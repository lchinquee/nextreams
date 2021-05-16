var startQuizEl = document.querySelector("#start-quiz");
var questionsEl = document.querySelector("#quiz-questions");
var optionsEl = document.querySelector("#multiple-choice");
var answerEl = document.querySelector("#results");
var countdownTimerEl = document.querySelector("#countdown-timer");
var scoresEl = document.querySelector("#high-scores");
var formEl = document.querySelector("#form");
var endQuizEl = document.querySelector("#end-quiz");
var scoresListEl = document.querySelector("#scores-list");
var playerListEl = document.querySelector("#list-players");
var nextQuestion = document.querySelector("#next-question");

var questionList = 0;
var count = 0;
var time = 120;
var timeInterval;
var hide = document.getElementById("form");
var hideStart = document.getElementById("start");
var hideStartQuiz = document.getElementById("start-quiz");
var scoresButtons = document.getElementById("view-scores-buttons");
var saveButton = document.getElementById("btn");

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

var startQuiz = function () {
    clearInterval(timeInterval);

    countdownTimerEl.textContent = time;

    hide.style.display = "none";
    scoresButtons.style.display = "none";

    //Start quiz header
    var headerEl = document.body;
    headerEl = document.createElement("div");
    headerEl.className = "header";
    headerEl.innerHTML = "<h1>" + "Coding Quiz Challenge" + "</h1>";
    startQuizEl.appendChild(headerEl);

    //Start quiz description
    var quizDescriptionEL = document.createElement("div");
    quizDescriptionEL.className = "description";
    quizDescriptionEL.innerHTML = "<p>" + "Try to answer the following code-related questions within the time limit." + "<br>" + "Keep in mind that incorrect answers will penalize your score/time by ten seconds!" + "</p>";
    startQuizEl.appendChild(quizDescriptionEL);

    //Start quiz button
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start";
    startButtonEl.className = "btn start-btn";
    startButtonEl.onclick = function () { questionDisplay() };
    startQuizEl.appendChild(startButtonEl);
}

var end = function () {
    clearInterval(timeInterval);

    //Final score display
    questionsEl.innerHTML = "";
    optionsEl.innerHTML = "";
    answerEl.innerHTML = "";

    var endDisplay = document.createElement("div");
    endDisplay.className = "end-display";
    endDisplay.innerHTML = "<h2>" + "All Done!" + "</h2><span class='description'>" + "Your final score is " + count + ". </span>";
    endQuizEl.appendChild(endDisplay);

    //Score submit form
    hide.style.display = "block";
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        var initial = document.getElementById("initials").value;
        localStorage.setItem(initial, count);

        endDisplay.innerHTML = "<h2>" + "All Done!" + "</h2><span class='description'>" + "Your final score of " + count + " has been saved! </span>";
    });
}

var timer = function () {
    time--;
    countdownTimerEl.textContent = time;
    if (time <= 0) {
        countdownTimerEl.textContent = time;
        count = time;
        end();
    }
}

var questionDisplay = function () {
    if (time === 0) {
        end();
        return;
    }

    timeInterval = setInterval(timer, 1000);

    startQuizEl.innerHTML = "";

    //Question generation
    questionsEl.textContent = questions[questionList].question;
    optionsEl.innerHTML = "";
    answerEl.innerHTML = "";

    //Question options
    var options = questions[questionList].options;

    //List out the options
    for (var i = 0; i < options.length; i++) {
        var questionsListNewItem = document.createElement("li");
        questionsListNewItem.textContent = options[i];
        optionsEl.append(questionsListNewItem);
    }

}

// Next Question goes to next question in the array
var nextQuestion = function () {
    questionList++;
    if (questionList === questions.length) {
        time = 0;
    }
    questionDisplay();
}

// Check to see if user answer is correct
var answerChecks = function (event) {
    clearInterval(timeInterval);    
    if (event.target.matches("li")) {
        var optionSelected = event.target.textContent;
        // Answer is correct, increase score count
        if (optionSelected === questions[questionList].correctAnswer) {
            answerEl.textContent = "Correct!";
        } else {
            // Answer is wrong, subtract time
            answerEl.textContent = "Wrong!";
            time = time - 10;
        }
    }
    count = time;
    countdownTimerEl.textContent = time;
    setTimeout(nextQuestion, 750);
}

var highScores = function () {
    hideStart.style.display = "none";
    hideStartQuiz.style.display = "none";
    saveButton.style.display = "none";
    scoresButtons.style.display = "block";

    questionsEl.innerHTML = "";
    optionsEl.innerHTML = "";
    answerEl.innerHTML = "";
    endQuizEl.innerHTML = "";
    formEl.innerHTML = "";

    //High scores title
    var listEl = document.body;
    listEl = document.createElement("div");
    listEl.className = "header";
    listEl.innerHTML = "<h2>" + "High Scores" + "</h2>";
    scoresListEl.appendChild(listEl);

    //High scores list
    var names = [];
    var scoreLi = [];
    var namesFinal = [];

    for (var i = 0; i < localStorage.length; i++) {
        names = names.concat(localStorage.key(i));
        scoreLi = scoreLi.concat(parseInt(localStorage.getItem(names[i])));
    }

    //Associates score with corresponding initials from localStorage
    scoreLiKey = scoreLi.map(String);
    scoreLi = scoreLi.sort((a, b) => b - a);
    scoreLiKeyNew = scoreLi.map(String);
    scoreAndName = [];
    for (var j = 0; j < localStorage.length; j++) {
        scoreIdx = scoreLiKey.indexOf(scoreLiKeyNew[j]);
        namesFinal = namesFinal.concat(names[scoreIdx]);
        scoreAndName = scoreAndName.concat(' ' + namesFinal[j] + ' - ' + scoreLiKeyNew[j]);
    }

    //List out the scores
    for (var k = 0; k < scoreAndName.length; k++) {
        var scoreListNewItem = document.createElement("li");
        scoreListNewItem.textContent = scoreAndName[k];
        playerListEl.append(scoreListNewItem);
    }

    //Back button
    backBtn.addEventListener("click", function() {
        window.location.reload();
    });
    

    //Clear scores button
    clearScores.addEventListener("click", function() {
       localStorage.clear();
       playerListEl.innerHTML = "";
    });

}

optionsEl.addEventListener("click", answerChecks);
scoresEl.addEventListener("click", highScores);

startQuiz();