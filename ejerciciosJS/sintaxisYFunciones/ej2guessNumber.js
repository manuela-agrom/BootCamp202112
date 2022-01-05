// 2. Adivina el Número, generar un número entre el 0 y el 100, introducir un número e informar si es igual, mayor o menor. Hay un 
// máximo de 10 intentos para encontrar el número que sea igual.

import getRandomNumber from './ej1randomNumber.js'

export function guessNumber() {
    let numberToFind = getRandomNumber(1, 100);
    let introducedNumber;
    let timesTried = 0;
    let found = false;
    do {
        timesTried++;
        introducedNumber = +prompt(`Introduce tu número (${timesTried} de 10 intentos) [${numberToFind}]:`); //"prompt()"" devuelve un string; "+prompt()" devuelve un number
        if (numberToFind === introducedNumber) {
            found = true;
            break;
        } else if (numberToFind > introducedNumber) {
            alert('Mi número es mayor.');
        } else {
            alert('Mi número es menor.');
        }
    } while (timesTried < 10);
    if (found) {
        alert('Bieeen!!! Acertaste.');
    } else {
        alert('Ups! Se acabaron los intentos, el número era el ' + numberToFind);
    }
    return found;
}

/* PREVIOUS VERSION:
let times = 0;

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

let randomNumber = getRandomNumber();
// console.log(randomNumber);

function isCorrectNumber(number) {
    times++;
    // console.log(times);
    if (times<=10) {
        if (number === randomNumber)
            return "Numero encontrado"
        if (number > randomNumber)
            return "Numero mayor al buscado"
        if (number < randomNumber)
            return "Numero menor al buscado"
    }
    return "No se puede realizar más intentos. El número buscado era " + randomNumber
}

isCorrectNumber(30);
*/