import React, {useContext, useRef, useState} from 'react';
import {FormControl} from "react-bootstrap";
import "./inputMessage.css"
import $ from 'jquery';
import {idContext} from "../MainFrame/MainFrame";


import AddFileModal from "./AddFileModal";
import DropDownItem from "./DropDownItem";

function InputMessage({isSend, setIsSend, activeconv, user, messageList}) {

    const [modalShow, setModalShow] = useState(false);
    const [selection, setSelection] = useState(null);
    const userLogged = useContext(idContext);

    const messRef = useRef(null);


    //update the last  message Time in the user contacts list
    function updateLastContact(date , mess) {
        console.log("**** the time***")
        console.log(date)
        let contactUser = userLogged.contacts.find(contact => contact.id === activeconv)
        contactUser.lastMessage = date
        contactUser.last = mess


    }
    
    function getLastId(){
        return  Math.max(...messageList.map(o => o.id)) +1 
    }

    //creat new message and return a message objects
    function newMessage(input) {
        let mess;
        const date = new Date().toJSON()
        mess ={
            "id": getLastId(),
            "content": input,
            "created" : date,
            "sent": true
        }
        return mess
    }

    function updateData(data) {
        selection.data = data;
    }

    // function newFile() {
    //     //no file has been selected
    //     if (!selection.hasOwnProperty('data'))
    //         return;
    //     let message;
    //     if (['img1', 'img2', 'vid1', 'vid2', 'rec'].includes(selection.type)) {
    //         message = newMessage(selection.type, selection.data);
    //     } else {
    //         return;
    //     }
    //     submitHandler(null, message);
    //     setSelection(null);
    // }

    //get all the user from the server
    async function SentMessage(Input) {
        const output = await $.ajax({
            url: 'http://localhost:5125/api/contacts/' +activeconv +'/messages?content=' +Input,
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
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
    }


    function submitHandler(e, message) {
        if (e !== null)
            e.preventDefault();

        //if the user not enter any message-text but click send, the app not sent anything
        if (message.content.length === 0 ) {
            return
        }
        messageList.push(message)
        SentMessage(message.content)
        console.log(message)
        updateLastContact(message.created,message.content)
        //update the useState to render the page immediately after sending the message
        if (isSend === true)
            setIsSend(false)
        else
            setIsSend(true)
    }

    return (
        <form className="d-flex mainInputWin" onSubmit={(event) => {
            submitHandler(event, newMessage( messRef.current.value))
            messRef.current.value = '';
        }}>
            {/*<div className="dropdown  icons-Input-WIn ">*/}
            {/*    <button className="  dropdownMenuIcon d-flex " type="button" id="dropdownMenuButton1"*/}
            {/*            data-bs-toggle="dropdown" aria-expanded="false">*/}
            
            {/*        <i className="icons-Input-WIn bi bi-paperclip hoverEffect "></i>*/}
            {/*    </button>*/}
            {/*    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">*/}
            {/*        <DropDownItem opt={1} action={() => $('#imgInput').click()}/>*/}
            {/*    */}
            {/*        <DropDownItem opt={2} action={() => $('#vidInput').click()}/>*/}
            {/*    */}
            {/*        <DropDownItem opt={3} action={() => {*/}
            {/*            let img2 = {type: "img2"}*/}
            {/*            setSelection(img2)*/}
            {/*            setModalShow(true)*/}
            {/*        }}/>*/}
            {/*    */}
            {/*        <DropDownItem opt={4} action={() => {*/}
            {/*            let vid2 = {type: "vid2"}*/}
            {/*            setSelection(vid2)*/}
            {/*            setModalShow(true)*/}
            {/*        }}/>*/}
            
            {/*    </ul>*/}
            {/*</div>*/}

            {/*the text area for the message*/}
            <FormControl className="TextPlace InputFocus ms-2" ref={messRef} type="text"/>

            {/*the right icons*/}
            {/*<i className="bi bi-mic icons-Input-WIn record hoverEffect" aria-hidden="true" onClick={() => {*/}
            {/*    let rec = {type: "rec"}*/}
            {/*    setSelection(rec)*/}
            {/*    setModalShow(true)*/}
            {/*}}/>*/}

            <button type="submit" className="send icons-Input-WIn hoverEffect ">
                <i className="bi bi-send Round "/>
            </button>

            {/*<input type='file' id='imgInput' ref={inputImage} accept={"image/*"}*/}
            {/*       onChange={(event) => {*/}
            {/*           if (event.target.files[0] === undefined)*/}
            {/*               return*/}
            {/*           let image = {*/}
            {/*               type: "img1",*/}
            {/*               data: event.target.files[0]*/}
            {/*           }*/}
            {/*           setSelection(image)*/}
            {/*           setModalShow(true)*/}
            {/*           event.target.value = ''*/}
            {/*       }}*/}
            {/*       style={{display: 'none'}}/>*/}

            {/*<input type='file' id='vidInput' ref={inputVideo} accept={"video/*"}*/}
            {/*       onChange={(event) => {*/}
            {/*           if (event.target.files[0] === undefined)*/}
            {/*               return*/}
            {/*           let video = {*/}
            {/*               type: "vid1",*/}
            {/*               data: event.target.files[0]*/}
            {/*           }*/}
            {/*           setSelection(video)*/}
            {/*           setModalShow(true)*/}
            {/*           event.target.value = ''*/}
            {/*       }}*/}
            {/*       style={{display: 'none'}}/>*/}
            
            {/*<AddFileModal file={selection} setModalShow={setModalShow} modalShow={modalShow} addFile={newFile}*/}
            {/*              updateData={updateData}/>*/}

        </form>
    );
}

export default InputMessage;