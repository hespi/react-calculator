import Operation from './Operation';

export default class MinusOperation extends Operation {
    
    constructor() {
        super("-")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        return calculation.formula + " -";
    }

}