import EqualsOperation from './EqualsOperation';
import Calculation from './Calculation';

let operation = new EqualsOperation();
let calculation;

describe("EqualsOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given equals operation, When creating it, Then text is =", () => {
        expect(operation.text).toEqual("=");    
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

    test("Given empty calculation, When applying operation, Then calculation text is cleared and number updated with total", () => {
        operation.apply(calculation);
        expect(operation.apply(calculation)).toEqual("");    
        expect(calculation.formula).toEqual("0");    
        expect(calculation.currentNumber).toEqual("0");    
    });

    test("Given numeric calculation, When applying operation, Then calculation text is cleared and number updated with total", () => {
        calculation = new Calculation("5");
        expect(operation.apply(calculation)).toEqual("");
        expect(calculation.formula).toEqual("0");    
        expect(calculation.currentNumber).toEqual("5");       
    });

    test("Given simple calculation, When applying operation, Then calculation text is cleared and number updated with total", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("");    
        expect(calculation.formula).toEqual("0");    
        expect(calculation.currentNumber).toEqual("75");    
    });

    test("Given complex calculation, When applying operation, Then calculation text is the result of calculating", () => {
        calculation = new Calculation("((5*15)%2 + 123.34 - 12) / 3");
        let expected = eval(calculation.formula);

        expect(operation.apply(calculation)).toEqual("");    
        expect(calculation.formula).toEqual("0");    
        expect(calculation.currentNumber).toEqual(expected.toString());  
    });

    test("Given simple calculation, When applying operation twice, Then calculation text is the result of calculating", () => {
        calculation = new Calculation("5*15");
        debugger;
        expect(operation.apply(calculation)).toEqual("");    
        expect(calculation.formula).toEqual("0");    
        expect(calculation.currentNumber).toEqual("75"); 

        expect(operation.apply(calculation)).toEqual("");    
        expect(calculation.formula).toEqual("0");    
        expect(calculation.currentNumber).toEqual("75");   
    });
});