import Operation from './Operation';

export default class DeleteOperation extends Operation {
    
    get decimalSeparator() {

    }

    constructor() {
        super("&‌larr;")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.removeDigit();
        return calculation.formula;
    }

}