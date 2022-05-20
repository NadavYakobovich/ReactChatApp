import React, {useContext} from 'react';
import {Conversation, idContext} from "../../MainFrame/MainFrame";
import {usersContext} from "../../../App";
import {Image, ListGroup} from "react-bootstrap";
import "../AddConversation.css"
import "./AvailableContactList.css"


function AvailableContactList({activeConv, setActiveConv, handleClose}) {

    const CurrentUser = useContext(idContext);//the current user ged in
    const usersMaps = useContext(usersContext)//contain all the userInfo
    const conversationMap = useContext(Conversation) // contain all the conversation data

    function check(id) {
        return activeConv === id
    }

    function HandelClick(contact) {
        let id;
        id = CurrentUser.contacts.filter(friend => friend.id === contact.userId)
        if (id.length !== 0) {
            // the user is already hase a conversation with me
            setActiveConv(id[0].id)
            //close the windows
            handleClose();
        } else {
            //need to start a new conversation -> add the conversation to the current user
            CurrentUser.contacts.push({id: contact.userId, lastMessage: ""})
            const NewConversation = {
                "id1": CurrentUser.userId,
                "id2": contact.userId,
                "content": []
            }
            // add the new contact between the two
            contact.contacts.push({id: CurrentUser.userId, lastMessage: ""})
            conversationMap.push(NewConversation)
            setActiveConv(contact.userId)
            //close the windows
            handleClose();
        }
    }

    return (
        <div className="availableList overflow-auto">
            <ListGroup as="ol" numbered variant="flush">
                {/*Shows all users who are in the system data except the user himself who is currently connected to the system*/}
                 {usersMaps.map(contact => (contact.userId === CurrentUser.userId ? " " :
                        <ListGroup.Item key={contact.userId + "key"} action
                                        className="border list_contacts"
                                        onClick={() => HandelClick(contact)}
                                        active={check(contact.userId)}>
                            <div className="d-flex">
                                <Image className="profileListContact me-2" src={contact.pic} roundedCircle="true" fluid/>
                                <div className="d-flex align-items-center"> <span>{contact.name}</span> </div>
                            </div>

                        </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default AvailableContactList;