import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function withErrorBoundary(Component, sentryHub) {
  return function ErrorBoundaryWrap() {
    return (
      <ErrorBoundary hub={sentryHub}>
        <Component />
      </ErrorBoundary>
    );
  };
}
