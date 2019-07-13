import React, { Component } from 'react';
import { connect } from 'react-redux'
import { add, augend, addend } from './actions';

export class Calculator extends Component {
  render() {
    return (
      <form>
        <input onChange={(e) => this.props.dispatch(augend(e.target.value))} />
        <input onChange={(e) => this.props.dispatch(addend(e.target.value))} />
        <button
          id='addition'
          onClick={() => this.props.dispatch(add(this.props.augend + this.props.addend))}
        />
        <span>{this.props.output}</span>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  output: state.output,
  addend: state.addend,
  augend: state.augend
});

export default connect(mapStateToProps)(Calculator)
