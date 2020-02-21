/// <reference types="cypress" />

describe('End-to-end test', () => {
  it('should display list of posts and go to post details when clicked', () => {
    cy.visit('/');

    cy.get('[data-cy="posts"]').should('be.visible');

    cy.get('[data-cy="post-item"]').first().then($post => {
      cy.wrap($post).click();
      cy.url().should('include', '/posts/1');

      cy.get('[data-cy="post"]').should('be.visible');
      cy.get('[data-cy="comments-wrapper"]').should('be.visible');

      cy.get('input').type('this is a very personalized text');
      cy.contains('No comments found');

      cy.contains('Back').click();

      cy.url().should('eq', Cypress.config().baseUrl + '/')
    });
  });
});