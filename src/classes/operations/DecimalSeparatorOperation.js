import Operation from './Operation';
var Constants = require('../common/Constants');

export default class DecimalSeparatorOperation extends Operation {
    
    get decimalSeparator() {

    }

    constructor() {
        super(",")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.addDigit(Constants.decimalSeparator);
        return calculation.formula;
    }

}