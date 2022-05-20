import React from 'react';

const Loading = ({text}) => {
    return (
        <div className="text-left">
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <strong> {text} </strong>
        </div>
    );
};

export default Loading;