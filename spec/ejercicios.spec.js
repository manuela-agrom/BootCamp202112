import {getRandomNumber} from '../ejerciciosJS/sintaxisYFunciones/ej1randomNumber.js';
describe('Pruebas ejecicio 1 random Number', () => {
    let randomNumber;
    describe('Valores válidos', () => {
        [{minValue: 1, maxValue: 100}].forEach(element => {
            it(`Prueba que el primer argumento sea verdadero`, () => {
                randomNumber = new getRandomNumber(element.minValue, element.maxValue);
                expect(randomNumber).toBeTruthy();
            });
        });
    });
    describe('Valores inválidos', () => {
        [{minValue: 110, maxValue: 100}, {minValue: 0, maxValue: 1}].forEach(element => {
            it(`Prueba error si no se pasa el primer argumento con ${element.minValue} y ${element.maxValue}`, () => {
                expect(() => new getRandomNumber()).toThrow();
            });
            it(`Prueba error si no se pasa el segundo argumento con ${element.minValue} y ${element.maxValue}`, () => {
                expect(() => new getRandomNumber(element.minValue)).toThrow();
            });
            it(`Prueba que comprueba que ${element.minValue} es menor que ${element.maxValue}`, () => {
                expect(() => new getRandomNumber(element.minValue, element.maxValue)).toThrow();
            });
        });
    });
    
});
