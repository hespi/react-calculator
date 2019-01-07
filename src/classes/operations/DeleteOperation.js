import Operation from './Operation';

export default class DeleteOperation extends Operation {

    constructor() {
        super("&‌larr;", false);
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.removeDigit();
        return calculation.formula;
    }

}