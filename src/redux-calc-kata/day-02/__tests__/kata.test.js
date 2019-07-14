import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';

import Calculator, {
  add, storeFirstArgument, storeSecondArgument, reducer
} from '../kata';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

Enzyme.configure({ adapter: new Adapter() });
should();

describe('calculator', () => {
  it('has add action', () => {
    add(10, 15).should.be.deep.equal({ type: 'ADDITION', firstArgument: 10, secondArgument: 15 });
  });

  it('has store first argument action', () => {
    storeFirstArgument(10).should.be.deep.equal({
      type         : 'STORE_FIRST_ARGUMENT',
      firstArgument: 10
    });
  });

  it('has store second argument action', () => {
    storeSecondArgument(10).should.be.deep.equal({
      type          : 'STORE_SECOND_ARGUMENT',
      secondArgument: 10
    });
  });

  it('stores first argument', () => {
    reducer({ result: 0 }, storeFirstArgument(20)).should.be.deep.equal({
      result       : 0,
      firstArgument: 20
    });
  });

  it('stores second argument', () => {
    reducer({ result: 0 }, storeSecondArgument(13)).should.be.deep.equal({
      result        : 0,
      secondArgument: 13
    })
  });

  it('performs addition computation', () => {
    reducer({ result: 0 }, add(14, 12)).should.be.deep.equal({
      firstArgument : 14,
      secondArgument: 12,
      result        : 14 + 12
    })
  });

  it('performs addition', () => {
    const store = createStore(reducer);

    const calc = mount(<Provider store={store}><Calculator /></Provider>);

    const firstArgument = calc.find('input').at(0);
    firstArgument.simulate('change', { target: { value: 10 } });

    const secondArgument = calc.find('input').at(1);
    secondArgument.simulate('change', { target: { value: 15 } });

    const addButton = calc.find('#add');
    addButton.simulate('click');

    const result = calc.find('span');
    result.text().should.be.deep.equal('25');
  });
});
