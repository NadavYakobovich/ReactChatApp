import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import "./AddConversation.css"
import AvailableContactList from "./AvailableContactList/AvailableContactList";

    function AddContactsWin({activeConv, setActiveConv}) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

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
                    <Modal.Body >
                       <AvailableContactList activeConv={activeConv} setActiveConv={setActiveConv} handleClose={handleClose}/>
                    </Modal.Body>
                    <Modal.Footer  className="sticky">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


export default AddContactsWin;