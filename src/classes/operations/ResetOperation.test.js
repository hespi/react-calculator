import ResetOperation from './ResetOperation';
import Calculation from './Calculation';

let operation = new ResetOperation();
let calculation;

describe("ResetOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given reset operation, When creating it, Then text is C", () => {
        expect(operation.text).toEqual("C");    
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
        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("0");    
        expect(calculation.formula).toEqual("0");    
    });

    test("Given non-empty calculation, When applying operation, Then calculation text and number are cleared", () => {
        calculation = new Calculation("5");
        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("0");    
        expect(calculation.formula).toEqual("0");      
    });

    test("Given a complex calculation, When applying operation, Then calculation text and number are cleared", () => {
        calculation = new Calculation("((5*15)%2 + 123.34 - 12) / 3");
        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("0");    
        expect(calculation.formula).toEqual("0");      
    });

    test("Given any calculation, When applying operation, Then clear is called", () => {
        calculation = new Calculation("5");
        calculation.clear = jest.fn();
        operation.apply(calculation);
        expect(calculation.clear).toHaveBeenCalledTimes(1);
    });

});