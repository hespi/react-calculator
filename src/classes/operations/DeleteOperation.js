import Operation from './Operation';

export default class DeleteOperation extends Operation {

    constructor() {
        super("&#9003;", false);
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.removeDigit();
        return calculation.formula;
    }

}