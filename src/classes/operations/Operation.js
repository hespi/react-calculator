export default class Operation {
    
    text = "";

    constructor(text = "") {
        this.text = text;
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