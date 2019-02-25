import React from 'react';
import PropTypes from 'prop-types';
import './OperationButton.css';
import Operation from '../../classes/operations/Operation';

export default class OperationButton extends React.Component {

  static propTypes = {
    operation: PropTypes.instanceOf(Operation),
    light: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    operation: undefined,
    onClick: undefined
  }

  constructor(props) {
    super(props);

    this.state = {
      operationText: this.decodeEntities(props.operation.text)
    }
  }

  decodeEntities(text) {
    var txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  };

  onButton_Click(sender) {
    if (!!this.props.onClick) {
      this.props.onClick(this.props.operation);
    }
  }

  render = () => (
    <button className={"operation-button" + (!!this.props.light ? " light" : "")} onClick={this.onButton_Click.bind(this)}>
      {this.state.operationText}
    </button>
  )
}

