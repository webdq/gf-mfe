import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventId: null, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    /**
     * We make use of the Sentry hub passed in props to report the application
     * error to the intended recipient Sentry project.
     * Note: if Sentry.init was used, it looks like they should get a copy of
     * that error in their Sentry project too (though this behaviour might only
     * be applicable in development, to be confirmed.)
     */
    this.props.hub.run((currentHub) => {
      currentHub.withScope((scope) => {
        scope.setExtras(errorInfo);
        const eventId = currentHub.captureException(error);
        this.setState({ eventId });
      });
    });
  }

  showReportDialog = () => {
    this.props.hub.run((currentHub) => {
      const client = currentHub.getClient();
      client.showReportDialog({ eventId: this.state.eventId });
    });
  };

  render() {
    if (this.state.error) {
      //render fallback UI
      return <button onClick={this.showReportDialog}>Report feedback</button>;
    }

    //when there's not an error, render children untouched
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  hub: PropTypes.object,
  children: PropTypes.any
};

export default ErrorBoundary;
