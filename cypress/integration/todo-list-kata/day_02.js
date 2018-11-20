describe('todo list end to end', () => {
  it('renders an empty todo list', () => {
    cy.visit('/');

    cy.get('#todo-list')
      .should('exist');
  });

  it('adds items to todo list', () => {
    cy.visit('/');

    cy.get('#task-name').type('task #1');
    cy.get('#submit-task').click();

    cy.get('#task-name').type('task #2');
    cy.get('#submit-task').click();

    cy.get('#task-name').type('task #3');
    cy.get('#submit-task').click();

    cy.get('li')
      .should(($li) => {
        let tasks = $li.map((i, el) => {
          return Cypress.$(el).text();
        });

        tasks = tasks.get();

        expect(tasks).to.have.length(3);
        expect(tasks).to.deep.eq(['task #1', 'task #2', 'task #3']);
      });
  });
});
