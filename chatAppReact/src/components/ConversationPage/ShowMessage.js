import React from 'react';
import {Row} from "react-bootstrap";
import ShowImage from "../form/ShowImage";
import ShowVideo from "../form/ShowVideo";
import {logDOM} from "@testing-library/react";

const ShowMessage = ({User, mess}) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function TimeMessage(date) {
        const dateJs = new Date(date);
        const min = (dateJs.getMinutes() < 10 ? '0' : '') + dateJs.getMinutes();
        return dateJs.getHours() + ":" + min + " " + days[dateJs.getDay()];
    }

        return (
            <div
                 className={` shadow-sm m-2 p-2 messageWin TextMessageWidth ${mess.sent === true ? " ms-auto myConv" : "friendConv text-black"}`}>
                <div>{mess.content}  </div>
                <Row className="timeSpan"> <span
                    className="text-secondary"> {TimeMessage(mess.created)} </span></Row>
            </div>
        )
};

export default ShowMessage;