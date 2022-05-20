import React from 'react';

const ShowVideo = ({video, size}) => {
    let source;
    if (video !== null && video !== undefined && video.current !== null) {
        if (video instanceof File){
            source = URL.createObjectURL(video);
        } else {
            source = video;
        }
        return (
            <span>
                <video id={size} src={source} controls/>
            </span>
        );
    }
};

export default ShowVideo;