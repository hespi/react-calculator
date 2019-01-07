import Operation from './Operation';

export default class ResetOperation extends Operation {
    
    get decimalSeparator() {

    }

    constructor() {
        super("C")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.clear();
        return calculation.formula;
    }

}