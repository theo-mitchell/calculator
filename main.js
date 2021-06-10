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
    } else if (currentNumberValue === 'reset') {
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
            currentNumberValue = 'reset';
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
            currentNumberValue = 'reset'; 
    }
    console.log(operation)
}

function processButtonInput(pressedButton){
    
    if (pressedButton.classList.contains("number")) {
        processNumber(operation, pressedButton.innerHTML);
    } else if (pressedButton.classList.contains("operator")) {
        processOperator(operation, pressedButton.innerHTML);
    } else if (pressedButton.classList.contains("sign")) {
        calculatorDisplayText.innerHTML *= -1;
    }
}

function pressButton(event) {

    if (event.type === "keydown") {
        var key = document.querySelector(`button[data-key="${event.keyCode}"]`);
    } else {
        var key = event.target;
    }
    // console.log(key);

    if (!key) return;
    processButtonInput(key);
    // audio.currentTime = 0;
    // audio.play();
}

const calculatorDisplayText = document.querySelector('#calculatorDisplay');
let currentNumberValue = 'reset';

var operation = {
    firstNumber: undefined,
    secondNumber: undefined,
    operator: undefined  
};

const calculatorButtons = document.querySelectorAll('.button');
calculatorButtons.forEach(button => button.addEventListener('click', pressButton));
// calculatorButtons.forEach(button => button.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', pressButton);
