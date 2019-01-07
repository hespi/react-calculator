import DigitOperation from './DigitOperation';
import Calculation from './Calculation';
var Constants = require('../common/Constants');

let operation;
let calculation;

describe("DigitOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given digit operation, When creating it, Then text is equal to digit", () => {
        operation = new DigitOperation(1);
        expect(operation.text).toEqual("1");    

        operation = new DigitOperation(9);
        expect(operation.text).toEqual("9");    
    });

    test("Given non numeric digit, When creating operation, Then exception is thrown", () => {
        expect(() => {
            new DigitOperation("a")
        }).toThrowError("Invalid digit");

        expect(() => {
            new DigitOperation("")
        }).toThrowError("Invalid digit");

        expect(() => {
            new DigitOperation()
        }).toThrowError("Invalid digit");

        expect(() => {
            new DigitOperation(null)
        }).toThrowError("Invalid digit");

        expect(() => {
            new DigitOperation(12)
        }).toThrowError("Invalid digit");
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

    test("Given empty calculation, When applying operation, Then digit is added to calculation", () => {
        operation = new DigitOperation("1");
        expect(operation.apply(calculation)).toEqual("0");
        expect(calculation.currentNumber).toEqual("1");    
    });

    test("Given non-empty number, When applying operation, Then digit is added and formula is not changed", () => {
        calculation = new Calculation("", "5");
        operation = new DigitOperation(8);
        expect(operation.apply(calculation)).toEqual("0");   
        expect(calculation.currentNumber).toEqual("58"); 
    });

    test("Given a float number, When applying operation, Then digit is added and formula is not changed", () => {
        let num = "5" + Constants.decimalSeparator + "5";
        calculation = new Calculation("", num);
        operation = new DigitOperation(0);
        expect(operation.apply(calculation)).toEqual("0");   
        expect(calculation.currentNumber).toEqual(num + "0"); 
    });

    test("Given any calculation, When applying operation, Then addDigit is called", () => {
        calculation = new Calculation("5");
        calculation.addDigit = jest.fn();
        operation.apply(calculation);
        expect(calculation.addDigit).toHaveBeenCalledTimes(1);
    });

}); 