import Operation from './Operation';

export default class ZeroOperation extends Operation {
    
    constructor() {
        super("CE", false);
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.currentNumber = "0";
        return calculation.formula;
    }

}