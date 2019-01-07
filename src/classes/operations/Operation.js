export default class Operation {
    
    text = "";

    isMathOperation = true;

    constructor(text = "", isMathOperation = true) {
        this.text = text;
        this.isMathOperation = isMathOperation;
    }

    apply(calculation) {
        throw "Not implemented";
    }

    _validateFormula(calculation) {
        if (!!!calculation) {
            throw "Invalid calculation";
        }
    }    
}