import Operation from './Operation';

export default class NegateOperation extends Operation {
    
    constructor() {
        super("&plusmn;")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        return `-1*(${calculation.formula})`;
    }

}