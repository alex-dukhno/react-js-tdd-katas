describe('todo list', () => {
  beforeEach(() => {
    cy.visit('/');

    submitTask('integration task title $1');
  });

  const submitTask = (taskTitle) => {
    cy.get('input[data-cy-id="task-title"]').type(taskTitle);
    cy.get('button[data-cy-id="submit-task"]').click();
  };

  it('submits many tasks', () => {
    const taskTitles = [
      'integration task title $2',
      'integration task title $3'
    ];

    taskTitles.forEach(submitTask);

    cy.get('span[data-cy-type="title"]')
      .should(($tasks) => {
        const tasks = $tasks.map((index, elem) => Cypress.$(elem).text()).get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.eql(['integration task title $1', ...taskTitles]);
      });
  });

  it('marks task as done', () => {
    cy.get('button[data-cy-type="mark-in-progress"]').click();
    cy.get('button[data-cy-type="mark-as-done"]').click();
    cy.get('span[data-cy-type="status"]').should('contain', 'Done');
  });
});
