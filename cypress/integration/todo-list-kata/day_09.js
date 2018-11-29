describe('todo list', () => {
  const submitTask = (taskTitle) => {
    cy.get('input[data-cy-id="task-title"]').type(taskTitle);
    cy.get('button[data-cy-id="submit-task"]').click();
  };

  it('submits many tasks', () => {
    cy.visit('/');

    submitTask('task title $1');
    submitTask('task title $2');
    submitTask('task title $3');

    cy.get('li[data-cy-type="task"]')
      .should(($tasks) => {
        const tasks = $tasks.map((index, elem) => Cypress.$(elem).find('span[data-cy-type="title"]').text()).get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.eql(['task title $1', 'task title $2', 'task title $3'])
      });
  });

  it('marks task as done', () => {
    cy.visit('/');

    submitTask('task title $1');

    cy.get('button[data-cy-type="mark-in-progress"]').click();
    cy.get('button[data-cy-type="mark-as-done"]').click();

    cy.get('span[data-cy-type="status"]').should('contain', 'DONE');
  });
});
