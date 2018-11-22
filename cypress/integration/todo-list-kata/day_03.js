describe('todo list', () => {
  it('exists', () => {
    cy.visit('/');

    cy.get('div[data-cy-id="todo-list"]')
      .should('exist');
  });

  const submitTask = (taskTitle) => {
    cy.get('input[data-cy-id="task-title"')
      .type(taskTitle);
    cy.get('button[data-cy-id="submit-task"]')
      .click();
  };

  it('adds many tasks', () => {
    cy.visit('/');

    submitTask('task title #1');
    submitTask('task title #2');
    submitTask('task title #3');

    cy.get('li[data-cy-type="task"]')
      .should(($task) => {
        const tasks = $task.map((index, elem) => Cypress.$(elem).text()).get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.eql(['task title #1', 'task title #2', 'task title #3'])
      });
  });
});
