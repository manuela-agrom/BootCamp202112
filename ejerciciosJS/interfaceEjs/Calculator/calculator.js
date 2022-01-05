export class Calculator {
    #acumulate;
    constructor() {
        this.#acumulate = '0';
    }

    checkKey(key) {
        keyIsNumber = this.isNumber(key);
        if (keyIsNumber) {
            this.#acumulate = parseFloat(this.#acumulate.concat(key.toString()))
        } else if () {
            
        } else {
            return 0;
        }
    }

    isNumber(key) {
        // if (typeof(key) === 'number') {
        //     return true;
        // }
        // return false;
        return isNan(parseInt(key))? false : true;
    }
}