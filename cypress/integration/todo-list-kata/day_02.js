describe('todo list end to end', () => {
  const createTask = (taskName) => {
    cy.get('#task-name').type(taskName);
    cy.get('#submit-task').click();
  };

  it('renders an empty todo list', () => {
    cy.visit('/');

    cy.get('#todo-list')
      .should('exist');
  });

  it('adds items to todo list', () => {
    cy.visit('/');

    createTask('task #1');
    createTask('task #2');
    createTask('task #3');

    cy.get('li')
      .should(($li) => {
        let tasks = $li.map((i, el) => Cypress.$(el).text()).get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.eq(['task #1', 'task #2', 'task #3']);
      });
  });
});
