import DeleteOperation from './DeleteOperation';
import Calculation from './Calculation';

let operation = new DeleteOperation();
let calculation;

describe("DeleteOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given delete operation, When creating it, Then text is &‌larr;", () => {
        expect(operation.text).toEqual("&#9003;");    
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

    test("Given empty calculation, When applying operation, Then neither calculation text nor number is updated", () => {
        expect(operation.apply(calculation)).toEqual("0");    
    }); 

    test("Given non-empty number, When applying operation, Then last digit is removed", () => {
        calculation = new Calculation("", "5");
        expect(operation.apply(calculation)).toEqual("0");  
        expect(calculation.currentNumber).toEqual("0");  
    });

    test("Given a calculation with a float, When applying operation, Then digit and decimal separator are removed", () => {
        calculation = new Calculation("", "5.52");
        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("5.5");    
        
        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("5.");    

        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("5");    

        expect(operation.apply(calculation)).toEqual("0");    
        expect(calculation.currentNumber).toEqual("0");    
    });

    test("Given any calculation, When applying operation, Then removeDigit is called", () => {
        calculation = new Calculation("5");
        calculation.removeDigit = jest.fn();
        operation.apply(calculation);
        expect(calculation.removeDigit).toHaveBeenCalledTimes(1);
    });

});