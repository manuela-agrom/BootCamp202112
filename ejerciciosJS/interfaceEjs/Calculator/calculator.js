export class Calculator {
    #accumulated;
    #auxSecondNumber;
    #waitingSecondNumber;
    #operation;
    constructor() {
        this.#accumulated = 0;
        this.#auxSecondNumber = 0;
        this.#waitingSecondNumber = false;
        this.#operation;
    }
    checkKey(key) {
        let keyIsNumber = this.isNumber(key);
        if (keyIsNumber) {
            if (!this.#waitingSecondNumber) {
                this.#accumulated = parseFloat(this.#accumulated.toString().concat(key));
            } else {
                this.#waitingSecondNumber = false;
                this.#auxSecondNumber = parseFloat(this.#auxSecondNumber.toString().concat(key));
                return this.#accumulated.toString().concat(' ', this.#operation).concat(' ', this.#auxSecondNumber)
            }
        } else {
            if (!this.#waitingSecondNumber) {
                this.#waitingSecondNumber = true;
                this.#operation = key;
                console.log(this.#operation);
                return this.#accumulated.toString().concat(' ', this.#operation)
            } else {
                this.#waitingSecondNumber = false;
                switch (this.#operation) {
                    case '+':
                        this.#accumulated = this.add(this.#accumulated,this.#auxSecondNumber);
                        break;
                    case '-':
                        this.#accumulated = this.subtract(this.#accumulated,this.#auxSecondNumber);
                        break;
                    case '/':
                        this.#accumulated = this.divide(this.#accumulated,this.#auxSecondNumber);
                        break;
                    case '*':
                        this.#accumulated = this.multiply(this.#accumulated,this.#auxSecondNumber);
                        break;
                    default:
                        
                        break;
                }
                console.log(this.#accumulated);

            }
        }
        return this.#accumulated;
    }
    isNumber(key) {
        // if (typeof(key) === 'number') {
        //     return true;
        // }
        // return false;
        let isNumber = isNaN(parseInt(key));
        return !isNumber;
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

}