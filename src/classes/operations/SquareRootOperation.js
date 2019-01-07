import Operation from './Operation';

export default class SquareRootOperation extends Operation {
    
    constructor() {
        super("&radic;")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        return `Math.sqrt(${calculation.formula})`;
    }

}