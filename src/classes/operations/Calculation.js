import Operation from './Operation';

var Constants = require('../common/Constants');

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
        return !!this._currentNumber ? this._currentNumber : new String(this.total);
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
        this._doAddOperation(operation);
    }

    calculate() {
        if(!!this._getCurrentFormula()) {
            this._currentNumber = new String(parseFloat(eval(this.formula)));
            this._formulaStack.push("");
        }
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
    }

    _addDecimalSeparator() {
        if (this._currentNumber.indexOf(Constants.decimalSeparator) === -1) {
            this._currentNumber += (!!this._currentNumber ? "" : "0") + Constants.decimalSeparator;
        }
    }

    _doAddOperation(operation) {
        if (this._lastItemIsOperation() && !!!this._currentNumber) {
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

    _lastItemIsOperation() {
        return (this._itemStack.length > 0 && this._itemStack[this._itemStack.length - 1] instanceof Operation);
    }

    _addCurrentNumberToCurrentFormula() {
        let ix = Math.max(0, this._formulaStack.length - 1);
        this._formulaStack[ix] = (!!this._formulaStack[ix] ? this._formulaStack[ix] : "") + " " + this.currentNumber;
        this._currentNumber = "";
        this._total = parseFloat(eval(this._formulaStack[ix]));
    }

    _popStacks() {
        this._itemStack.pop();
        this._formulaStack.pop();
    }

    _getCurrentFormula() {
        return (this._formulaStack.length == 0) ? "" : this._formulaStack[this._formulaStack.length - 1];
    }
}