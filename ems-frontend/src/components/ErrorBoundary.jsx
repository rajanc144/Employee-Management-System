import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center py-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-danger mb-4">Something went wrong</h2>
              <p className="text-muted mb-3">
                An unexpected error has occurred. Please try refreshing the page.
              </p>
              <p className="text-muted">
                Error details: {this.state.error?.message || 'Unknown error'}
              </p>
              <button
                className="btn btn-primary mt-3"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;