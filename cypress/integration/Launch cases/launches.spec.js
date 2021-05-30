/// <reference types="cypress" />

describe('Launches Page functionality', () => {
  const baseUrl = 'http://localhost:3000';
  const pageUrl = `${baseUrl}/launches`;
  before(() => {
    cy.visit(pageUrl);
  });

  it('should load the launches page properly assuming the API works', () => {
    cy.get('[data-testid=errorMessage]').should('not.exist');
  });

  it('should show more button at the end of the launches list', () => {
    cy.get('[data-testid=loadMoreButton]').should('exist');
  });

  it('should display breadcrumbs in the right order', () => {
    cy.get('[data-testid=homeLink]').should('exist');
    cy.get('[data-testid=launchesLink]').should('exist');
  });

  it('should load the next page for the launch items', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('[data-testid=loadMoreButton]').click();
    cy.get('[data-testid=launchItems]').find('a').should('have.length', 24);
  });

  it('should nagivate to launch item page', () => {
    cy.get('[data-testid=launchItems]').find('a:first').click();
    cy.url().should('include', '/launches');
    cy.go('back');
  });
});
