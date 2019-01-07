import Operation from './Operation';
var Constants = require('../common/Constants');

export default class DigitOperation extends Operation {
    
    get decimalSeparator() {

    }

    constructor(number) {
        super(number + "");
        this._validateNumber(number);        
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.addDigit(this.text);
        return calculation.formula;
    }

    _validateNumber(number) {
        var parsedNumber = parseInt(number, 10);
        if (isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber > 9) {
            throw "Invalid digit";
        }
    }

}