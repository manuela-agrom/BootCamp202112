// 2. Adivina el Número, generar un número entre el 0 y el 100, introducir un número e informar si es igual, mayor o menor. Hay un 
// máximo de 10 intentos para encontrar el número que sea igual.

let times = 0;

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

let randomNumber = getRandomNumber();
console.log(randomNumber);

function isCorrectNumber(number) {
    times++;
    console.log(times);
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

// isCorrectNumber(30);