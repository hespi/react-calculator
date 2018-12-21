import Operation from './Operation';

export default class DividerOperation extends Operation {
    
    constructor() {
        super("1/x")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        return `1/(${calculation.formula})`;
    }

}