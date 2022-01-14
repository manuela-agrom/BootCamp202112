class Calculator {
    #accumulated;
    #operator;
    #operationHistory;
    #currentNumber;
    constructor(funcOperation, funcCurrentNumber) {
        if (funcOperation && typeof(funcOperation) !== 'function') {
            throw new Error('To print the entire operation it is necessary to pass its function.');
        }
        if (funcCurrentNumber && typeof(funcCurrentNumber) !== 'function') {
            throw new Error('To print the current number it is necessary to pass its function.');
        }
        this.#accumulated = 0;
        this.#operator = '+';
        this.#operationHistory = '';
        this.#currentNumber = '0';
        this.operationPrinter = funcOperation;
        this.currentNumberPrinter = funcCurrentNumber;
    }
    initialize() {
        this.#accumulated = 0;
        this.#operator = '+';
        this.#operationHistory = '';
        this.#currentNumber = '0';
    }
    clearOperation() {
        this.initialize();
        this.printOperation();
        this.printCurrentNumber();
    }
    introduceNumber(number) {
        if (typeof(number) !=='string') {
            number = number.toString();
        }
        if (!this.checkIfNumber(number)) {
            console.error('To calculate it is necessary to introduce numbers from 0 to 9.');
            return;
        }
        if (this.#currentNumber === '0') {
            this.#currentNumber = '';
        }
        this.#currentNumber += number;
        this.printCurrentNumber();
        this.#operationHistory += number;
        this.printOperation();
    }
    introduceOperator(operator) {
        if (!/^(\+|\-|\*|\/|\=)$/.test(operator)) {
            console.error('To calculate it is necessary to use operators like "+","-", "*", "/" or equal sign "="');
            return;
        }
        if (!this.#currentNumber) {
            return;
        }
        this.operate();
        this.#operationHistory += operator;
        this.printOperation();
        if (operator === '=') {
            this.#currentNumber = this.#accumulated.toString();
            this.printCurrentNumber();
            this.#operationHistory = this.#accumulated.toString();
            this.#accumulated = 0;
            this.#operator = '+';
        } else {
            this.#currentNumber = '0';
            this.printCurrentNumber();
            this.#operator = operator;
        }
    }
    operate() {
        const currentNumber = parseFloat(this.#currentNumber);
        console.log('operate with: ', this.#accumulated, currentNumber);
        switch (this.#operator) {
            case '+':
                this.#accumulated = this.add(this.#accumulated,currentNumber);
                break;
            case '-':
                this.#accumulated = this.subtract(this.#accumulated,currentNumber);
                break;
            case '*':
                this.#accumulated = this.multiply(this.#accumulated,currentNumber);
                break;
            case '/':
                this.#accumulated = this.divide(this.#accumulated,currentNumber);
                break;
            default:
                break;
        }
    }
    add(number1, number2) {
        return number1 + number2;
    }
    subtract(number1, number2) {
        return number1-number2;
    }
    multiply(number1, number2) {
        return number1 * number2;
    }
    divide(number1, number2) {
        return number1/number2;
    }
    introduceCommaSign() {
        if (this.#currentNumber.includes('.')) {
            console.warn('Comma sign is already present.');
            return;
        }
        if (!this.#currentNumber) {
            this.#currentNumber = '0.';
        } else if (!this.#currentNumber.includes('.')) {
            this.#currentNumber += '.'
        }
        this.#operationHistory += this.#currentNumber;
        this.printCurrentNumber();
    }
    /* TODO:
    clearNChar(n) {
        this.#currentNumber = this.#currentNumber.slice(0, this.#currentNumber.length-n);
    }
    clearNumber() {
        this.clearNChar(this.#currentNumber.length);
    }
    changeSign() {
        this.#currentNumber = (-this.#currentNumber).toString();
        this.#operationHistory = this.#currentNumber;
        this.printCurrentNumber();
    }
    */
    printOperation() {
        if (typeof(this.operationPrinter) !== 'function') {
            return;
        }
        this.operationPrinter(this.#operationHistory);
    }
    printCurrentNumber() {
        if (typeof(this.currentNumberPrinter) !== 'function') {
            return;
        }
        this.currentNumberPrinter(this.#currentNumber);
    }
    checkIfNumber(key) {
        if (!/^\d$/.test(key)) {
            return false;
        }
        return true;
    }
    printVars() {
        console.log('this.#operationHistory: ' + this.#operationHistory);
        console.log('this.#currentNumber: ' + this.#currentNumber);
        console.log('this.#accumulated: ' + this.#accumulated);
        console.log('this.#operator: ' + this.#operator);
    }
}