// 3. Crear una función que devuelva un array con el numero de elementos indicado, inicializados al valor suministrado.

function getArrayWithFiniteElements(...args) {
    console.log(args.length);
    return args;
}

getArrayWithFiniteElements(1, 3, 9, 2, 5)