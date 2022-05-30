import React, {useContext, useRef, useState} from 'react';
import {FormControl} from "react-bootstrap";
import "./inputMessage.css"
import $ from 'jquery';
import {idContext} from "../MainFrame/MainFrame";


import AddFileModal from "./AddFileModal";
import DropDownItem from "./DropDownItem";

function InputMessage({isSend, setIsSend, activeconv, messageList, connection}) {

    const [modalShow, setModalShow] = useState(false);
    const [selection, setSelection] = useState(null);
    const userLogged = useContext(idContext);

    const messRef = useRef(null);


    //update the last  message Time in the user contacts list
    function updateLastContact(date, mess) {
        let contactUser = userLogged.contacts.find(contact => contact.id === activeconv)
        contactUser.lastMessage = date
        contactUser.last = mess
    }

    function getLastId() {
        return Math.max(...messageList.map(o => o.id)) + 1
    }

    //creat new message and return a message objects
    function newMessage(input) {
        let mess;
        const date = new Date().toJSON()
        mess = {
            "id": getLastId(),
            "content": input,
            "created": date,
            "sent": true
        }
        return mess
    }

    function updateData(data) {
        selection.data = data;
    }

    function getFriendServer(friend){
        let contactUser = userLogged.contacts.find(contact => contact.id === activeconv)
        return contactUser.server
    }

    async function SentMesToFriendServer(Input) {
        const content = {from:userLogged.userId,to:activeconv,Content: Input}
        const output = await $.ajax({
            url: 'http://' + getFriendServer(activeconv) +'/api/contacts/' + activeconv + '/messages',
            type: 'POST',
            data: JSON.stringify(content),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
            },
            success: function (data) {
                return data;
            },
            error: function () {
            },
        }).then((data) => {
            return data;
        });
    }
    async function SentMesToMySrver(Input) {
        const content = {Content: Input}
        const output = await $.ajax({
            url: 'http://localhost:5125/api/contacts/' + activeconv + '/messages',
            type: 'POST',
            data: JSON.stringify(content),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
            },
            success: function (data) {
                return data;
            },
            error: function () {
            },
        }).then((data) => {
            return data;
        });
    }


    async function sendMessage(message) {
        try{
            await connection.invoke("SendMessage", userLogged.userId ,message.content, message.created);
        }catch (e) {
            console.log(e)
        }
    }
    
    function submitHandler(e, message) {
        if (e !== null)
            e.preventDefault();

        //if the user not enter any message-text but click send, the app not sent anything
        if (message.content.length === 0) {
            return
        }
        sendMessage(message)
        messageList.push(message)
        SentMesToMySrver(message.content)
        SentMesToFriendServer(message.content)
        console.log(message)
        updateLastContact(message.created, message.content)
        //update the useState to render the page immediately after sending the message
        if (isSend === true)
            setIsSend(false)
        else
            setIsSend(true)
    }

    return (
        <form className="d-flex mainInputWin" onSubmit={(event) => {
            submitHandler(event, newMessage(messRef.current.value))
            messRef.current.value = '';
        }}>

            {/*the text area for the message*/}
            <FormControl className="TextPlace InputFocus ms-2" ref={messRef} type="text"/>
            <button type="submit" className="send icons-Input-WIn hoverEffect ">
                <i className="bi bi-send Round "/>
            </button>
            

        </form>
    );
}

export default InputMessage;