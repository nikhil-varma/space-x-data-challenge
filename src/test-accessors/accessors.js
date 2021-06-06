const getAccessor = (ref) => `[data-testid=${ref}]`;

export const launchesRefs = {
  launchItems: getAccessor('launchItems'),
  loadMoreButton: getAccessor('loadMoreButton'),
};

export const launchRefs = {
  launchImageBanner: getAccessor('launchImageBanner'),
  launchHeader: getAccessor('launchHeader'),
  launchFlightNumber: getAccessor('launchFlightNumber'),
  launchStatus: getAccessor('launchStatus'),
  homeLink: getAccessor('homeLink'),
  launchesLink: getAccessor('launchesLink'),
  launchItemLink: getAccessor('launchItemLink'),
  launchSiteName: getAccessor('launchSiteName'),
  launchSite: getAccessor('launchSite'),
  launchRocketName: getAccessor('launchRocketName'),
  launchFirstStage: getAccessor('launchFirstStage'),
  launchFirstStageStatus: getAccessor('launchFirstStageStatus'),
  launchSecondStage: getAccessor('launchSecondStage'),
  launchPayload: getAccessor('launchPayload'),
  launchVideo: getAccessor('launchVideo'),
  launchImageGallery: getAccessor('launchImageGallery'),
  rocketInfoComponent: getAccessor('rocketInfoComponent'),
};

export const breadcrumbsRefs = {
  homeLink: getAccessor('homeLink'),
  launchesLink: getAccessor('launchesLink'),
  launchItemLink: getAccessor('launchItemLink'),
};

export const errorRefs = {
  error: getAccessor('errorMessage'),
};
