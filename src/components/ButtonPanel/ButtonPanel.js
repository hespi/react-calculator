import React from 'react';
import PropTypes from 'prop-types';
import './ButtonPanel.css';
import OperationButton from '../OperationButton/OperationButton';
import DigitOperation from '../../classes/operations/DigitOperation';
import ProductOperation from '../../classes/operations/ProductOperation';
import MinusOperation from '../../classes/operations/MinusOperation';
import PlusOperation from '../../classes/operations/PlusOperation';
import NegateOperation from '../../classes/operations/NegateOperation';
import DecimalSeparatorOperation from '../../classes/operations/DecimalSeparatorOperation';
import EqualsOperation from '../../classes/operations/EqualsOperation';
import ZeroOperation from '../../classes/operations/ZeroOperation';
import ResetOperation from '../../classes/operations/ResetOperation';
import DeleteOperation from '../../classes/operations/DeleteOperation';
import DivisionOperation from '../../classes/operations/DivisionOperation';
import RestOperation from '../../classes/operations/RestOperation';
import SquareRootOperation from '../../classes/operations/SquareRootOperation';
import SquareOperation from '../../classes/operations/SquareOperation';
import DividerOperation from '../../classes/operations/DividerOperation';

export default class ButtonPanel extends React.Component {
  static propTypes = {
    onOperation: PropTypes.func,
    onDigit: PropTypes.func
  }

  onOperation_Click(operation) {
    if (operation instanceof DigitOperation) {
      if (!!this.props.onDigit) {
        this.props.onDigit(operation.text);
      }  
    } else {
      if (!!this.props.onOperation) {
        this.props.onOperation(operation);
      }
    }
  }

  render = () => (
    <div className="button-panel">
      <OperationButton operation={new RestOperation()} light={true} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new SquareRootOperation()} light={true} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new SquareOperation()} light={true} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DividerOperation()} light={true} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <br/>
      <OperationButton operation={new ZeroOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new ResetOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DeleteOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DivisionOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <br/>
      <OperationButton operation={new DigitOperation(7)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(8)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(9)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new ProductOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <br/>
      <OperationButton operation={new DigitOperation(4)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(5)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(6)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new MinusOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <br/>
      <OperationButton operation={new DigitOperation(3)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(2)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(1)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new PlusOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <br/>
      <OperationButton operation={new NegateOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DigitOperation(0)} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new DecimalSeparatorOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
      <OperationButton operation={new EqualsOperation()} onClick={this.onOperation_Click.bind(this)}></OperationButton>
    </div>
  )
}
