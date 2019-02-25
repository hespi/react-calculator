import React from 'react';
import './Calculator.css';
import CalculatorScreen from '../CalculatorScreen/CalculatorScreen';
import ButtonPanel from '../ButtonPanel/ButtonPanel';

export default class Calculator extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.screen = React.createRef();
  }

  onDigit_Click(digit) {
    this.screen.current.addDigit(digit);
  }

  onOperation_Click(operation) {
    this.screen.current.addOperation(operation);
  }

  render = () => (
    <div className="calculator">
      <CalculatorScreen ref={this.screen} />
      <ButtonPanel onDigit={this.onDigit_Click.bind(this)} onOperation={this.onOperation_Click.bind(this)}/>
    </div>
  )
}
