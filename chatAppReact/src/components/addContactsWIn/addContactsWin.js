import React, {useRef, useState} from 'react';
import {Button, Modal, Form, FloatingLabel} from "react-bootstrap";
import "./AddConversation.css"
import AvailableContactList from "./AvailableContactList/AvailableContactList";

function AddContactsWin({activeConv, setActiveConv}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const User_Name = useRef("");
    const NickName = useRef("");
    const Server = useRef("");


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
                backdrop="static"
                keyboard={false}
                className="addContactsWin "
            >
                <Modal.Header closeButton>
                    <Modal.Title>Choose friend and start a conversation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center">
                    <img className="ImageWin" src="../add-Friend.png" alt="Add Friend"/>

                    <Form className="w-50">
                        <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="User Name">
                            <Form.Control className="mb-1" type="text" placeholder="User Name" ref={User_Name}/>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="Nickname">
                            <Form.Control className="mb-1" type="text" placeholder="Nickname" ref={NickName}/>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="Server">
                            <Form.Control className="mb-1" type="text" placeholder="Server" ref={User_Name}/>
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