import Operation from './Operation';

export default class ResetOperation extends Operation {
    
    constructor() {
        super("C", false);
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.clear();
        return calculation.formula;
    }

}