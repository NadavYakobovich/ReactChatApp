import React from 'react';

const ShowImage = ({image, size}) => {
    let source;
    if (image !== null && image !== undefined && image.current !== null) {

        if (image instanceof File) {
            source = URL.createObjectURL(image);
        } else {
            source = image;
        }

        return (
            <span>
                    <img id="picPreview" alt="not found" width={size + "%"} src={source}/>
            </span>
        );
    }
};

export default ShowImage;