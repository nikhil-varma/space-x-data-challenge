/// <reference types="cypress" />

import {
  launchesRefs,
  breadcrumbsRefs,
  errorRefs,
} from '../../../src/test-accessors/accessors';
const click = (el) => el.click();
const { launchItems, loadMoreButton } = launchesRefs;
const { homeLink, launchesLink } = breadcrumbsRefs;
const { error } = errorRefs;

describe('Launches Page functionality', () => {
  const baseUrl = 'http://localhost:3000';
  const pageUrl = `${baseUrl}/launches`;

  before(() => {
    cy.visit(pageUrl);
  });

  it('should load the launches page properly assuming the API works', () => {
    cy.get(error).should('not.exist');
  });

  it('should show more button at the end of the launches list', () => {
    cy.get(loadMoreButton).should('exist');
  });

  it('should display breadcrumbs in the right order', () => {
    cy.get(homeLink).should('exist');
    cy.get(launchesLink).should('exist');
  });

  it('should load the next page for the launch items', () => {
    cy.get('button[type="button"]')
      .should('be.visible')
      .get(loadMoreButton)
      .pipe(click)
      .then(() => {
        cy.get(launchItems).find('a').should('have.length', 24);
      });
  });

  it('should nagivate to launch item page', () => {
    cy.get(launchItems).find('a:first').click();
    cy.url().should('include', '/launches');
    cy.go('back');
  });
});
