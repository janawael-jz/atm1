function calculator(num1, num2, operation) {
    let result = operation(num1, num2);
    console.log(result);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

calculator(10, 5, add);
calculator(10, 5, subtract);
calculator(10, 5, multiply);