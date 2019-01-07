import Operation from './Operation';

describe("Operation Tests", () => {
    test("Given no text, When operation is constructed, Then text is empty", () => {
        let opeartion = new Operation();
        expect(opeartion.text).toEqual("");
    });

    test("Given not empty text, When operation is constructed, Then text is set", () => {
        let opeartion = new Operation("=");
        expect(opeartion.text).toEqual("=");
    });

    test("Given abstract operation, When applying operation, Then text is set", () => {
        let opeartion = new Operation("=");
        expect(() => {
            opeartion.apply()
        }).toThrowError("Not implemented");

        expect(() => {
            opeartion.apply({})
        }).toThrowError("Not implemented");
    });
});