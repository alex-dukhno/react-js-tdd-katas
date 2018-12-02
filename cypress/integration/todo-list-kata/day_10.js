describe('todo list', () => {
  beforeEach(() => cy.visit('/'));

  const submitTask = (taskTitle) => {
    cy.get('input[data-cy-id="task-title"]').type(taskTitle);
    cy.get('button[data-cy-id="submit-task"]').click();
  };

  const completeTask = () => {
    cy.get('button[data-cy-type="mark-in-progress"]').click();
    cy.get('button[data-cy-type="mark-as-done"]').click();
  };

  const extractTitle = (index, elem) => Cypress.$(elem).find('span[data-cy-type="title"]').text();

  it('submits many tasks', () => {
    submitTask('task title #1');
    submitTask('task title #2');
    submitTask('task title #3');

    cy.get('li[data-cy-type="task"]')
      .should(($tasks) => {
        const tasks = $tasks.map(extractTitle).get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.equal(['task title #1', 'task title #2', 'task title #3'])
      });
  });

  it('marks task as done', () => {
    submitTask('task title #1');
    completeTask();

    cy.get('span[data-cy-type="task-status"]').should('contain', 'DONE');
  });
});
