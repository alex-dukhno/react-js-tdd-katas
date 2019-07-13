const initialState = { output: 0, augend: 0, addend: 0 };

export const calculate = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, output: action.output };
    case 'AUGEND':
      return { ...state, augend: action.augend };
    case 'ADDEND':
      return { ...state, addend: action.addend };
    default:
      return { ...state };
  }
};
