// Lines to add in Jasmine's SpecRunner.html
// <script src="../../ejerciciosJS/interfaceEjs/Calculator/calculator.js"></script>
// <script src="../../spec/calculator.spec.js"></script>

describe(`Tests Calculator`, () => {
    let calc = null;
    describe('Exception for lack of arguments', () => {
        it('One (1) argument is missing', ()=> {
            expect(() => new Calculator(new Function())).toThrow();
        });
        it('All (2) arguments are missing', ()=> {
            expect(() => new Calculator()).toThrow();
        });
    });
    describe('Exception for wrong arguments', () => {
        [
            { fnOperation: '', fnCurrentNumber: (new Function()), msg: 'To print the entire operation it is necessary to pass its function.' },
            { fnOperation: true, fnCurrentNumber: (new Function()), msg: 'To print the entire operation it is necessary to pass its function.' },
            { fnOperation: (new Function()), fnCurrentNumber: 1, msg: 'To print the current number it is necessary to pass its function.' },
            { fnOperation: (new Function()), fnCurrentNumber: (new Number()), msg: 'To print the current number it is necessary to pass its function.' },
        ].forEach(caseParams => {
            it(`(${typeof caseParams.fnOperation}, ${typeof caseParams.fnCurrentNumber}) -> ${caseParams.msg}`, () => {
                expect(() => new Calculator(caseParams.fnOperation, caseParams.fnCurrentNumber)).toThrowError(Error, caseParams.msg);
            });
        });
    });
    describe('Key inputs', () => {
        beforeAll(() => {
            calc = new Calculator(new Function(), new Function());
        });
        describe('Numbers', () => {
            describe('OK', () => {
                [0, 1, 9, '0', '6', '8'].forEach(item => {
                    it(`${typeof item} ${item}`, () => {
                        spyOn(window.console, 'error');
                        calc.introduceNumber(item);
                        expect(console.error).not.toHaveBeenCalled();
                    });
                });
            });
            describe('KO', () => {
                it('Missing number argument', () => {
                    expect(() => calc.introduceNumber()).toThrow();
                });
                describe('Wrong Argument', () => {
                    beforeEach(() => {
                        spyOn(window.console, 'error');
                    });
                    describe('One digit non-parsable to number as argument', () => {
                        ['a', '+', ''].forEach(item => {
                        it(`${typeof item} ${item}`, () => {
                                calc.introduceNumber(item);
                                expect(console.error).toHaveBeenCalled();
                            });
                        });
                    });
                    describe('More than one digit for the argument', () => {
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
        describe('Operators', () => {
            describe('OK', () => {
                ['+', '-', '*', '/', '='].forEach(item => {
                    it(`${typeof item} ${item}`, () => {
                        spyOn(window.console, 'error');
                        calc.introduceOperator(item);
                        expect(console.error).not.toHaveBeenCalled();
                        // expect(console.error).toHaveBeenCalledTimes(0);
                    });
                });
            });
            describe('KO', () => {
                it('Missing number argument', () => {
                    expect(() => calc.introduceOperator()).toThrow();
                });
                describe('Wrong argument', () => {
                    [0, 8, '0', '8', '', '%', '^', '!', '#', '$', '++', '--', '**', '//'].forEach(item => {
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
    describe('Actions concatenated', () => {
        describe('OK', () => {
            it('Number with more than one digit', () => {
                let rsltOperation = null;
                let rsltCurrentNumber = null;
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
        });
    });
});