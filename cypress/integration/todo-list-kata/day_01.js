describe('todo list end to end', () => {
  it('should have a list on front page', () => {
    cy.visit('/');

    cy.get('div[id="todo-list"]')
      .should('exist');
  });

  it('should create a task', () => {
    cy.visit('/');

    cy.get('input[id="taskName"]').type('task #1');
    cy.get('button[id="submitTask"]').click();

    cy.get('li').should('contain', 'task #1');
  });
});
