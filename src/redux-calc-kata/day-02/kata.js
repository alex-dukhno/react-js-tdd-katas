import React from 'react';
import { connect } from 'react-redux';

export const add = (firstArgument, secondArgument) => ({
  type: 'ADDITION',
  firstArgument,
  secondArgument
});

export const storeFirstArgument = (value) => ({
  type         : 'STORE_FIRST_ARGUMENT',
  firstArgument: value
});

export const storeSecondArgument = (value) => ({
  type          : 'STORE_SECOND_ARGUMENT',
  secondArgument: value
});

export const store = (state = { result: 0 }, action) => {
  switch (action.type) {
    case 'STORE_FIRST_ARGUMENT':
      return { ...state, firstArgument: Number(action.firstArgument) };
    case 'STORE_SECOND_ARGUMENT':
      return { ...state, secondArgument: Number(action.secondArgument) };
    default:
      return state;
  }
};

export const calculate = (state = { result: 0 }, action) => {
  switch (action.type) {
    case 'ADDITION':
      const { firstArgument, secondArgument } = action;
      return { ...state, firstArgument, secondArgument, result: firstArgument + secondArgument };
    default:
      return state;
  }
};

export const reducer = (state = { result: 0 }, action) => {
  switch (action.type) {
    case 'ADDITION':
      return calculate(state, action);
    case 'STORE_FIRST_ARGUMENT':
    case 'STORE_SECOND_ARGUMENT':
      return store(state, action);
    default:
      return state;
  }
};

const Calculator = ({dispatch, firstArgument, secondArgument, result}) => {
  const saveFirst = (e) => dispatch(storeFirstArgument(e.target.value));
  const saveSecond = (e) => dispatch(storeSecondArgument(e.target.value));
  const addition = () => dispatch(add(firstArgument, secondArgument));

    return (
      <>
        <form>
          <input onChange={saveFirst} />
          <input onChange={saveSecond} />
          <button
            id='add'
            onClick={addition}
          />
        </form>
        <span>{result}</span>
      </>
    );
};

export default connect((state) => ({ ...state }))(Calculator);
