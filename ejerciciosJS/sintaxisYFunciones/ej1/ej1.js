// 1. Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.

function getRandomNumber(min_value, max_value) {
    return Math.random() * (max_value - min_value) + min_value;
}

let randomNumer = getRandomNumber(3,11);
console.log(randomNumer);