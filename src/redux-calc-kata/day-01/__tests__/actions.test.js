import { should } from 'chai';

import { add } from '../actions';

should();

describe('redux actions', () => {
  it('create addition action', () => {
    add(50).should.be.deep.equal({ type: 'ADD', output: 50 })
  });
});
