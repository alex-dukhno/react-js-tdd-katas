import React from 'react';
import { connect } from 'react-redux';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_FIRST_NUM':
      return {...state, firstNum: action.firstNum};
    case 'STORE_SECOND_NUM':
      return {...state, secondNum: action.secondNum};
    case 'ADDITION':
      return {result: state.firstNum + state.secondNum, firstNum: 0, secondNum: 0};
    default:
      return state;
  }
};

export const firstNum = (firstNum) => ({type: 'STORE_FIRST_NUM', firstNum});
export const secondNum = (secondNum) => ({type: 'STORE_SECOND_NUM', secondNum});
export const addition = () => ({type: 'ADDITION'});

function Calculator(props) {
  const first = (num) => props.dispatch(firstNum(num));
  const second = (num) => props.dispatch(secondNum(num));
  const add = () => props.dispatch(addition());
  return (
    <>
      <form>
        <input onChange={(e) => first(e.target.value)} />
        <input onChange={(e) => second(e.target.value)} />
        <button onClick={() => add()} />
      </form>
      <span>{props.result}</span>
    </>
  );
}

export default connect((state) => ({...state}))(Calculator)
