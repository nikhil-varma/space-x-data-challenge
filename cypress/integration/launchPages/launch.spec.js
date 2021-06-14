/// <reference types="cypress" />
import launch from '../../fixtures/launch.json';
import { launchRefs } from '../../../src/test-accessors/accessors';

const {
  launchImageBanner,
  launchHeader,
  launchFlightNumber,
  launchStatus,
  homeLink,
  launchesLink,
  launchItemLink,
  launchSiteName,
  launchSite,
  launchVideo,
  launchImageGallery,
} = launchRefs;

describe('Launch cards functionality', () => {
  const baseUrl = 'http://localhost:3000';
  const pageUrl = `${baseUrl}/launches/108`;

  before(() => {
    cy.visit(pageUrl);
  });

  it('should load the banner image and header detail', () => {
    cy.get(launchImageBanner).should('exist');
    cy.get(launchHeader).contains(launch.mission_name);
  });

  it('should load the flight number and launch status', () => {
    cy.get(launchFlightNumber).contains('#108');
    cy.get(launchStatus).contains('Successful');
  });

  it('should load the launch details', () => {
    cy.get(launchStatus).contains('Successful');
  });

  it('should load the breadcrumbs for the page', () => {
    cy.get(homeLink).should('exist');
    cy.get(launchesLink).should('exist');
    cy.get(launchItemLink).should('exist');
  });

  it('should have the site name navigation link', () => {
    cy.get(launchSiteName).contains(launch.launch_site.site_name);
    cy.get(launchSite).click();
    cy.url().should('include', 'launch-pads/vafb_slc_4e');
    cy.go('back');
  });

  it('should load the launch video', () => {
    cy.get(launchVideo).should('be.visible');
  });

  it('should load the launch gallery', () => {
    cy.get(launchImageGallery).should('be.visible');
  });
});
