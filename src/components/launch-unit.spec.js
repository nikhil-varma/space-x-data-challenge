/// <reference types="cypress" />
import React from 'react';
import launchData from '../../cypress/fixtures/launch.json';
import { mount } from '@cypress/react';
import { Gallery, RocketInfo, Video } from './launch';
import { launchRefs } from '../test-accessors/accessors';

const {
  launchImageGallery,
  launchVideo,
  rocketInfoComponent,
  launchRocketName,
  launchFirstStage,
  launchFirstStageStatus,
  launchSecondStage,
  launchPayload,
} = launchRefs;
describe('Launch Gallery functionality', () => {
  it('should load all images in the gallery', () => {
    mount(<Gallery images={launchData.links.flickr_images} />);
    cy.get(launchImageGallery).children().should('have.length', 6);
  });
  it('should not show anything if no images are provided', () => {
    mount(<Gallery />);
    cy.get(launchImageGallery).should('be.hidden');
  });
});

describe('Video component functionality', () => {
  it('should load the video component', () => {
    mount(<Video launch={launchData} />);
    cy.get(launchVideo).should('be.visible');
  });
});

describe('RocketInfo component functionality', () => {
  beforeEach(() => {
    mount(<RocketInfo launch={launchData} />);
  });

  it('should load the RocketInfo component', () => {
    cy.get(rocketInfoComponent).should('be.visible');
  });

  it('should show the rocket name and stage information', () => {
    cy.get(launchRocketName).contains(launchData.rocket.rocket_name);
    cy.get(launchFirstStage).contains(
      launchData.rocket.first_stage.cores[0].core_serial,
    );
    cy.get(launchFirstStageStatus).contains('Recovered');
    cy.get(launchSecondStage).contains(
      `Block ${launchData.rocket.first_stage.cores[0].block}`,
    );
    cy.get(launchPayload).contains(
      `Payload: ${launchData.rocket.second_stage.payloads[0].payload_type}`,
    );
  });
});
