// 5. Crear una función que valide un NIF

function checkNif(nif) {
    let re = /((([X-Z])|([LM])){1}([-]?)((\d){7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]))/;
    let correctNif = re.test(nif);
    if (correctNif) {
        return "NIF correcto";
    }
    return "NIF incorrecto";
}