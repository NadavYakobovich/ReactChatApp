import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import img_icon from "../../database/icons/upload-img.png";
import rec_icon from "../../database/icons/upload-vid.png";

const DropDownItem = ({opt, action}) => {

    function ToolTipMsg() {
        if (opt === 1) {
            return (
                <>
                    Upload <strong>image</strong>
                </>
            )
        } else if (opt === 2) {
            return (
                <>
                    Upload <strong>video</strong>
                </>
            )
        } else if (opt === 3) {
            return (
                <>
                    Take a <strong>picture</strong>
                </>
            )
        } else if (opt === 4) {
            return (
                <>
                    Record a <strong>video</strong>
                </>
            )
        }
    }

    function ItemIcon() {
        if (opt === 1) {
            return (
                <img alt="image" className="uploadMenu pic-fix" src={img_icon}/>
            )
        } else if (opt === 2) {
            return (
                <img alt="video" className="uploadMenu pic-fix2" src={rec_icon}/>
            )
        } else if (opt === 3) {
            return (
                <i className="uploadMenu bi bi-camera-fill"/>
            )
        } else if (opt === 4) {
            return (
                <i className="uploadMenu bi bi-camera-video-fill"/>
            )
        }
    }

    return (
        <OverlayTrigger rootClose key={opt} placement="top" overlay={
            <Tooltip id={"tooltip-top"}>
                <ToolTipMsg/>
            </Tooltip>}>
                <li>
                    <a className="dropdown-item" onClick={action}>
                        <ItemIcon/>
                    </a>
                </li>
        </OverlayTrigger>
    );
};

export default DropDownItem;