function add (number1, number2) {
	return number1 + number2;
}

function subtract (number1, number2) {
	return number1 - number2;
}

function multiply (number1, number2) {
	return number1 * number2;
}

function divide (number1, number2) {
    if (number2 == 0){
        return "lmao"
    } 
	return number1 / number2;
}

function erase (operation){
    operation.firstNumber = undefined;
    operation.secondNumber = undefined;
    operation.operator = undefined;
}

function operate (operation) {
    let result = null;
    console.log(operation)
    switch(operation.operator) {
        case '+':
            result = add(operation.firstNumber, operation.secondNumber);
            break;
        case '-':
            result = subtract(operation.firstNumber, operation.secondNumber);
            break;
        case '×':
            result = multiply(operation.firstNumber, operation.secondNumber);
            break;
        case '÷':
            result = divide(operation.firstNumber, operation.secondNumber);
            break;
        default:
            result = 'Incorrect request, try again';
    } 
    return result;
}

function processNumber(operation, value) {
    if (operation.operator === '=') {
        calculatorDisplayText.innerHTML = value;
        operation.operator = undefined;
    } else if (currentNumberValue === '0') {
        calculatorDisplayText.innerHTML = value;
    } else {
        calculatorDisplayText.innerHTML += value;
    }
    currentNumberValue = calculatorDisplayText.innerHTML;
}

function processOperator(operation, operatorValue){
    currentNumberValue = calculatorDisplayText.innerHTML;

    switch(operatorValue) {
        case 'AC':
            erase(operation);
            calculatorDisplayText.innerHTML = '0';
            currentNumberValue = '0';
            break;
        case '=':
            if (operation.firstNumber === undefined || operation.operator === undefined){
                break;
            }
        default:
            if (operation.firstNumber === undefined){
                operation.firstNumber = parseFloat(currentNumberValue);    
            } else {
                operation.secondNumber = parseFloat(currentNumberValue);
                calculationResult = operate(operation);
                calculatorDisplayText.innerHTML = calculationResult;
                operation.firstNumber = calculationResult;
                operation.secondNumber = undefined;
    
                if (operatorValue === '=') {
                    erase(operation);
                }
            }
            operation.operator = operatorValue;
            currentNumberValue = '0'; 
    }
    console.log(operation)
}

function processButtonInput(event){
    let pressedButton = event.target;

    if (pressedButton.classList.contains("number")) {
        processNumber(operation, pressedButton.innerHTML);
    } else if (pressedButton.classList.contains("operator")) {
        processOperator(operation, pressedButton.innerHTML);
    } else if (pressedButton.classList.contains("sign")) {
        calculatorDisplayText.innerHTML *= -1;
    }
}

// function removeTransition(e) {
//     console.log("i am remove transition");
//     if (e.propertyName !== 'transform') return;
//     e.target.classList.remove('playing');
//     console.log("i actually ran");
// }

// function clickButton(e) {
//     // const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
//     const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
//     console.log(e);
//     console.log(key);

//     if (!key) return;
//     key.classList.add('clickedButton');
//     // audio.currentTime = 0;
//     // audio.play();
// }

const calculatorDisplayText = document.querySelector('#calculatorDisplayText');
let currentNumberValue = calculatorDisplayText.innerHTML;

var operation = {
    firstNumber: undefined,
    secondNumber: undefined,
    operator: undefined  
};

const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach(button => button.addEventListener('click', processButtonInput));
// calculatorButtons.forEach(button => button.addEventListener('transitionend', removeTransition));
// window.addEventListener('keydown', clickButton);
