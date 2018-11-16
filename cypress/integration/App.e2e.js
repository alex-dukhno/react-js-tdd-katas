describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('/');

    cy.get('a')
      .should('have.text', 'Learn React');
  });
});
