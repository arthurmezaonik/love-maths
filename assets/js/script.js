// Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons){
        button.addEventListener('click', function(){
            if (this.getAttribute('data-type') === 'submit'){
                checkAnswear();
            } else{
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown', function(event){
        if(event.key === "Enter"){
            checkAnswear();
        }
    })

    runGame('addition');

})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){

    document.getElementById('answer-box').value = ""

    document.getElementById('answer-box').focus();

    //Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random()*25) + 1;
    let num2 = Math.floor(Math.random()*25) + 1;

    if (gameType === "addition"){
        displayAdditionQuestion(num1, num2);
    } else if(gameType === "subtract"){
        displaySubtractQuestion(num1, num2);
    } else if(gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    } else if(gameType === "division"){
        displayDivisionQuestion(num1, num2);
    } else{
        alert(`Unknoun game type: ${gameType}`)
        throw `Unknoun game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswear(){
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculateAnswer = calculateCorrectAnswear();
    let isCorrect = userAnswer === calculateAnswer[0];
    console.log (isCorrect)

    if (isCorrect){
        alert("Hey! You got it right! :D");
        incrementScore();
    } else{
        alert(`Awww.... you answered ${userAnswer}. The correct answer was ${calculateAnswer[0]}`);
        incrementWrongAnswear();
    }

    runGame(calculateAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the dom, and returns the correct answer
 */
function calculateCorrectAnswear(){

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if(operator === "+"){
        return [operand1 + operand2, 'addition'];
    } else if( operator === "-"){
        return [operand1 - operand2, 'subtract'];
    } else if( operator === "x"){
        return [operand1 * operand2, 'multiply'];
    } else if( operator === "%"){
        return [operand1 / operand2, 'division'];
    } else{
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore(){
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
}

/**
 * Gets the current score from the DOM and decreases it by 1
 */
function incrementWrongAnswear(){
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2){

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "%";
}