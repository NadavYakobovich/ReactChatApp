import React, {useContext, useEffect} from 'react';
import {Col, Image, ListGroup, Row} from "react-bootstrap";
import {idContext, UsersListApp} from "../MainFrame/MainFrame";
import {usersContext} from "../../App";
import "./Myconversation.css"
import {tokenContext} from "../../App";
import {Navigate} from "react-router-dom";
import $ from 'jquery';


function MyConversation({activeConv, setActiveConv, searchQuery}) {
    //userLogged - is the user objects that logged in
    const userLogged = useContext(idContext);
    //const usersMaps = useContext(usersContext)
    //const conversationMap = useContext(Conversation)
    const token = useContext(tokenContext)
    var idFriend = null;
    var response;
    const userslist = useContext(UsersListApp);
    

    //get the id and return the user object from json that have that id
    function getUser(idUser) {
        const res = userslist.find(user => user.userId === idUser);
        return res
    }

    function sortedContacts(contactsList){
        contactsList.sort(function compare(a, b) {
            //creat from the json date , JS date object
            const dateA = new Date(a.lastMessage);
            const dateB = new Date(b.lastMessage);
            return dateB - dateA;
        });
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //Returns the display format of the last time the message was sent
    function TimeMessage (date){
        const dateJs = new Date(date); //converse from json to js objects
        const min = (dateJs.getMinutes() < 10 ? '0' : '') + dateJs.getMinutes();
        const timeDay =[dateJs.getDate(),dateJs.getMonth() + 1, dateJs.getFullYear()].join('/');
        return dateJs.getHours() + ":" + min + " " + timeDay;
    }

    function lastMessage(friend) {
        return userLogged.contacts.filter(x => x.id === friend.userId);
        // let conv = conversationMap.filter(conv => (((conv.id1 === userLogged.userId && conv.id2 === friend.userId) ||
        //             (conv.id1 === friend.userId && conv.id2 === userLogged.userId))
        //     )
        // )
        // if (conv[0].content.length !== 0) {
        //     return conv[0].content[conv[0].content.length - 1]
        // } else {
        //     return null
        // }
    }

    function lastMessageContent(mess) {
        if (mess === null)
            return;
        //if the last message was image
        if (mess.type === "img1" || mess.type === "img2") {
            return (
                    <i className="bi bi-camera-fill"> Image...</i>
                );
        }
        //if the last message was a video
        if (mess.type === "vid1" || mess.type === "vid2") {
            return (
                <i className="bi bi-camera-video-fill"> Video...</i>
            );
        }
        //if the last message was a recording
        if (mess.type === "rec") {
            return (
                <i className="bi bi-mic-fill"> Voice Message...</i>
            );
        }
        //the last message was text
        return mess.message;
    }

    function check(id) {
        return activeConv === id
    }

    //return a list of listItem of the user friend that contain the user Search string
    function searchList(userLogged) {
        //need to add until check
        sortedContacts(userLogged.contacts)
        return (userLogged.contacts.map(contact => {
                const friend = getUser(contact.id)
                if (friend.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return (
                            <ListGroup.Item key={friend.userId + "List_key"} action
                                            className="border"
                                            onClick={() => setActiveConv(friend.userId)}
                                            active={check(friend.userId)}>
                                {friendInfo(friend,contact)}
                            </ListGroup.Item>
                        )
                    }
                }
            )
        )
    }
    //get a friend objects and return a listGrop-Item contain his name + his pic for the side-frame
    function friendInfo(friend,friendContact) {
         let mess = friendContact.last
        // let content = lastMessageContent(mess);
        return (
            <div>
                <div fluid="true">
                    {/*the profile pic*/}
                    {/*when the screen is small the image set to none*/}
                    <Col className=" col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-2  justify-content-center d-none d-md-block"> <Image className="friendPic" src={"./profilePic/faceImageExmple.png"}
                                                                           roundedCircle="true"
                                                                           /></Col>
                    {/*the name and the pic*/}
                    <Col className="col friendName">
                        {/*the name of the friend */}
                        <Row> {friend.name} </Row>
                        <Row fluid="true">
                            {/*the last message + time */}
                            {/*<Col className="col-6 lastMessage"> {mess !== null ? content : ""} </Col>*/}
                            <Col className="col-6 lastMessage"> {mess !== null ? mess : ""} </Col>

                            <Col className="lastMessage text-end"> {mess !== null ? TimeMessage(friendContact.lastMessage) : ""}</Col>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }


    return (
        <ListGroup as="ol" numbered variant="flush" key={"key"}>
            <>
                {searchList(userLogged)}
            </>
        </ListGroup>
    );
}


export default MyConversation;