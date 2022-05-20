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

    if (mess.type === "text") {
        return (
            <div
                 className={` shadow-sm m-2 p-2 messageWin TextMessageWidth ${mess.from === User.userId ? " ms-auto myConv" : "friendConv text-black"}`}>
                <div>{mess.message}  </div>
                <Row className="timeSpan"> <span
                    className="text-secondary"> {TimeMessage(mess.time)} </span></Row>
            </div>
        )
    } else if (mess.type === "img1" || mess.type === "img2") {
        return (
            <div
                 className={`imgMsg shadow-sm m-2 p-2 messageWin  ${mess.from === User.userId ? "ms-auto myConv" : "friendConv text-black"}`}>
                <Row className="imgMsg">
                    <ShowImage image={mess.message} size={"25"}/>
                </Row>
                <Row className="timeSpan mt-1"> <span
                    className="text-secondary"> {TimeMessage(mess.time)} </span></Row>
            </div>
        )
    }else if (mess.type === "vid1" || mess.type === "vid2") {
        return (
            <div
                 className={`imgMsg shadow-sm m-2 p-2 messageWin ${mess.from === User.userId ? "ms-auto myConv" : "friendConv text-black"}`}>
                <ShowVideo video={mess.message} size={"chatVid"}/>
                <Row className="timeSpan"> <span
                    className="text-secondary"> {TimeMessage(mess.time)} </span></Row>
            </div>
        )
    } else if (mess.type === "rec") {
        return (
            <div
                 className={`imgMsg shadow-sm m-2 p-2 messageWin ${mess.from === User.userId ? "ms-auto myConv" : "friendConv text-black"}`}>
                <audio className={"chatAudio"} src={mess.message} controls/>
                <Row className="timeSpan"> <span
                    className="text-secondary"> {TimeMessage(mess.time)} </span></Row>
            </div>
        )
    }
};

export default ShowMessage;