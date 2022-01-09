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
        this.#currentNumber = '';
        // this.operationScreen = '';
        // this.currentNumberScreen = '0';
        this.operationPrinter = funcOperation;
        this.currentNumberPrinter = funcCurrentNumber;
    }
    initialize() {
        this.#accumulated = 0;
        this.#operator = '+';
        this.#operationHistory = '';
        this.#currentNumber = '';
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
        // if (this.#accumulated === '0') {
        //     this.#accumulated = number;
        // } else {
        //     this.#accumulated += number;
        this.#currentNumber += number;
        this.printCurrentNumber();
        this.#operationHistory += (number + ' ');
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
        // if (this.#accumulated !== '0') {
        //     this.operate();
        // }
        this.operate();
        if (operator === '=') {
            this.#operationHistory += ('= ' + this.#accumulated);
            this.printOperation();
            // console.log('operation: ', this.#operationHistory);
            this.#accumulated = 0;
            this.#operationHistory = '';
            this.#operator = '+';
            this.initialize();
        } else {
            this.#operationHistory += (operator + ' ');
            this.printOperation();
            this.#operator = operator;
            this.#currentNumber = '';
        }
        // this.printOperation();
        this.printCurrentNumber();
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
        // this.#accumulated = this.acc.toString();
        // this.#currentNumber = '';
        // console.log(this.#accumulated);
        // this.#operationsMade = this.#accumulated;
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
    printOperation() {
        // this.operationScreen = this.#operationHistory;
        if (typeof(this.operationPrinter) !== 'function') {
            return;
        }
        this.operationPrinter(this.#operationHistory);
    }
    printCurrentNumber() {
        // this.currentNumberScreen = this.#currentNumber;
        if (typeof(this.currentNumberPrinter) !== 'function') {
            return;
        }
        if (this.#currentNumber) {
            this.currentNumberPrinter(this.#currentNumber);
        } else {
            this.currentNumberPrinter('0');
        }
    }
    checkIfNumber(key) {
        if (!/^\d$/.test(key)) {
            return false;
        }
        return true;
    }
    printVars() {
        console.log('this.#operationHistory: ' + this.#operationHistory);
        console.log('this.#currentNumber: ' + this.#currentNumber); //current
        console.log('this.#accumulated: ' + this.#accumulated); //previous
        console.log('this.#operator: ' + this.#operator);
    }
}