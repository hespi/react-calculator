import DivisionOperation from './DivisionOperation';
import Calculation from './Calculation';

let operation = new DivisionOperation();
let calculation;

describe("DivisionOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given division operation, When creating it, Then text is /", () => {
        expect(operation.text).toEqual("/");    
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
        operation.apply(calculation);
        expect(operation.apply(calculation)).toEqual("0 /");    
    });

    test("Given numeric calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5");
        operation.apply(calculation);
        expect(operation.apply(calculation)).toEqual("5 /");    
    });

    test("Given simple calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5*15");
        operation.apply(calculation);
        expect(operation.apply(calculation)).toEqual("5*15 /");    
    });

    test("Given complex calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("((5*15)%2 + 123.34 - 12) / 3");
        expect(operation.apply(calculation)).toEqual("((5*15)%2 + 123.34 - 12) / 3 /");    
    });

    test("Given simple calculation, When applying operation twice, Then calculation text is updated once", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("5*15 /");    
        expect(operation.apply(calculation)).toEqual("5*15 /");    
    });
});