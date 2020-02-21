/// <reference types="cypress" />

describe('Post', () => {
  beforeEach(() => {
    cy.fixture('post.json').as('post');
    cy.fixture('comments.json').as('comments');
    cy.server({
      method: 'GET',
      status: 200,
      response: {}
    });
    cy.route('/posts/**', '@post');
    cy.route('/comments**', '@comments');
    cy.visit('/posts/1');
  });

  it('should show the back button to view all posts', () => {
    cy.contains('Back').should('have.attr', 'href', '/')
  });

  it('should show the list the post details', () => {
    cy.get('@post').then(post => {
      cy.log(post.body);
      cy.contains(post.title);
      cy.get('[data-cy="post"]').find('article').then($el => {
        expect($el).to.contain(post.body);
      });
      cy.get('[data-cy="comments-wrapper"]').should('be.visible');
    });
  });

  it('should show an error message when API returns an error', () => {
    cy.server({
      method: 'GET',
      status: 500,
      response: {}
    });
    
    cy.route('/posts/**', 'fixtures:post.json');
    cy.visit('/posts/1');

    cy.contains('Sorry, there was an error fetching the current post. Please try again later.');
  });
});