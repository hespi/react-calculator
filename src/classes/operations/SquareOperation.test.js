import SquareOperation from './SquareOperation';
import Calculation from './Calculation';

let operation = new SquareOperation();
let calculation;

describe("SquareOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given square operation, When creating it, Then text is x2", () => {
        expect(operation.text).toEqual("x2");    
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
        expect(operation.apply(calculation)).toEqual("Math.pow(0, 2)");    
    });

    test("Given numeric calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5");
        expect(operation.apply(calculation)).toEqual("Math.pow(5, 2)");    
    });

    test("Given simple calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("Math.pow(5*15, 2)");    
    });

    test("Given simple calculation, When applying operation twice, Then calculation text is updated once", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("Math.pow(5*15, 2)");    
        expect(operation.apply(calculation)).toEqual("Math.pow(5*15, 2)");    
    });
});