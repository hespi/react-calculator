import NegateOperation from './NegateOperation';
import Calculation from './Calculation';

let operation = new NegateOperation();
let calculation;

describe("NegateOperation tests", () => {

    beforeEach(() => {
        calculation = new Calculation();
    });

    test("Given negation operation, When creating it, Then text is &plusmn;", () => {
        expect(operation.text).toEqual("&plusmn;");    
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
        expect(operation.apply(calculation)).toEqual("-1*(0)");    
    });

    test("Given numeric calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5");
        expect(operation.apply(calculation)).toEqual("-1*(5)");    
    });

    test("Given simple calculation, When applying operation, Then calculation text is updated", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("-1*(5*15)");    
    });

    test("Given simple calculation, When applying operation twice, Then calculation text is updated once", () => {
        calculation = new Calculation("5*15");
        expect(operation.apply(calculation)).toEqual("-1*(5*15)");    
        expect(operation.apply(calculation)).toEqual("-1*(5*15)");    
    });
});