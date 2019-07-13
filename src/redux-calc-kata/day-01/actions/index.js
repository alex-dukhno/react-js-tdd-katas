export const add = (value) => {
  return {
    type: 'ADD',
    output: value
  }
};

export const augend = (value) => {
  return {
    type: 'AUGEND',
    augend: value
  }
};

export const addend = (value) => {
  return {
    type: 'ADDEND',
    addend: value
  }
};
