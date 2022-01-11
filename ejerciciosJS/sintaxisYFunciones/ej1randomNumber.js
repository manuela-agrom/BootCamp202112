// 1. Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.

export function getRandomNumber(min_value, max_value) {
    if (!min_value || isNaN(parseInt(min_value.toString()))) throw new Error('Falta el valor mínimo');
    if (!max_value || isNaN(parseInt(max_value.toString()))) throw new Error('Falta el valor máximo');
    if (min_value >= max_value) throw new Error('El valor final debe ser mayor que el valor inicial');;

    return Math.floor(Math.random() * (max_value - min_value)) + min_value;
}

// let randomNumber = getRandomNumber(3,11);
// console.log(randomNumber);