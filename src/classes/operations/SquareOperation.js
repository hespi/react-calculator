import Operation from './Operation';

export default class SquareOperation extends Operation {
    
    constructor() {
        super("x2")
    }

    apply(calculation) {
        this._validateFormula(calculation);
        return `Math.pow(${calculation.formula}, 2)`;
    }

}