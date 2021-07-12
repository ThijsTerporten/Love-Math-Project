//Like a wireframe or ui plan out the structure of the JS
//Each function should apply for one job
//One to run game runGame()
//One to check answer checkAnswer()
//One to calculate corect answer calculateCorrect()
//To check correct answer in relation to game type answer()
//To increment score incrementScore()
//To increment wrong scores incrementWrong()
//Creating questions displayAdditionQuestion(), displaySubtractQuestion(), displayMultiplyQuestion()
// Ask yourself each time how you want your code to run and try and visualise that
//Try to avoid creating global variables and make programs behaving predictibly


//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them 
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button")

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
})

    runGame("addition");
})


//Runs the game
function runGame(gameType) {

    //Generates two random numbers between 1 and 25
    //Math.floor rounds down to the whole number
    //Math.random generates random numbers

    //Sets the value of the answer-box to an empty string
    document.getElementById("answer-box").value = "";
    //Puts the cursor in the answer-box by using the focus() function 
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`)
        throw `Unknown game type ${gametype}, aborting!`;
    }
}

//Checks the answers
function checkAnswer() {

    //Checks the answer against the first element in
    //The returned calculateCorrectAnswer() array
    // Use .value because answer-box id is an input element
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert ("Congratulations, you are one step closer to becoming Einstein");
        incrementScore();
    } else {
        alert(`IM sorry looks like its back to the books, you answered ${userAnswer}, The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

//Calculates correct answer
function calculateCorrectAnswer(){

    //Gets the operands (the numbers) and the operator (plus, minus etc)
    //Directly from the DOM and storing them in variables
    //Makes use of parseInt() to make sure the value is an integer (whole number)

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator: ${operator} `);
        throw `Unimplemented operator ${operator}, aborting`;
    }
}

//Adds score to correct answers
function incrementScore() {

    //Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
 }

//Adds to wrong answers
function incrementWrongAnswer(){

    //Gets the tally of incorrect answers from the DOM and increments it

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

//Functions to display the questions
function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2){

    // Is operand1 larger than operand2? If yes operand1 = operand1 else operand1 = operand2
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-"
}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivideQuestion(operand1, operand2){

    document.getElementById("operator").textContent = "/";
    document.getElementById("operand1").textContent = operand1 * operand2
    document.getElementById("operand2").textContent = operand2
}
// Things to keep in mind when creating new questions
// runGame() needs to have the new game type added
// Create the displayQuestion() function
// Update calculateCorrectAnswer() function to generate the correct answer based on the operator.