class Calculator {
    #accumulated;
    #operator;
    #operationHistory;
    #currentNumber;
    #lastAccumulated;
    #lastOperator;
    constructor(funcOperation, funcCurrentNumber) {
        if (funcOperation === undefined || !funcCurrentNumber === undefined) {
            throw new Error('To use the calculator it is necessary to pass the two printer functions for the entire operation and the current number, respectively.')
        }
        if (typeof(funcOperation) !== 'function') {
            throw new Error('To print the entire operation it is necessary to pass its function.');
        }
        if (typeof(funcCurrentNumber) !== 'function') {
            throw new Error('To print the current number it is necessary to pass its function.');
        }
        this.operationPrinter = funcOperation;
        this.currentNumberPrinter = funcCurrentNumber;
        this.clearOperation();

    }
    initialize() {
        this.#accumulated = 0;
        this.#lastAccumulated;
        this.#operator = '+';
        this.#lastOperator;
        this.#operationHistory = '';
        this.#currentNumber = '0';
    }
    clearOperation() {
        this.initialize();
        this.printOperation();
        this.printCurrentNumber();
    }
    introduceNumber(number) {
        if(number === undefined) {
            throw new Error('Number argument is missing.')
        }
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
        if (this.#operationHistory === '0') {
            this.#operationHistory = '';
        }
        this.#operationHistory += number;
        this.printOperation();
    }
    introduceOperator(operator) {
        if(operator === undefined) {
            throw new Error('Operator argument is missing.')
        }
        if (!this.checkIfOperator(operator)) {
            console.error('To calculate it is necessary to use operators like "+","-", "*", "/" or equal sign "="');
            return;
        }
        if (operator != '=') {
            if (this.#currentNumber === '0') {
                if (this.#operationHistory !== '') {
                    this.clearOne();
                    this.introduceOperator(operator);
                }
                return;
            }
        }
        this.operate();
        this.#operationHistory += operator;
        this.printOperation();
        if (operator === '=') {
            this.#currentNumber = this.#accumulated.toString();
            this.#operationHistory = this.#accumulated.toString();
            this.#accumulated = 0;
            this.#operator = '+';
        } else {
            this.#currentNumber = '0';
            this.#operator = operator;
        }
        this.printCurrentNumber();
    }
    operate() {
        const currentNumber = parseFloat(this.#currentNumber);
        this.#lastAccumulated = this.#accumulated;
        this.#lastOperator = this.#operator;
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
        this.#accumulated = parseFloat(this.#accumulated.toPrecision(15));
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
    clearOne() {
        if (this.#currentNumber === '0') {
            if (this.checkIfOperator(this.#operationHistory.slice(-1))) {
                this.#currentNumber = this.getLastCompleteTypedNumber();
                this.#accumulated = this.#lastAccumulated;
                this.#operator = this.#lastOperator;
            }
        } else {
            if (this.#currentNumber.length == 1) {
                this.#currentNumber = '0';
            } else {
                this.#currentNumber = this.#currentNumber.slice(0, -1);
            }
        }
        this.#operationHistory = this.#operationHistory.slice(0, -1);
        this.printOperation();
        this.printCurrentNumber();
    }
    introduceCommaSign() {
        if (this.#currentNumber.includes('.')) {
            console.warn('Comma sign is already present.');
            return;
        }
        if (this.#operationHistory === '' || this.checkIfOperator(this.#operationHistory.slice(-1))) {
            this.#operationHistory += '0.';
        } else {
            this.#operationHistory += '.';
        }
        this.#currentNumber += '.';
        this.printCurrentNumber();
        this.printOperation();
    }
    /* TODO:
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
        if (key.length != 1 || !/^\d$/.test(key)) {
            return false;
        }
        return true;
    }
    checkIfOperator(key) {
        if (!/^(\+|\-|\*|\/|\=)$/.test(key)) {
            return false;
        }
        return true;
    }
    getLastCompleteTypedNumber() {
        let lastNumber = '';
        for(let i = this.#operationHistory.length-2; i>=0; i--) {
            if (this.checkIfOperator(this.#operationHistory[i]) && this.#operationHistory[i] !== '.') {
                break;
            }
            lastNumber = this.#operationHistory[i] + lastNumber;
        }
        return lastNumber;
    }
}