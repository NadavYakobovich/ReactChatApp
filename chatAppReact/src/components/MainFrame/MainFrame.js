import React, {useContext, useState} from 'react';
import SideFrame from "../SideFrame/SideFrame";
import ConversationPage from "../ConversationPage/ConversationPage";
import conversation from "../../database/conversation.json"
import {usersContext} from "../../App";
import {Navigate} from "react-router-dom";

export const idContext = React.createContext()
export const Conversation = React.createContext()

function MainFrame({userId}) {

    let conversationMap = conversation.conversation
    const usersMaps = useContext(usersContext)

    function getUser(idUser) {
        const index = usersMaps.findIndex(user => user.userId === idUser);
        return usersMaps[index];
    }

    const idUser = userId; //The id of the user that enter the app
    //Holds the ID of the friend the user is currently talking to
    const [activeConv, setActiveConv] = useState(null);
    const [isSend, setIsSend] = useState(false);

    return userId ? (
        <div className={"full-screen p-3 mb-2 text-dark m-0 d-flex justify-content-center"} style={{height: "100vh"}}>
            <Conversation.Provider value={conversationMap}>
            <idContext.Provider value={getUser(idUser)}>
                <SideFrame activeConv={activeConv} setActiveConv={setActiveConv}/>
                <ConversationPage activeConv={activeConv} setActiveConv={setActiveConv} isSend={isSend} setIsSend={setIsSend}/>
            </idContext.Provider>
            </Conversation.Provider>
        </div>
    ) : <Navigate replace to="/"/>;
}

export default MainFrame;