// Lines to add in Jasmine's SpecRunner.html
// <script src="../../ejerciciosJS/interfaceEjs/Calculator/calculator.js"></script>
// <script src="../../spec/calculator.spec.js"></script>

describe(`Tests Calculator`, () => {
    let calc = null;
    let rsltOperation = null;
    let rsltCurrentNumber = null;
    describe('- Exception for lack of arguments:', () => {
        it('One (1) argument is missing', ()=> {
            expect(() => new Calculator(new Function())).toThrow();
        });
        it('All (2) arguments are missing', ()=> {
            expect(() => new Calculator()).toThrow();
        });
    });
    describe('- Exception for wrong arguments:', () => {
        [
            { fnOperation: '', fnCurrentNumber: (new Function()), msg: 'To print the entire operation it is necessary to pass its function.' },
            { fnOperation: true, fnCurrentNumber: (new Function()), msg: 'To print the entire operation it is necessary to pass its function.' },
            { fnOperation: (new Function()), fnCurrentNumber: 1, msg: 'To print the current number it is necessary to pass its function.' },
            { fnOperation: (new Function()), fnCurrentNumber: (new Number()), msg: 'To print the current number it is necessary to pass its function.' },
        ].forEach(item => {
            it(`(${typeof item.fnOperation}, ${typeof item.fnCurrentNumber}) -> ${item.msg}`, () => {
                expect(() => new Calculator(item.fnOperation, item.fnCurrentNumber)).toThrowError(Error, item.msg);
            });
        });
    });
    describe('- Key inputs:', () => {
        beforeAll(() => {
            calc = new Calculator(new Function(), new Function());
        });
        describe('- Numbers:', () => {
            describe('- OK:', () => {
                [0, 1, 9, '0', '6', '8'].forEach(item => {
                    it(`${typeof item} ${item}`, () => {
                        spyOn(window.console, 'error');
                        calc.introduceNumber(item);
                        expect(console.error).not.toHaveBeenCalled();
                    });
                });
            });
            describe('- KO:', () => {
                it('Missing number argument', () => {
                    expect(() => calc.introduceNumber()).toThrow();
                });
                describe('- Wrong Argument:', () => {
                    beforeEach(() => {
                        spyOn(window.console, 'error');
                    });
                    describe('- One digit non-parsable to number as argument:', () => {
                        ['a', '+', ''].forEach(item => {
                        it(`${typeof item} ${item}`, () => {
                                calc.introduceNumber(item);
                                expect(console.error).toHaveBeenCalled();
                            });
                        });
                    });
                    describe('- More than one digit for the argument:', () => {
                    [10, -1, '10', '-2', '+9', '01', '00'].forEach(item => {
                            it(`${typeof item} ${item}`, () => {
                                calc.introduceNumber(item);
                                expect(console.error).toHaveBeenCalledTimes(1);
                            });
                        });
                    });
                });
            });
        });
        describe('- Operators:', () => {
            describe('- OK:', () => {
                ['+', '-', '*', '/', '='].forEach(item => {
                    it(`${typeof item} ${item}`, () => {
                        spyOn(window.console, 'error');
                        calc.introduceOperator(item);
                        expect(console.error).not.toHaveBeenCalled();
                        // expect(console.error).toHaveBeenCalledTimes(0);
                    });
                });
            });
            describe('- KO:', () => {
                it('Missing number argument', () => {
                    expect(() => calc.introduceOperator()).toThrow();
                });
                describe('- Wrong argument:', () => {
                    [0, 8, '0', '8', ',', '', '%', '^', '!', '#', '$', '++', '--', '**', '//'].forEach(item => {
                        it(`${typeof item} ${item}`, () => {
                            spyOn(window.console, 'error');
                            calc.introduceOperator(item);
                            expect(console.error).toHaveBeenCalled();
                        });
                    })
                });
            });
        })
    });
    describe('- Nested actions:', () => {
        it('Number with more than one digit', () => {
            calc = new Calculator((value=>{rsltOperation = value}), (value=>{rsltCurrentNumber = value}));
            calc.introduceNumber('1');
            expect(rsltCurrentNumber).toBe('1');
            expect(rsltOperation).toBe('1');
            calc.introduceNumber('2');
            expect(rsltCurrentNumber).toBe('12');
            expect(rsltOperation).toBe('12');
            calc.introduceNumber('3');
            expect(rsltCurrentNumber).toBe('123');
            expect(rsltOperation).toBe('123');
            calc.introduceNumber('4');
            expect(rsltCurrentNumber).toBe('1234');
            expect(rsltOperation).toBe('1234');
            calc.introduceNumber('5');
            expect(rsltCurrentNumber).toBe('12345');
            expect(rsltOperation).toBe('12345');
        });
        describe('- Simple operations:', () => {
            describe('- Integer numbers', () => {
                beforeEach(() => {
                    calc = new Calculator((value=>{rsltOperation = value}), (value=>{rsltCurrentNumber = value}));
                });
                [
                    { number1: '1', operator: '+', number2: '1', rsltCurrentNumber: '2', rsltOperation: '1+1=' },
                    { number1: '1', operator: '-', number2: '1', rsltCurrentNumber: '0', rsltOperation: '1-1=' },
                    { number1: '1', operator: '*', number2: '1', rsltCurrentNumber: '1', rsltOperation: '1*1=' },
                    { number1: '4', operator: '/', number2: '2', rsltCurrentNumber: '2', rsltOperation: '4/2=' },
                    { number1: '4', operator: '/', number2: '0', rsltCurrentNumber: 'Infinity', rsltOperation: '4/0=' },
                    // TODO: { number1: '0', operator: '/', number2: '0', rsltCurrentNumber: 'NaN', rsltOperation: '0/0=' },
                ].forEach(item => {
                    it(`${item.number1} ${item.operator} ${item.number2} => ${item.rsltCurrentNumber}`, () => {
                        calc.introduceNumber(item.number1);
                        calc.introduceOperator(item.operator);
                        calc.introduceNumber(item.number2);
                        calc.introduceOperator('=');
                        console.log('rsltCurrentNumber: ', rsltCurrentNumber);
                        expect(rsltCurrentNumber).toBeDefined();
                        expect(rsltCurrentNumber).toBe(item.rsltCurrentNumber);
                        expect(rsltOperation).toBe(item.rsltOperation);
                    });
                });
            });
            describe('- Decimal numbers', () => {
                beforeEach(() => {
                    calc = new Calculator((value=>{rsltOperation = value}), (value=>{rsltCurrentNumber = value}));
                });
                describe('- OK:', () => {
                    [
                        { number1: '0.1', operator: '+', number2: '0.2', rsltCurrentNumber: '0.3', rsltOperation: '0.1+0.2=' },
                        { number1: '0.1', operator: '-', number2: '0.2', rsltCurrentNumber: '-0.1', rsltOperation: '0.1-0.2=' },
                        { number1: '0.1', operator: '*', number2: '0.1', rsltCurrentNumber: '0.01', rsltOperation: '0.1*0.1=' },
                        { number1: '0.1', operator: '/', number2: '0.2', rsltCurrentNumber: '0.5', rsltOperation: '0.1/0.2=' },
                        { number1: '0.1', operator: '/', number2: '0.0', rsltCurrentNumber: 'Infinity', rsltOperation: '0.1/0.0=' },
                        { number1: '0.0', operator: '/', number2: '0.0', rsltCurrentNumber: 'NaN', rsltOperation: '0.0/0.0=' },
                    ].forEach(item => {
                        it(`${item.number1} ${item.operator} ${item.number2} => ${item.rsltCurrentNumber}`, () => {
                            calc.introduceNumber(item.number1[0]);
                            calc.introduceCommaSign();
                            calc.introduceNumber(item.number1[2]);
                            calc.introduceOperator(item.operator);
                            calc.introduceNumber(item.number2[0]);
                            calc.introduceCommaSign();
                            calc.introduceNumber(item.number2[2]);
                            calc.introduceOperator('=');
                            console.log('rsltCurrentNumber: ', rsltCurrentNumber);
                            expect(rsltCurrentNumber).toBe(item.rsltCurrentNumber);
                            expect(rsltOperation).toBe(item.rsltOperation);
                        });
                    });
                });
                describe('- KO:', () => {
                    it('Use comma sign without typing 0 before: INPUTS = [ "Comma(,)", 2, "=" ] ==> OUTPUTS: [ "0.2=", 0.2 ]', () => {
                        calc.introduceCommaSign();
                        calc.introduceNumber('2');
                        calc.introduceOperator('=');
                        expect(rsltCurrentNumber).toBe('0.2');
                        expect(rsltOperation).toBe('0.2=');
                    });
                });
            });
        });
        describe('- Nested  operations', () => {
            it('6 + 4 * 5 / 25 - 9 = -7', () => {
                calc = new Calculator((value=>{rsltOperation = value}), (value=>{rsltCurrentNumber = value}));
                calc.introduceNumber('6');
                calc.introduceOperator('+');
                calc.introduceNumber('4');
                expect(rsltCurrentNumber).toBe('4');
                expect(rsltOperation).toBe('6+4');
                calc.introduceOperator('*');
                calc.introduceNumber('5');
                expect(rsltCurrentNumber).toBe('5');
                expect(rsltOperation).toBe('6+4*5');
                calc.introduceOperator('/');
                calc.introduceNumber('2');
                calc.introduceNumber('5');
                expect(rsltCurrentNumber).toBe('25');
                expect(rsltOperation).toBe('6+4*5/25');
                calc.introduceOperator('-');
                calc.introduceNumber('9');
                expect(rsltCurrentNumber).toBe('9');
                expect(rsltOperation).toBe('6+4*5/25-9');
                calc.introduceOperator('=');
                expect(rsltCurrentNumber).toBe('-7');
                expect(rsltOperation).toBe('6+4*5/25-9=');
            });
            describe('- Erase digits', () => {
                beforeEach(() => {
                    calc = new Calculator((value=>{rsltOperation = value}), (value=>{rsltCurrentNumber = value}));
                });
                it('Erase 1 number and continue: INPUTS = [ 1, 2, 3,"Erase", "Subtract(-)", 2, "=" ] ==> OUTPUTS: [ "12-2=", 10 ]', () => {
                    calc.introduceNumber('1');
                    calc.introduceNumber('2');
                    calc.introduceNumber('3');
                    calc.clearOne();
                    expect(rsltCurrentNumber).toBe('12');
                    expect(rsltOperation).toBe('12');
                    calc.introduceOperator('-');
                    calc.introduceNumber('2');
                    calc.introduceOperator('=');
                    expect(rsltCurrentNumber).toBe('10');
                    expect(rsltOperation).toBe('12-2=');
                });
                it('Erase 1 operator once and continue: INPUTS = [ 1, 2, "Add(+)","Erase", "Subtract(-)", 2, "=" ] ==> OUTPUTS: [ "12-2=", 10 ]', () => {
                    calc.introduceNumber('1');
                    calc.introduceNumber('2');
                    calc.introduceOperator('+');
                    calc.clearOne();
                    expect(rsltCurrentNumber).toBe('12');
                    expect(rsltOperation).toBe('12');
                    calc.introduceOperator('-');
                    calc.introduceNumber('2');
                    calc.introduceOperator('=');
                    expect(rsltCurrentNumber).toBe('10');
                    expect(rsltOperation).toBe('12-2=');
                });
                it('Change the operator twice and continue: INPUTS = [ 1, 2, "Add(+)", "Subtract(-)", "Multiply(*), 2, "=" ] ==> OUTPUTS: [ "12*2=", 24 ]', () => {
                    calc.introduceNumber('1');
                    calc.introduceNumber('2');
                    calc.introduceOperator('+');
                    calc.introduceOperator('-');
                    calc.introduceOperator('*');
                    calc.introduceNumber('2');
                    calc.introduceOperator('=');
                    expect(rsltCurrentNumber).toBe('24');
                    expect(rsltOperation).toBe('12*2=');

                });
                it('Erase the result of the last operation and continue: INPUTS = [ 1, "Add(+)", 2, "=", "Erase",  2, "Subtract(-)", 1, "=" ] ==> OUTPUTS: [ "2-1=", 1 ]', () => {
                    calc.introduceNumber('1');
                    calc.introduceOperator('+');
                    calc.introduceNumber('2');
                    calc.introduceOperator('=');
                    expect(rsltCurrentNumber).toBe('3');
                    expect(rsltOperation).toBe('1+2=');
                    calc.clearOne();
                    expect(rsltCurrentNumber).toBe('0');
                    expect(rsltOperation).toBe('');
                    calc.introduceNumber('2');
                    calc.introduceOperator('-');
                    calc.introduceNumber('1');
                    calc.introduceOperator('=');
                    expect(rsltCurrentNumber).toBe('1');
                    expect(rsltOperation).toBe('2-1=');
                });
                it('Erase comma sign and continue: INPUTS = [ 2, "Comma(,)", "Erase", 1, "Subtract(-)", 2, 1, "Comma(,)", 5, "=" ] ==> OUTPUTS: [ "21-21.5=", -0.5 ]', () => {
                    calc.introduceNumber('2');
                    calc.introduceCommaSign();
                    calc.clearOne();
                    calc.introduceNumber('1');
                    expect(rsltCurrentNumber).toBe('21');
                    expect(rsltOperation).toBe('21');
                    calc.introduceOperator('-');
                    calc.introduceNumber('2');
                    calc.introduceNumber('1');
                    calc.introduceCommaSign();
                    calc.introduceNumber('5');
                    calc.introduceOperator('=');
                    expect(rsltCurrentNumber).toBe('-0.5');
                    expect(rsltOperation).toBe('21-21.5=');
                });
            });
        });
    });
});