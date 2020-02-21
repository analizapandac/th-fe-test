/// <reference types="cypress" />

describe('Comments', () => {
  it('should show the list the post comments and allow comments filtering', () => {
    cy.fixture('comments.json').as('comments');
    cy.server({
      method: 'GET',
      status: 200,
      response: {}
    });
    cy.route('/comments**', '@comments');
    cy.visit('/posts/1');

    cy.get('@comments').then(comments => {
      cy.get('[data-cy="comment-item"]').should('have.length', comments.length);
      cy.get('input').type(comments[0].email);
      cy.get('[data-cy="comment-item"]').should('have.length', 1);

      cy.get('[data-cy="comment-item"').first().then($el => {
        expect($el).to.contain(comments[0].name);
        expect($el).to.contain(comments[0].email);
        expect($el).to.contain(comments[0].body);
      });
    });
  });

  it('should show an error message when API returns an error', () => {
    cy.server({
      method: 'GET',
      status: 500,
      response: {}
    });
    
    cy.route('/comments**', 'fixtures:comments.json');
    cy.visit('/posts/1');

    cy.contains('Sorry, there was an error fetching the list of comments. Please try again later.');
    cy.contains('No comments found'); 
  });
});