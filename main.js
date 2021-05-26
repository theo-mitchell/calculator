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
	return number1 / number2;
}

function erase (operation){
    operation.firstNumber = undefined;
    operation.secondNumber = undefined;
    operation.operator = undefined;
}

function operate (operation) {
    let result = null;
    switch(operation.operator) {
        case '+':
            result = add(operation.firstNumber, operation.secondNumber);
            break;
        case '-':
            result = subtract(operation.firstNumber, operation.secondNumber);
            break;
        case '*':
            result = multiply(operation.firstNumber, operation.secondNumber);
            break;
        case '/':
            result = divide(operation.firstNumber, operation.secondNumber);
            break;
        default:
            result = 'Incorrect request, try again';
    } 
    // console.log("this is result!!");
    // console.log(result);
    return result;
}

function processNumber(value) {
    if (value === '+/-') {
        calculatorDisplayText.innerHTML *= -1;
    } else if (currentNumberValue === '0') {
        calculatorDisplayText.innerHTML = value;
    } else {
        calculatorDisplayText.innerHTML += value;
    }
    currentNumberValue = calculatorDisplayText.innerHTML;
}

function processOperator(operation, operatorValue){
    if (operatorValue === 'AC') {
        erase(operation);
        calculatorDisplayText.innerHTML = '0';
    } else if (operation.firstNumber === undefined){
        operation.firstNumber = parseInt(currentNumberValue);
        operation.operator = operatorValue;        
    } else {
        operation.secondNumber = parseInt(currentNumberValue);
        calculationResult = operate(operation);
        calculatorDisplayText.innerHTML = calculationResult;
        operation.firstNumber = calculationResult;
        operation.secondNumber = undefined;
    }
    currentNumberValue = '0';
}

function processButtonInput(event){
    let pressedButton = event.target;

    if (pressedButton.classList.contains("number")) {
        processNumber(pressedButton.innerHTML);
    } else if (pressedButton.classList.contains("operator")) {
        processOperator(operation, pressedButton.innerHTML);
    }
}

const calculatorDisplayText = document.querySelector('#calculatorDisplayText');
let currentNumberValue = calculatorDisplayText.innerHTML;

var operation = {
    firstNumber: undefined,
    secondNumber: undefined,
    operator: undefined  
};

const numberButtons = document.querySelectorAll('.button');
numberButtons.forEach(button => button.addEventListener('click', processButtonInput));