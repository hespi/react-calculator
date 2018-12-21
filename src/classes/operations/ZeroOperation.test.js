import ZeroOperation from './ZeroOperation';
import Calculation from './Calculation';

let operation = new ZeroOperation();
let calculation;

describe("ZeroOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given zero operation, When creating it, Then text is CE", () => {
        expect(operation.text).toEqual("CE");    
    });

    test("Given null calculation, When applying operation, Then exception is thrown", () => {
        expect(() => {
            operation.apply(null);
        }).toThrowError("Invalid calculation");

        expect(() => {
            operation.apply();
        }).toThrowError("Invalid calculation");

        expect(() => {
            operation.apply(undefined);
        }).toThrowError("Invalid calculation");
    });

    test("Given empty calculation, When applying operation, Then calculation text and number are cleared", () => {
        calculation = new Calculation("", "5");
        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("0");    
        expect(calculation.formula).toEqual("0");    
    });

    test("Given non-empty calculation, When applying operation, Then only number is cleared", () => {
        calculation = new Calculation("5 +", "5.567");
        expect(calculation.currentNumber).toEqual("5.567");    
        expect(operation.apply(calculation)).toEqual("5 +");    
        expect(calculation.currentNumber).toEqual("0");    
        expect(calculation.formula).toEqual("5 +");      
    });

    test("Given a complex calculation, When applying operation, Then calculation text remains and number is cleared", () => {
        calculation = new Calculation("((5*15)%2 + 123.34 - 12) / ", "3");
        debugger;
        expect(operation.apply(calculation)).toEqual("((5*15)%2 + 123.34 - 12) /");    
        expect(calculation.currentNumber).toEqual("0");    
        expect(calculation.formula).toEqual("((5*15)%2 + 123.34 - 12) /");      
    });

});