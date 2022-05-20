import React from 'react';
import $ from "jquery";
const ValidPic = ({validInfo, info}) => {
    if (validInfo !== null  && validInfo !== undefined && validInfo.current !== null) {
        $('#missingPic').addClass('d-none')
        return (
            <span id={"validPic"} className={"valid"}>
                {info}
            </span>
        );
    }
};

export default ValidPic;