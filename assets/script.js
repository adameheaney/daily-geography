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

//game data vars
var questionIndex = 0;
var numQs = 5;
var currentQuestion;
var numCorrect = 0;
var correct = [];
var correctString = 'Daily Geography: ';

//Const // JSON
var jsonData;
const greenCircle = '\u{1F7E2}';
const redCircle = '\u{1F534}';

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
        circles[i].style.backgroundColor = 'whitesmoke'; // Change color as desired
        } else {
        circles[i].style.backgroundColor = 'black'; // Change color as desired
        }
    }
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
    if (selectedIndex === currentQuestion.answer && buttons[selectedIndex].classList.contains('active')) {
        buttons[selectedIndex].style.backgroundColor = 'rgb(75 237 159)'
        numCorrect++;
        correct.push('correct');
        correctString += greenCircle;
    } else if (buttons[selectedIndex].classList.contains('active')) {
        buttons[selectedIndex].style.backgroundColor = 'rgb(245 42 42)'
        correct.push('incorrect');
        correctString += redCircle;
    }
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].classList = ['btn inactive'];
        buttons[i].onclick = null;
    }
    buttons[currentQuestion.answer].style.backgroundColor = 'rgb(75 237 159)';
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
        var usedIndices = [];
        usedIndices.push(correctCountryIndex);
        var correctPosition = Math.floor(Math.random() * buttons.length);
        currentQuestion.answer = correctPosition;
        buttons[correctPosition].textContent = jsonData.country[correctCountryIndex][optionData];
        for(var i = 0; i < buttons.length; i++) {
            if(i != correctPosition){
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
        var usedIndices = [];
        usedIndices.push(correctCountryIndex);
        var image = document.createElement('img');
        image.src = '../artassets/country flags/' + jsonData.country[correctCountryIndex][questionData]
        image.className = 'flag'
        questionElement.appendChild(image);
        var correctPosition = Math.floor(Math.random() * buttons.length);
        currentQuestion.answer = correctPosition;
        buttons[correctPosition].textContent = jsonData.country[correctCountryIndex][optionData];
        for(var i = 0; i < buttons.length; i++) {
            if(i != correctPosition){
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
    for(let i = 0; i < correct.length; i++) {
        
    }
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList = ['btn inactive']
    }
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if(child.id != 'circle-container')
            child.classList.add('fade-out');
    }
    var cookieValue = document.cookie.split("; ").find(row => row.startsWith("num" + numCorrect + '=')).split("=")[1];
    editCookie('num' + numCorrect, parseInt(cookieValue) + 1 + '');
    modifyElements();
}


function modifyElements() {
    var app = document.getElementById('app');
    var children = app.children;
    var i = 0;
    while(children.length > 1) {
        const child = children[i];
        if(child.id != 'circle-container')
            child.remove();
        else i++;
        children = app.children;
    }
    for(let i = 0; i < circles.length; i++) {
        if(correct[i] == 'correct') {
            circles[i].style.backgroundColor = 'rgb(75 237 159)';
        }
        else {
            circles[i].style.backgroundColor = 'rgb(245 42 42)';
        }
    }
    correct = [];
    var gameoverText = document.createElement('h1');
    var shareText = document.createElement('h3');
    var shareButton = document.createElement('button');
    var shareContainer = document.createElement('div');
    var copyText = document.createElement('input');
    var countdown = document.createElement('div');
    countdown.id = 'the-final-countdown';
    countdown.classList.add('fade-in');
    shareContainer.classList.add('fade-in');
    shareContainer.classList.add('share-container');
    shareText.textContent = 'Want to share your score?'
    copyText.textContent = correctString;
    shareButton.onclick = function (text) {
        return function () {
        copyToClipboard(text);
        };
    }(copyText);
    shareButton.className = 'share-button';
    shareButton.textContent = correctString;
    shareButton.style.fontSize = '10px';
    shareContainer.appendChild(shareText);
    shareContainer.appendChild(shareButton);
    gameoverText.textContent = 'You got ' + numCorrect + ' questions correct out of ' + numQs;
    gameoverText.classList.add('fade-in');
    var barGraph = bargraph();
    app.appendChild(gameoverText);
    app.appendChild(shareContainer);
    app.appendChild(barGraph);
    app.appendChild(countdown);
    correctString = 'Daily Geography &#9728;&#127752;: ';
}

// Function to edit a cookie value
function editCookie(cookieName, newValue) {
    var cookies = document.cookie.split(';');
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
  
      if (cookie.startsWith(cookieName + '=')) {
        // Found the cookie, update its value
        var cookieParts = cookie.split('=');
        var updatedCookie = cookieParts[0] + '=' + newValue;
        document.cookie = updatedCookie;
        break;
      }
    }
  }
  
