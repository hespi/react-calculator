import DecimalSeparatorOperation from './DecimalSeparatorOperation';
import Calculation from './Calculation';
var Constants = require('../common/Constants');

let operation = new DecimalSeparatorOperation();
let calculation;

describe("DecimalSeparatorOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given decimal separator operation, When creating it, Then text is ','", () => {
        expect(operation.text).toEqual(",");    
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

    test("Given empty calculation, When applying operation, Then calculation text is empty", () => {
        expect(operation.apply(calculation)).toEqual("0");    
    });

    test("Given non-empty number, When applying operation, Then decimal separator is added and calculation is not changed", () => {
        calculation = new Calculation("", "5");
        expect(operation.apply(calculation)).toEqual("0");   
        expect(calculation.currentNumber).toEqual("5" + Constants.decimalSeparator); 
    });

    test("Given a float number, When applying operation, Then decimal separator is not added and calculation is not changed", () => {
        let num = "5" + Constants.decimalSeparator + "5";
        calculation = new Calculation("", num);
        expect(operation.apply(calculation)).toEqual("0");   
        expect(calculation.currentNumber).toEqual(num); 
    });

    test("Given any calculation, When applying operation, Then addDigit is called", () => {
        calculation = new Calculation("5");
        calculation.addDigit = jest.fn();
        operation.apply(calculation);
        expect(calculation.addDigit).toHaveBeenCalledTimes(1);
    });

}); 