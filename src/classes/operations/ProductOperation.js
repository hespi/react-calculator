import Operation from './Operation';

export default class ProductOperation extends Operation {
    
    constructor() {
        super("*")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        return calculation.formula + " *";
    }

}