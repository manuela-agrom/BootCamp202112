import {getRandomNumber} from '../sintaxisYFunciones/ej1randomNumber.js'

export class GameClass {
    #maxTries;  //private with #
    #values;
    #numberToFind;
    constructor(maxTries, values) {
        this.#maxTries = maxTries;
        this.#values = values;
        this.initialize();
    }
    initialize() {
        this.#numberToFind = getRandomNumber(1, this.#values);
        this.timesTried = 0;
        this.found = false;
        this.message = 'Listo para jugar';
    };
    checkNumber(introducedNumber) {
        if (this.timesTried >= this.#maxTries)
            throw new Error("Excedido el número de intentos");
        if (!Number.isInteger(+introducedNumber))
            throw new Error("No es un número correcto");
        this.timesTried += 1;
        if (this.#numberToFind == introducedNumber) {
            this.found = true;
            this.message = 'Bieeen!!! Acertaste.';
            return this.message;
        }
        if (this.timesTried >= this.#maxTries) {
            this.message = 'Upsss! Se acabaron los intentos, el número era el ' + this.#numberToFind;
            return this.message;
        }
        if (this.#numberToFind > introducedNumber) {
            this.message = 'Mi número es mayor.';
            return this.message;
        }
        this.message = 'Mi número es menor.';
        return this.message;
    };

    getMaxTries() { return this.#maxTries; }

    get maxTries() { return this.#maxTries; };

    get trie() { return this.timesTried + 1; }
}