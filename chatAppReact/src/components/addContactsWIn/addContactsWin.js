import React, {useContext, useRef, useState} from 'react';
import {Button, Modal, Form, FloatingLabel} from "react-bootstrap";
import "./AddConversation.css"
import $ from "jquery";
import {idContext, UsersListApp} from "../MainFrame/MainFrame";
import {serverContext} from "../../App";


function AddContactsWin({setActiveConv, setIsAdd, isAdd}) {
    const usersList = useContext(UsersListApp)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userLogged = useContext(idContext);
    const serverUrl = useContext(serverContext)

    const User_Name = useRef("");
    const NickName = useRef("");
    const Server = useRef("");

    function AddContactToLocal() {
        const NewContact = {
            id: User_Name.current.value,
            name:NickName.current.value,
            lastMessage: null,
            last: null,
            server: Server.current.value
        }
        userLogged.contacts.push(NewContact)

        usersList.push({
            userId: User_Name.current.value,
            name: NickName.current.value,
            password: null,
            pic: null,
            contacts: [],
        })
    }

    async function SendToServer(event) {
        event.preventDefault()

        // check if the user is already in my contacts list => if is in -> do nothing and set the active conversation 
        //to be the user id
        if (userLogged.contacts.find(x => x.id === User_Name.current.value) !== undefined) {
            setActiveConv(User_Name.current.value)
            handleClose()
            return
        }
        //Add the new Contact To The local list of the User
        AddContactToLocal();

        //creat the object for the post to the server
        const inputUser = {
            "from": User_Name.current.value,
            "to": userLogged.userId,
            "server": Server.current.value,
            "name" : NickName.current.value
        }
        // serverUrl = MY server url.
        await invitation(inputUser, serverUrl); //sent post to my server to update the data
        const inputFriend = {
            "from": userLogged.userId,
            "to": User_Name.current.value,
            "server": serverUrl.substring(7)
        }

        if (isAdd) {
            setIsAdd(false)
        } else {
            setIsAdd(true)
        }
        //send post to my friend server
        invitation(inputFriend, "http://" + Server.current.value);
        handleClose()
    }

    //add the friend to my list of contact on the server
    async function invitation(input, server) {
        const output = await $.ajax({
            //sent the invitation to the friend local host
            url: server + "/api/invitations/",
            type: 'POST',
            data: JSON.stringify(input),
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


    return (
        <>
            {/*the Button on the end of the side-frame*/}
            <Button className="BoxClick" variant="secondary" onClick={handleShow}>
                <i className="bi bi-plus-circle-fill me-2 "/> Start New Conversation
            </Button>

            {/*the model that open when the button click*/}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="true"
                keyboard={false}
                className="addContactsWin "
            >
                <Modal.Header closeButton>
                    <Modal.Title>Choose friend and start a conversation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center">
                    <img className="ImageWin" src="../add-Friend.png" alt="Add Friend"/>

                    <Form className="w-50" onSubmit={SendToServer}>
                        <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="Username">
                            <Form.Control className="mb-1" type="text" placeholder="Username" ref={User_Name}/>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="Nickname">
                            <Form.Control className="mb-1" type="text" placeholder="Nickname" ref={NickName}/>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="Server">
                            <Form.Control className="mb-1" type="text" placeholder="Server" ref={Server}/>
                        </FloatingLabel>
                        <span className="d-flex justify-content-center">
                            <Button type="submit text-bold" className="w-100 "> Add Friend To Chat</Button>
                            </span>
                    </Form>

                </Modal.Body>
                <Modal.Footer className="sticky">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AddContactsWin;