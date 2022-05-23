import React, {useContext, useEffect, useState} from 'react';
import "./ConversationPage.css"
import {Conversation, idContext,UsersListApp} from "../MainFrame/MainFrame";
import {Container, Image, Row} from "react-bootstrap";
import {usersContext,tokenContext} from "../../App";
import InputMessage from "./inputMessage";
import ShowMessage from "./ShowMessage";
import $ from "jquery";

//the active activeConv contain the id of the user that the conv open now
function ConversationPage({activeConv, setConversation, isSend, setIsSend}) {
    const User = useContext(idContext);
    // const usersMaps = useContext(usersContext)
    const usersMaps = useContext(UsersListApp)
    const conversationMap = useContext(Conversation)
    const token = useContext(tokenContext)
    // friendConv - contain a list of content of the messages with the activeConv
    const [friendConv, setFriendCov] = useState(null)
    
    //same as timee message but show the date as 12/04/2022
    function TimeLastSeen() {
        //get the last time of the  message from the friend (his id is activeUser)  
        const date = User.contacts.find(x=> x.id === activeConv).lastMessage
        const dateJs = new Date(date); //converse from json to js objects
        const min = (dateJs.getMinutes() < 10 ? '0' : '') + dateJs.getMinutes();
        const timeDay = [dateJs.getDate(), dateJs.getMonth() + 1, dateJs.getFullYear()].join('/');
        return dateJs.getHours() + ":" + min + " " + timeDay;
    }

    // function getCov(idUser1, idUser2) {
    //     const index = conversationMap.findIndex(conv => (conv.id1 === idUser1 && conv.id2 === idUser2) ||
    //         (conv.id1 === idUser2 && conv.id2 === idUser1));
    //     return conversationMap[index];
    // }
    
    function getCov(loggedUser, FriendUser){
        
    }

    //get all the user from the server
    async function getFriendConv() {
        const output = await $.ajax({
            url: 'http://localhost:5125/api/contacts/' +activeConv +'/messages',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token.value);
            },
            data: {},
            success: function (data) {
                return data;
            },
            error: function () {
            },
        }).then((data) => {
            return data;
        });
        const Conv = await output;
        setFriendCov(Conv);
    }


    
    
    //get the name of the friend that the conversation is in
    function getUserFriend(idUser) {
        const index = usersMaps.findIndex(user => user.userId === idUser);
        return usersMaps[index];
    }

    let friend = null
    if (activeConv != null ) {
        //getFriendConv()
         friend = getUserFriend(activeConv)
    }
    useEffect(()=> {
        if (activeConv !== null) {
            getFriendConv();
        }

    }, [activeConv])
   
    //get the select user conversation
    // let messageList = []
    // if (activeConv != null) {
    //     //get the list contain the message objects
    //     getFriendConv(activeConv);
    //     messageList =  friendConv;
    // }

    //wait to get the data from the server
    if (friendConv == null || activeConv == null){
        return
    }
    
    return (

        <div className="main d-flex flex-column">
            {/*the top name */}
            <Container className="text-center p-1 conversation-header d-flex">
                {activeConv != null  ?
                    <Image className="picHeader" src={"./profilePic/faceImageExmple.png"} roundedCircle="true" fluid="true"/> : ""}
                <Row className="mb-1 ms-1">
                    <Row className="d-flex justify-content-end"><span
                        className="NameFriend text-start"> {activeConv != null ? friend.name : ""}</span></Row>
                    <Row>
                        <span className="text-muted lastSeen text-start fw-light">
                            {activeConv != null  ? ("last seen  " + TimeLastSeen() ): ""}
                        </span>
                    </Row>
                </Row>
            </Container>
            {/*the message window*/}
            <div
                className="scroller d-flex flex-grow-1 align-items-start flex-column overflow-auto flex-column-reverse pe-2 ps-2">
            
                {/*this span goal is to fill the free gap from the last message to the input bar*/}
                <span className="flex-grow-1"/>
                {
                    //The messages are delivered in reverse in order to keep the scrolling permanently close to the last message in the conversation
                    friendConv.slice(0).reverse().map((mess, index) => {
                        return (
                            <ShowMessage key={index} User={User} mess={mess} />
                        );
                    })
                }
            </div>
            {/*the input bar*/}
            {activeConv != null ?
                <InputMessage isSend={isSend} setIsSend={setIsSend} activeconv={activeConv} user={User}
                              messageList={friendConv}/> : ""}
        </div>

    )
}

export default ConversationPage;