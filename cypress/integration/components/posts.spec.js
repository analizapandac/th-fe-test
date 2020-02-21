/// <reference types="cypress" />

describe('Posts', () => {
  beforeEach(() => {
    cy.fixture('posts.json').as('posts');
  });

  it('should show the list of posts', () => {
    cy.server({
      method: 'GET',
      status: 200,
      response: {}
    });
    
    cy.route('/posts', '@posts');

    cy.visit('/');

    cy.get('@posts').then((posts) => {
      cy.contains(`Showing ${posts.length} posts`);
      cy.get('[data-cy="post-item"]').should('have.length', posts.length);
      cy.get('[data-cy="post-item"]').first().then($post => {
        expect($post).to.contain(posts[0].title);
        expect($post).to.contain(posts[0].body);
        cy.wrap($post).find('a').should('have.length', 1);
      });
    });    
  });

  it('should show an error message when API returns an error', () => {
    cy.server({
      method: 'GET',
      status: 500,
      response: {}
    });
    
    cy.route('/posts', 'fixtures:posts.json');

    cy.visit('/');

    cy.contains('Sorry, there was an error fetching the list of posts. Please try again later.');
    cy.contains('No posts found'); 
  });
});