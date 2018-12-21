import Operation from './Operation';

export default class ZeroOperation extends Operation {
    
    get decimalSeparator() {

    }

    constructor() {
        super("CE")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        while (calculation.currentNumber != "0") {
            calculation.removeDigit();
        }
        return calculation.formula;
    }

}