let hub;
const fn = (error) => {
  hub.run((currentHub) => {
    currentHub.withScope(() => {
      currentHub.captureException(error);
    });
  });
};

export function addErrorHandler(appHub) {
  hub = appHub;
  window.addEventListener('error', fn);
  window.addEventListener('unhandledrejection', fn);
}

export function removeErrorHandler() {
  window.removeEventListener('error', fn);
  window.removeEventListener('unhandledrejection', fn);
}
