import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import Calculator, { reducer, firstNum, secondNum, addition } from '../kata';

Enzyme.configure({ adapter: new Adapter() });

describe('calculator', () => {
  it('computes addition', () => {
    let state = {};
    state = reducer(state, firstNum(10));
    state = reducer(state, secondNum(15));
    state = reducer(state, addition());
    expect(state).to.be.deep.equal({firstNum: 0, secondNum: 0, result: 25})
  });

  it('should be rendered', () => {
    const store = createStore(reducer);
    const calc = mount(<Provider store={store}><Calculator /></Provider>);

    const firstNum = calc.find('input').at(0);
    firstNum.simulate('change', {target: {value: 10}});

    const secondNum = calc.find('input').at(1);
    secondNum.simulate('change', {target: {value: 15}});

    const computeButton = calc.find('button');
    computeButton.simulate('click');

    const result = calc.find('span');
    expect(result.text()).to.be.equal('25');
  });
});
