import Operation from './Operation';
import { Constants } from '../common/Constants';

export default class DecimalSeparatorOperation extends Operation {
    
    constructor() {
        super(",", false);
    }

    apply(calculation) {
        this._validateFormula(calculation);
        calculation.addDigit(Constants.decimalSeparator);
        return calculation.formula;
    }

}