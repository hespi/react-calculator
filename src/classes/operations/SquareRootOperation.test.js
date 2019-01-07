import SquareRootOperation from './SquareRootOperation';
import Calculation from './Calculation';

let operation = new SquareRootOperation();
let calculation;

describe("SquareRootOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given negation operation, When creating it, Then text is &radic;", () => {
        expect(operation.text).toEqual("&radic;");    
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

    test("Given empty calculation, When applying operation, Then calculation text is updated", () => {
        expect(operation.apply(calculation)).toEqual("Math.sqrt(0)");    
    });

    test("Given numeric calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5");
        expect(operation.apply(calculation)).toEqual("Math.sqrt(5)");    
    });

    test("Given simple calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("Math.sqrt(5*15)");    
    });

    test("Given simple calculation, When applying operation twice, Then calculation text is updated once", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("Math.sqrt(5*15)");    
        expect(operation.apply(calculation)).toEqual("Math.sqrt(5*15)");    
    });
});