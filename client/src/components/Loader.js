import React from 'react';

class Loader extends React.Component {
    render() {
        return (
            <div className="w-100 text-left">
                <div className="spinner-grow text-secondary " role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    };
}

export default Loader;