/// <reference types="cypress" />

describe('Launch cards functionality', () => {
  const baseUrl = 'http://localhost:3000';
  const pageUrl = `${baseUrl}/launches/108`;

  before(() => {
    cy.visit(pageUrl);
  });

  it('should load the banner image and header detail', () => {
    cy.get('[data-testid=launchImageBanner]').should('exist');
    cy.get('[data-testid=launchHeader]').contains(
      'Sentinel-6 Michael Freilich',
    );
  });

  it('should load the flight number and launch status', () => {
    cy.get('[data-testid=launchFlightNumber]').contains('#108');
    cy.get('[data-testid=launchStatus]').contains('Successful');
  });

  it('should load the launch details', () => {
    cy.get('[data-testid=launchStatus]').contains('Successful');
  });

  it('should load the breadcrumbs for the page', () => {
    cy.get('[data-testid=homeLink]').should('exist');
    cy.get('[data-testid=launchesLink]').should('exist');
    cy.get('[data-testid=launchItemLink]').should('exist');
  });

  it('should have the site name navigation link', () => {
    cy.get('[data-testid=launchSiteName]').contains('VAFB SLC 4E');
    cy.get('[data-testid=launchSite]').click();
    cy.url().should('include', 'launch-pads/vafb_slc_4e');
    cy.go('back');
  });

  it('should load rocket info', () => {
    cy.get('[data-testid=launchRocketName]').contains('Falcon 9');
    cy.get('[data-testid=launchFirstStage]').contains('B1063');
    cy.get('[data-testid=launchFirstStageStatus]').contains('Recovered');
    cy.get('[data-testid=launchSecondStage]').contains('Block 5');
    cy.get('[data-testid=launchPayload]').contains('Payload: Satellite');
  });

  it('should load the launch video', () => {
    cy.get('[data-testid=launchVideo').should('be.visible');
  });

  it('should load the launch gallery', () => {
    cy.get('[data-testid=launchImageGallery').should('be.visible');
  });
});
