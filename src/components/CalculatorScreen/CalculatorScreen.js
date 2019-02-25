import React from 'react';
import PropTypes from 'prop-types';
import './CalculatorScreen.css';
import Calculation from '../../classes/operations/Calculation';

export default class CalculatorScreen extends React.Component {
  static propTypes = {
    maxDigits: PropTypes.number
  }

  static defaultProps = {
    maxDigits: 12
  }

  constructor(props) {
    super(props);
    this.calculation = new Calculation();

    this.state = {
      formula: this.calculation.formula,
      result: this.calculation.total,
    }
  }

  addDigit(digit) {
    if(!this._maxDigitsReached() || this.calculation.lastItemIsOperation()) {
      this.calculation.addDigit(digit);
    
      this.setState({
        formula: this.calculation.formula,
        result: this.calculation.currentNumber,
      });
    }

    
  }

  addOperation(operation) {
    this.calculation.addOperation(operation);  
    
    this.setState({
      formula: this.calculation.formula,
      result: this.calculation.currentNumber,
    });
  }

  _maxDigitsReached() {
    return this.state.result.length >= this.props.maxDigits;
  }

  render = () => (
    <div className="calculator-screen">
      <div className="formula">
        {this.state.formula}
      </div>
      <div className="result">
        {(this.state.result + "").substring(0, this.props.maxDigits)}
      </div>
    </div>
  )
}
