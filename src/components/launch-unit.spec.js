/// <reference types="cypress" />
import React from 'react';
import launchData from '../../cypress/fixtures/launch.json';
import { mount } from '@cypress/react';
import { format as timeAgo } from 'timeago.js';
import { Gallery, Header, RocketInfo, TimeAndLocation, Video } from './launch';
import { formatDateTime } from '../utils/format-date';

describe('Launch Gallery functionality', () => {
  it('should load all images in the gallery', () => {
    mount(<Gallery images={launchData.links.flickr_images} />);
    cy.get('[data-testid=launchImageGallery]')
      .children()
      .should('have.length', 6);
  });
  it('should not show anything if no images are provided', () => {
    mount(<Gallery />);
    cy.get('[data-testid=launchImageGallery]').should('be.hidden');
  });
});

describe('Video component functionality', () => {
  it('should load the video component', () => {
    mount(<Video launch={launchData} />);
    cy.get('[data-testid=launchVideo]').should('be.visible');
  });
});

describe('RocketInfo component functionality', () => {
  beforeEach(() => {
    mount(<RocketInfo launch={launchData} />);
  });

  it('should load the RocketInfo component', () => {
    cy.get('[data-testid=rocketInfoComponent]').should('be.visible');
  });

  it('should show the rocket name and stage information', () => {
    cy.get('[data-testid=launchRocketName]').contains('Falcon 9');
    cy.get('[data-testid=launchFirstStage]').contains('B1063');
    cy.get('[data-testid=launchFirstStageStatus]').contains('Recovered');
    cy.get('[data-testid=launchSecondStage]').contains('Block 5');
    cy.get('[data-testid=launchPayload]').contains('Payload: Satellite');
  });
});

describe.skip('Header component functionality', () => {
  it('should load component', () => {
    mount(<Header launch={launchData} />);
  });
});

describe.skip('TimeAndLocation component functionality', () => {
  beforeEach(() => {
    mount(<TimeAndLocation launch={launchData} />);
  });
  it('should load the component', () => {
    cy.get('[data-testid=timeAndLocationComponent]').should('be.visible');
  });

  it('should show the date and help text', () => {
    cy.get('[data-testid=launchDate]').contains(
      formatDateTime(launchData.launch_date_local),
    );
    cy.get('[data-testid=launchDateHelptext]').contains(
      timeAgo(launchData.launch_date_utc),
    );
  });
});
