// 6. Definir una función que determine si la cadena de texto que se le pasa como parámetro es un palíndromo, es decir, si se lee de 
// la misma forma desde la izquierda y desde la derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".

function isPalindrome(sentence) {
    processedSentence = sentence.split(" ").join("").toLowerCase();
    console.log(processedSentence)
    for (char in processedSentence) {
        // console.log(char);
        // console.log(processedSentence[char]);
        // console.log(processedSentence[processedSentence.length - 1 - char]);
        if (processedSentence[char] !== processedSentence[processedSentence.length - 1 - char]) {
            return false;
        }
    }
    return true;
}

isPalindrome('somos');
isPalindrome('La ruta nos aporto otro paso natural');