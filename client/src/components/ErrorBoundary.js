import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.error)
            return (
                <div className="alert alert-danger" role="alert">
                    <i className="fas fa-grin-beam-sweat fa-7x float-right"></i>
                    <h4 className="alert-heading mb-5">Something went wrong</h4>
                    <h5>Error message</h5>
                    <p>{this.state.error.message}</p>
                    <hr />
                    <h5>Stack message</h5>
                    <p>{this.state.error.stack}</p>
                    <hr />
                    <h5>Stack</h5>
                    <p style={{whiteSpace: "pre-wrap"}}>{this.state.errorInfo.componentStack}</p>
                </div>
            );

        return this.props.children;
    }
}

export default ErrorBoundary;