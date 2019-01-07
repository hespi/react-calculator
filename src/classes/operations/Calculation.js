import Operation from './Operation';
import { Constants } from '../common/Constants';

export default class Calculation {
    _currentNumber = null;
    _total = 0;
    _itemStack = [];
    _formulaStack = [];

    get formula() {
        let currentFormula = this._getCurrentFormula();
        return !!currentFormula ? currentFormula.trim() : "0";
    }

    get currentNumber() {
        return !!this._currentNumber ? this._currentNumber : (this.total + "");
    }

    set currentNumber(value) {
        this._currentNumber = value;
    }

    get total() {
        return this._total;
    }

    constructor(calculation = "", number = "") {
        this._itemStack = [];

        if (!!calculation) {
            this._formulaStack.push(calculation);
        }
        
        this._currentNumber = number;
    }

    clear() {
        this._currentNumber = "";
        this._itemStack = [];
        this._formulaStack = [];
        this._total = 0;
    }

    addDigit(digit) {
        this._validateDigit(digit);
        if(digit === Constants.decimalSeparator) {
            this._addDecimalSeparator();
        } else {
            this._doAddDigit(digit);
        }
    }

    removeDigit() {
        this._currentNumber = this._currentNumber.substr(0, this._currentNumber.length - 1);
    }

    addOperation(operation) {
        this._validateOperation(operation);
        if (operation.isMathOperation) {
            this._addMathOperation(operation);
        } else {
            operation.apply(this);
        }
    }

    calculate() {
        if (!!this._currentNumber) {
            this._addCurrentNumberToCurrentFormula();
        }

        if(!!this._getCurrentFormula()) {
            this._currentNumber = (parseFloat(eval(this.formula)) + "");
            this._formulaStack.push("");
        }
    }

    lastItemIsOperation() {
        return (this._itemStack.length > 0 && this._itemStack[this._itemStack.length - 1] instanceof Operation);
    }

    /** FUNCTIONS */

    _validateDigit(digit) {
        let validation = /[^0-9,\.]/;
        if (validation.test(digit) || (digit + "").length > 1) {
            throw "Invalid digit";
        }
    }

    _validateOperation(operation) {
        if (!!!operation) {
            throw "Invalid operation";
        }
    }

    _doAddDigit(digit) {
        if (this._currentNumber === "0") {
            this._currentNumber = (digit + "");
        } else {
            this._currentNumber += digit;
        }

        this._itemStack.push(digit);
    }

    _addDecimalSeparator() {
        if (this._currentNumber.indexOf(Constants.decimalSeparator) === -1) {
            this._currentNumber += (!!this._currentNumber ? "" : "0") + Constants.decimalSeparator;
        }
    }

    _addMathOperation(operation) {
        if (this.lastItemIsOperation() && !!!this._currentNumber) {
            this._popStacks();
        }
        if (!!this._currentNumber) {
            this._addCurrentNumberToCurrentFormula();
        }
        
        let formulaAfterOperation = operation.apply(this);
        if (!!formulaAfterOperation) {
            this._formulaStack.push(formulaAfterOperation);
        }
        
        this._itemStack.push(operation);
    }

    _addCurrentNumberToCurrentFormula() {
        let ix = Math.max(0, this._formulaStack.length - 1);
        this._formulaStack[ix] = (!!this._formulaStack[ix] ? this._formulaStack[ix] : "") + " " + this.currentNumber;
        let newTotal = this._parseFormula(this._formulaStack[ix]);
        if (!isNaN(newTotal)) {
            this._currentNumber = "";
            this._total = newTotal;
        }
        
    }

    _parseFormula(formula) {
        try {
            return parseFloat(eval(formula))
        } catch (ex) {
            return NaN;
        }

    }

    _popStacks() {
        this._itemStack.pop();
        this._formulaStack.pop();
    }

    _getCurrentFormula() {
        return (this._formulaStack.length === 0) ? "" : this._formulaStack[this._formulaStack.length - 1];
    }
}