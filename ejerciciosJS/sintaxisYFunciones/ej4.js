// 4. Crear una función que devuelva un determinado número de números primos.

function getEvenNumbers(totalEvenNumbers) {
    let evenNumbers = [];
    let number = 1;

    while (evenNumbers.length < totalEvenNumbers) {
        evenNumbers.push((2*number++)-1);
    }
    return evenNumbers;
}

getEvenNumbers(9)