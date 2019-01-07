import Operation from './Operation';

export default class EqualsOperation extends Operation {
    
    constructor() {
        super("=")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.calculate();
        return "";
    }

}