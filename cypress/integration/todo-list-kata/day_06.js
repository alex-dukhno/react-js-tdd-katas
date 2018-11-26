describe('todo list', () => {
  it('submits many tasks', () => {
    cy.visit('/');

    cy.get('input[data-cy-id="task-title"]').type('task title #1');
    cy.get('button[data-cy-id="submit-task"]').click();

    cy.get('input[data-cy-id="task-title"]').type('task title #2');
    cy.get('button[data-cy-id="submit-task"]').click();

    cy.get('input[data-cy-id="task-title"]').type('task title #3');
    cy.get('button[data-cy-id="submit-task"]').click();

    cy.get('li[data-cy-type="task"]')
      .should(($tasks) => {
        const tasks = $tasks.map((index, elem) => Cypress.$(elem).text()).get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.eql(['task title #1', 'task title #2', 'task title #3']);
      });
  });
});
