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

function operate (requestedOperation) {
    let result = null;
    switch(requestedOperation.operator) {
        case '+':
            result = add(requestedOperation.firstNumber, requestedOperation.secondNumber);
            break;
        case '-':
            result = subtract(requestedOperation.firstNumber, requestedOperation.secondNumber);
            break;
        case '*':
            result = multiply(requestedOperation.firstNumber, requestedOperation.secondNumber);
            break;
        case '/':
            result = divide(requestedOperation.firstNumber, requestedOperation.secondNumber);
            break;
        default:
            result = 'Incorrect request, try again';
    } 

    return result;
}

var operation = {
    firstNumber: 2,
    secondNumber: 2,
    operator: '/'  
};

// console.log(operate(operation));