async function copyToClipboard(copyText) {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText.textContent)
          .then(function() {
            //alert("Text copied to clipboard: " + copyText.textContent);
          })
          .catch(function(error) {
            console.error("Failed to copy text: ", error);
          });
      } else {
        // Fallback for older browsers
        copyText.select();
        document.execCommand("copy");
        alert("Text copied to clipboard: " + copyText.value);
    }
    var shareButton = document.getElementsByClassName('share-button')[0];
    shareButton.style.backgroundColor = 'black';
    shareButton.style.color = 'rgb(250, 250, 250)';
    await delay(200);
    shareButton.style.backgroundColor = null;
    shareButton.style.color = null;
}

function bargraph() {
    var bargraphContainer = document.createElement('div');
    var scoreHistory = document.createElement('h4');
    scoreHistory.textContent = 'Score History';
    bargraphContainer.appendChild(scoreHistory);
    bargraphContainer.id = 'bar-graph';
    var bars = [document.createElement('div'), document.createElement('div'), 
                document.createElement('div'), document.createElement('div'),
                document.createElement('div'), document.createElement('div')];
    var barContainers = [document.createElement('div'), document.createElement('div'), 
                        document.createElement('div'), document.createElement('div'),
                        document.createElement('div'), document.createElement('div')];
    var cookieVals = [];
    var largestCookie = 0;
    var largestVal = 0;
    for (let i = 0; i < bars.length; i++) {
        let cookieName = "num" + i;
        let cookieValue = parseInt(getCookie(cookieName));
        cookieVals[i] = cookieValue;
        if(cookieValue > largestVal) {
            largestCookie = i;
            largestVal = cookieValue;
        }
    }
    for(let i = 0; i < bars.length; i++) {
        bars[i].id = 'bar'
        bars[i].textContent = '' + cookieVals[i];
        barContainers[i].textContent = i + ':';
        barContainers[i].id = 'bar-container';
        if(i != largestCookie) {
            if(cookieVals[i] > 0) {
                bars[i].style.width = ((cookieVals[i] / largestVal) * 1)*100 + '%';
            }
            else if(largestVal > 0) {
                bars[i].style.width = '5%';
            }
            else {
                bars[i].style.width = '100%';
            }
        }
        else {
            bars[i].style.width = '100%';
        }
        barContainers[i].appendChild(bars[i]);
        bargraphContainer.appendChild(barContainers[i]);
    }
    console.log(document.cookie);
    return bargraphContainer;
}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
  
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  
    return "";
  }

setInterval(function time(){
    var d = new Date(new Date().toLocaleString("en-US",{timeZone: "America/New_York"}));
    var hours = 23 - d.getHours();
    var min = 60 - d.getMinutes();
    if((min + '').length == 1){
      min = '0' + min;
    }
    var sec = 60 - d.getSeconds();
    if((sec + '').length == 1){
          sec = '0' + sec;
    }
    if(document.getElementById('the-final-countdown') != null)
        document.getElementById('the-final-countdown').textContent = (hours+':'+min+':'+sec + ' left until a new quiz!')
}, 1000);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function instantiateCookies() {
    document.cookie = "num0=0";
    document.cookie = "num1=0";
    document.cookie = "num2=0";
    document.cookie = "num3=0";
    document.cookie = "num4=0";
    document.cookie = "num5=0";
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

if(document.cookie == "") {
    instantiateCookies();
}
