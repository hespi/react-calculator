import Calculation from './Calculation';
import PlusOperation from './PlusOperation';
import MinusOperation from './MinusOperation';
import DivisionOperation from './DivisionOperation';
import NegateOperation from './NegateOperation';
import ProductOperation from './ProductOperation';
import EqualsOperation from './EqualsOperation';
import { Constants } from '../common/Constants';

let calculation;

describe("Calculation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    describe("clear tests", () => {
        test("Given empty calculation and number, When clearing it, Then number and text are cleared", () => {
            calculation.clear();
            expect(calculation.currentNumber).toEqual("0");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given non empty calculation and empty number, When clearing it, Then number and text are cleared", () => {
            calculation = new Calculation("5 +", "");
            calculation.clear();
            expect(calculation.currentNumber).toEqual("0");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given empty calculation and non empty number, When clearing it, Then number and text are cleared", () => {
            calculation = new Calculation("", "5.23");
            calculation.clear();
            expect(calculation.currentNumber).toEqual("0");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given non empty calculation and number, When clearing it, Then number and text are cleared", () => {
            calculation = new Calculation("3.14 +", "5.23");
            calculation.clear();
            expect(calculation.currentNumber).toEqual("0");    
            expect(calculation.formula).toEqual("0");    
        });
    });

    describe("addDigit tests", () => {
        test("Given empty calculation and number, When adding digit, Then text remains and number is added", () => {
            calculation.addDigit("5");
            expect(calculation.currentNumber).toEqual("5");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given non empty calculation and empty number, When adding some digits, Then text remains and numbers are added", () => {
            calculation = new Calculation("5 +", "");
            calculation.addDigit("5");
            expect(calculation.currentNumber).toEqual("5");    
            expect(calculation.formula).toEqual("5 +");    

            calculation.addDigit("6");
            expect(calculation.currentNumber).toEqual("56");    
            expect(calculation.formula).toEqual("5 +");    
        });

        test("Given empty number, When adding decimal separator, Then text remains and decimal separator is added", () => {
            debugger;
            calculation.addDigit(Constants.decimalSeparator);
            expect(calculation.currentNumber).toEqual("0" + Constants.decimalSeparator);    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given integer number, When adding decimal separator, Then text remains and decimal separator is added", () => {
            calculation.addDigit("5");
            calculation.addDigit(Constants.decimalSeparator);
            expect(calculation.currentNumber).toEqual("5" + Constants.decimalSeparator);    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given decimal number, When adding decimal separator, Then text remains and decimal separator is not added", () => {
            calculation.addDigit("5");
            calculation.addDigit(Constants.decimalSeparator);
            expect(calculation.currentNumber).toEqual("5" + Constants.decimalSeparator);    
            expect(calculation.formula).toEqual("0");    

            calculation.addDigit("5");
            calculation.addDigit(Constants.decimalSeparator);
            calculation.addDigit(Constants.decimalSeparator);
            expect(calculation.currentNumber).toEqual("5" + Constants.decimalSeparator + "5");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given non numeric character, When adding digit, Then error is thrown", () => {
            var testChars = "aA!\"·$%&/()=?¿'^*¨Ç-:;@";
            for(var ix = 0; ix < testChars.length; ix++) {
                expect(() => {
                    calculation.addDigit(testChars[ix]);
                }).toThrowError("Invalid digit");
            }
        });

        test("Given numbers with more than one digit, When adding digit, Then error is thrown", () => {
            expect(() => {
                calculation.addDigit("59");
            }).toThrowError("Invalid digit");
            
        });
    });

    describe("removeDigit tests", () => {
        test("Given empty calculation and number, When removing digit, Then text and number are the default (0)", () => {
            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("0");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given one digit integer number, When removing digit, Then number returns to default", () => {
            calculation = new Calculation("", "5")
            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("0");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given many digits integer number, When removing digit, Then digits are removed from the back", () => {
            calculation = new Calculation("", "123456")
            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("12345");    
            expect(calculation.formula).toEqual("0");    

            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("1234");    
            expect(calculation.formula).toEqual("0");    
        });

        test("Given float number, When removing digit, Then digits and decimal separator are removed from the back", () => {
            calculation = new Calculation("", "123.54")
            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("123.5");    
            expect(calculation.formula).toEqual("0");    

            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("123.");    
            expect(calculation.formula).toEqual("0");    

            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("123");    
            expect(calculation.formula).toEqual("0"); 
            
            calculation.removeDigit();
            expect(calculation.currentNumber).toEqual("12");    
            expect(calculation.formula).toEqual("0");    
        });
    });

    describe("addOperation tests", () => {
        test("Given null operation, When adding operation, Then error is thrown", () => {
            expect(() => {
                calculation.addOperation();
            }).toThrowError("Invalid operation");

            expect(() => {
                calculation.addOperation(null);
            }).toThrowError("Invalid operation");

            expect(() => {
                calculation.addOperation(undefined);
            }).toThrowError("Invalid operation");
        });

        test("Given empty calculation, When adding operation, Then zero is used as number", () => {
            calculation.addOperation(new PlusOperation());
            expect(calculation.formula).toEqual("0 +");
        });

        test("Given empty calculation, When adding many operations, Then zero is used as number and operation changes", () => {
            calculation.addOperation(new PlusOperation());
            expect(calculation.formula).toEqual("0 +");

            calculation.addOperation(new MinusOperation());
            expect(calculation.formula).toEqual("0 -");

            calculation.addOperation(new DivisionOperation());
            expect(calculation.formula).toEqual("0 /");

            calculation.addOperation(new NegateOperation());
            expect(calculation.formula).toEqual("-1*(0)");
        });

        test("Given no calculation and any number, When adding many operations, Then number remains and operation changes", () => {
            calculation = new Calculation("", "5.25")
            calculation.addOperation(new PlusOperation());
            expect(calculation.formula).toEqual("5.25 +");

            calculation.addOperation(new MinusOperation());
            expect(calculation.formula).toEqual("5.25 -");

            calculation.addOperation(new DivisionOperation());
            expect(calculation.formula).toEqual("5.25 /");

            calculation.addOperation(new NegateOperation());
            expect(calculation.formula).toEqual("-1*(5.25)");
        });

        test("Given calculation and no number, When adding many operations, Then number remains and operation changes", () => {
            calculation = new Calculation("16.5 + 226")
            calculation.addOperation(new PlusOperation());
            expect(calculation.formula).toEqual("16.5 + 226 +");

            calculation.addOperation(new MinusOperation());
            expect(calculation.formula).toEqual("16.5 + 226 -");

            calculation.addOperation(new DivisionOperation());
            expect(calculation.formula).toEqual("16.5 + 226 /");

            calculation.addOperation(new NegateOperation());
            expect(calculation.formula).toEqual("-1*(16.5 + 226)");
        });

    });

    describe("Functional tests", () => {
        test("Given empty calculation, When adding numbers and operations, Then calculations are done fine", () => {
            
            calculation.addDigit(1);
            expect(calculation.formula).toEqual("0");
            expect(calculation.currentNumber).toEqual("1");
            
            calculation.addOperation(new PlusOperation());
            expect(calculation.formula).toEqual("1 +");
            expect(calculation.currentNumber).toEqual("1"); 
            
            calculation.addDigit(2);
            expect(calculation.formula).toEqual("1 +");
            expect(calculation.currentNumber).toEqual("2"); 

            calculation.addOperation(new ProductOperation());
            expect(calculation.formula).toEqual("1 + 2 *");
            expect(calculation.currentNumber).toEqual("3");

            calculation.addOperation(new DivisionOperation());
            expect(calculation.formula).toEqual("1 + 2 /");
            expect(calculation.currentNumber).toEqual("3");

            calculation.addOperation(new ProductOperation());
            expect(calculation.formula).toEqual("1 + 2 *");
            expect(calculation.currentNumber).toEqual("3");

            calculation.addDigit(3);
            expect(calculation.formula).toEqual("1 + 2 *");
            expect(calculation.currentNumber).toEqual("3");

            calculation.addDigit(Constants.decimalSeparator);
            expect(calculation.formula).toEqual("1 + 2 *");
            expect(calculation.currentNumber).toEqual("3" + Constants.decimalSeparator);

            calculation.addDigit(3);
            expect(calculation.formula).toEqual("1 + 2 *");
            expect(calculation.currentNumber).toEqual("3" + Constants.decimalSeparator + "3");

            calculation.addDigit(3);
            expect(calculation.formula).toEqual("1 + 2 *");
            expect(calculation.currentNumber).toEqual("3" + Constants.decimalSeparator + "33");

            calculation.addOperation(new DivisionOperation());
            expect(calculation.formula).toEqual("1 + 2 * 3" + Constants.decimalSeparator + "33 /");
            expect(calculation.currentNumber).toEqual("7.66");

            calculation.addDigit(2);
            expect(calculation.formula).toEqual("1 + 2 * 3" + Constants.decimalSeparator + "33 /");
            expect(calculation.currentNumber).toEqual("2");

            calculation.addOperation(new EqualsOperation());
            expect(calculation.formula).toEqual("0");
            expect(calculation._formulaStack[calculation._formulaStack.length - 2]).toEqual("1 + 2 * 3" + Constants.decimalSeparator + "33 / 2");
            expect(calculation.currentNumber).toEqual("4.33"); 
            expect(calculation.total).toEqual(4.33); 
        });

        test("Given empty calculation, When adding numbers and operations and equals between them, Then calculations work as Windows calculator", () => {
            
            calculation.addDigit(1);
            expect(calculation.formula).toEqual("0");
            expect(calculation.currentNumber).toEqual("1");
            
            calculation.addOperation(new PlusOperation());
            expect(calculation.formula).toEqual("1 +");
            expect(calculation.currentNumber).toEqual("1"); 
            
            calculation.addDigit(2);
            expect(calculation.formula).toEqual("1 +");
            expect(calculation.currentNumber).toEqual("2"); 

            calculation.addOperation(new EqualsOperation());
            expect(calculation.formula).toEqual("0");
            expect(calculation.currentNumber).toEqual("3");
            expect(calculation.total).toEqual(3);
        });

    });
});