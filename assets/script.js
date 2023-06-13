var questions = [
    {
        question: "Which country's flag is this?",
        options: ["op1", "op2", "op3", "op4"],
        answer: 0,
        questionData: "flag",
        optionData: "name"
    },
    {
        question: "What is the capital of ",
        options: ["op1", "op2", "op3", "op4"],
        answer: 0,
        questionData: "name",
        optionData: "capital"
    },
    {
        question: "What is the population of ",
        options: ["op1", "op2", "op3", "op4"],
        answer: 0,
        questionData: "name",
        optionData: "population"
    },
    {
        question: "Which country has the capital ",
        options: ["op1", "op2", "op3", "op4"],
        answer: 0,
        questionData: "capital",
        optionData: "name"
    },
    /*{
        question: "On which continent is this country?",
        options: ["op1", "op2", "op3", "op4"],
        answer: 0
    },
    {
        question: "On which continent is this country?",
        options: ["op1", "op2", "op3", "op4"],
        answer: 0
    }, */
];

//elements
var questionElement = document.getElementById('question-text')
var optionsElement = document.getElementById('answer-buttons');
var circleContainerElement = document.getElementById('circle-container');
var circles = circleContainerElement.getElementsByClassName('circle');
var buttons = optionsElement.getElementsByClassName('btn')
var nextButton = document.getElementById('next-btn');

//storage vars
var questionIndex = 0;
var numQs = 5;
var currentQuestion;
var numCorrect = 0;

//JSON
var jsonData;


// Function to select a random question and display it
function displayRandomQuestion(chosenIndex) {
    var randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    setUpQuestion();
    updateCircles();

    // fill in the options
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function (index) {
            return function () {
            checkAnswer(index);
            };
        }(i);
    }
}

//function to update the circle displays
function updateCircles() {
    for (var i = 0; i < circles.length; i++) {
        if (i <= questionIndex) {
        circles[i].style.backgroundColor = 'black'; // Change color as desired
        } else {
        circles[i].style.backgroundColor = 'rgb(250, 250, 250)'; // Change color as desired
        }
    }
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
    if (selectedIndex === currentQuestion.answer && buttons[selectedIndex].classList.contains('active')) {
        buttons[selectedIndex].style.backgroundColor = 'rgb(73 152 94)'
        numCorrect++;
    } else if (buttons[selectedIndex].classList.contains('active')) {
        buttons[selectedIndex].style.backgroundColor = 'rgb(157 55 55)'
    }
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].classList = ['btn inactive'];
        buttons[i].onclick = null;
    }
    buttons[currentQuestion.answer].style.backgroundColor = 'rgb(73 152 94)';
    questionIndex++;
    nextButton.onclick = resetQuestion;
    nextButton.classList = ['active']
    if(questionIndex == numQs) {
        nextButton.textContent = 'Done';
    }
}

//function to reset the question and UI
function resetQuestion() {
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].classList = ['btn active']
        buttons[i].style.backgroundColor = null;
    }
    nextButton.classList = ['inactive']
    nextButton.onclick = null;
    if(questionIndex >= numQs) {
        gameEnd();
    }
    else
        displayRandomQuestion();
}

//function to set up the next question using the data
function setUpQuestion() {
    const questionData = currentQuestion.questionData;
    const optionData= currentQuestion.optionData;
    if(questionData != 'flag'){
        const correctCountryIndex = Math.floor(Math.random() * jsonData.country.length)
        const qDat = (jsonData.country[correctCountryIndex][questionData]);
        questionElement.textContent = currentQuestion.question + qDat + '?';
        var usedIndices = [correctCountryIndex];
        var correctPosition = Math.floor(Math.random() * buttons.length);
        for(var i = 0; i < buttons.length; i++) {
            if(i == correctPosition){
                currentQuestion.answer = i;
                buttons[i].textContent = jsonData.country[correctCountryIndex][optionData];
            }
            else {
                var randIndex = Math.floor(Math.random() * jsonData.country.length)
                while(usedIndices.includes(randIndex)) {
                    randIndex = Math.floor(Math.random() * jsonData.country.length)
                }
                usedIndices.push(randIndex);
                buttons[i].textContent = jsonData.country[randIndex][optionData];
            }
        }
    } 
    else if (questionData == 'flag') {
        const correctCountryIndex = Math.floor(Math.random() * jsonData.country.length)
        const qDat = (jsonData.country[correctCountryIndex][questionData]);
        questionElement.textContent = currentQuestion.question;
        var usedIndices = [correctCountryIndex];

        var image = document.createElement('img');
        image.src = '../artassets/country flags/' + jsonData.country[correctCountryIndex][questionData]
        image.className = 'flag'
        questionElement.appendChild(image);
        var correctPosition = Math.floor(Math.random() * buttons.length);
        for(var i = 0; i < buttons.length; i++) {
            if(i == correctPosition){
                currentQuestion.answer = i;
                buttons[i].textContent = jsonData.country[correctCountryIndex][optionData];
            }
            else {
                var randIndex = Math.floor(Math.random() * jsonData.country.length)
                while(usedIndices.includes(randIndex)) {
                    randIndex = Math.floor(Math.random() * jsonData.country.length)
                }
                usedIndices.push(randIndex);
                buttons[i].textContent = jsonData.country[randIndex][optionData];
            }
        }
    }
    
}

function gameEnd() {
    var app = document.getElementById('app');
    var children = app.children;
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList = ['btn inactive']
    }
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.classList.add('fade-out');
    }
    deleteAndCreateItems();
}

setTimeout(function() {
    // Code to execute after the delay
    console.log("Delay complete");
}, 2000);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteAndCreateItems() {
    await delay(1000);
    var app = document.getElementById('app');
    var children = app.children;
    while(children.length > 0) {
        const child = children[0];
        child.remove();
        children = app.children;
    }
    var gameoverText = document.createElement('h1');
    gameoverText.textContent = 'You got ' + numCorrect + ' questions correct out of ' + numQs;
    gameoverText.classList.add('fade-in');
    app.appendChild(gameoverText);
    setTimeout(function() {
        gameoverText.style.opacity = '1';
    }, 10);
}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    jsonData = JSON.parse(xhr.responseText);
  }
};
xhr.open('GET', '../data/countries.json', false);
xhr.send();

// You can use the jsonData variable outside the XMLHttpRequest event handler as well

// Display the first question---------------
displayRandomQuestion();
// -----------------------------------------