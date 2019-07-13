import { calculate } from '../reducers';

describe('reductions', () => {
  test('addition', () => {
    let state = { output: 100 };
    state = calculate(state, { type: "ADD_INPUTS", output: 500 });
    state.should.be.equal({ output: 500 });
  });
});
