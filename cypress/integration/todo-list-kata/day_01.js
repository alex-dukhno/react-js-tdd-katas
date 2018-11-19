describe('todo list end to end', () => {
  it('should have a list on front page', () => {
    cy.visit('/');

    cy.get('div[id="todo-list"]')
      .should('exist');
  });
});
