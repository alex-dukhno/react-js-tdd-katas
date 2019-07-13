import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ConnectedCalculator from '../kata';
import { calculate } from '../reducers';

configure({ adapter: new Adapter() });
should();

describe('calculator', () => {
  it('should add two numbers', () => {
    const store = createStore(calculate);

    const calc = mount(<Provider store={store}><ConnectedCalculator /></Provider>);

    const augend = calc.find('input').at(0);
    augend.simulate('change', { target: { value: 10 } });

    const addend = calc.find('input').at(1);
    addend.simulate('change', { target: { value: 15 } });

    const sum = calc.find('#addition');
    sum.simulate('click');

    const result = calc.find('span');

    result.text().should.be.equal('25');
  });
});
