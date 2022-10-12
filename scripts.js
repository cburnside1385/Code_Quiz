﻿// Gathering HTML elements for manipulation
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var fnlScore = document.getElementById("finalScore");
var quizTimer = document.getElementById("timer");
var startButton = document.getElementById("startbtn");
var startDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var Name = document.getElementById("FullName");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var hghScore = document.getElementById("highscore-score");
var gameoverman = document.getElementById("gameover");
var qs = document.getElementById("questions");
// Quiz question object
var quizQuestions = [{
    question: "What is a JavaScript element that represents either TRUE or FALSE values?",
    A: "Boolean",
    B: "Condition",
    C: "RegExp",
    D: "Event",
    answer: "a"
},

{
    question: "What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
    A: "JSON",
    B: "Python",
    C: "Scope",
    D: "Syntax",
    answer: "d"
},
{
    question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
    A: "String",
    B: "Function",
    C: "Declartion",
    D: "Variable",
    answer: "b"
},
{
    question: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
    A: "Clone",
    B: "Debugger",
    C: "Repeater",
    D: "Loop",
    answer: "d"
},

    {
        question: "What does WWW stand for?",
        A: "World Wide Web",
        B: "Web World Workings",
        C: "Weak Winter Wind",
        D: "Wendy Wants Waffles",
        answer: "a"
    },


];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 20;
var timer;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
    gameoverman.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    qs.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.A;
    btnB.innerHTML = currentQuestion.B;
    btnC.innerHTML = currentQuestion.C;
    btnD.innerHTML = currentQuestion.D;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
    gameoverman.style.display = "none";
    startDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timer = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
    quizBody.style.display = "none"
    gameoverman.style.display = "flex";
    clearInterval(timer);
    Name.value = "";
    fnlScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

function checks(answer) {
    correct = quizQuestions[currentQuestionIndex].answer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

submitScoreBtn.addEventListener("click", function highscore() {


    if (Name.value === "") {
        alert("Please enter your name");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = Name.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverman.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        Highscores();

    }

});


function Highscores() {
    highscoreDisplayName.innerHTML = "";
    hghScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        hghScore.appendChild(newScoreSpan);
    }
}



// clears scoreboard
function clear() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    hghScore.textContent = "";
}

// start over
function replay() {
    highscoreContainer.style.display = "none";
    gameoverman.style.display = "none";
    startDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// shows scores from players
function showscores() {
    startDiv.style.display = "none"
    gameoverman.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    Highscores();
}

// start
startButton.addEventListener("click", startQuiz);