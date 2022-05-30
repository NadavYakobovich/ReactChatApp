import React, {useContext, useState, useRef, useEffect} from 'react';
import SideFrame from "../SideFrame/SideFrame";
import ConversationPage from "../ConversationPage/ConversationPage";
import conversation from "../../database/conversation.json"
import {usersContext} from "../../App";
import {Navigate, useNavigate} from "react-router-dom";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

import $ from 'jquery';

export const idContext = React.createContext()
export const Conversation = React.createContext()
export const UsersListApp = React.createContext()


function MainFrame({userId}) {

    //const usersMaps = useContext(usersContext)

    //Holds the ID of the friend the user is currently talking to
    const [activeConv, setActiveConv] = useState(null);
    const [isSend, setIsSend] = useState(false);
    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState(null);
    const [connection, setConnection] = useState(null);

    function fromApiToUser(apiUser) {
        const contacts = [];
        apiUser.contacts.forEach(contact => {
            const NewContact = {
                id: contact.id,
                lastMessage: contact.lastdate,
                last: contact.last,
                server: contact.server
            }
            contacts.push(NewContact);
        });

        return {
            userId: apiUser.id,
            name: apiUser.name,
            password: apiUser.password,
            pic: null,
            contacts: contacts,
        };
    }

    const getAnswer = async () => {
          await getUser();
        console.log("***await")
        console.log(user)
        await  getUserList();
    };

    async function getUser() {
        if (userId === null)
            return;
        const output = await $.ajax({
            url: 'http://localhost:5125/api/Users/' + userId,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
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
        var user = await output;
        setUser(fromApiToUser(user));
        AddUser()
        console.log("get the userrr")
    }
    //update the last message of the contact in the contacts list that will display in the left side
    function  incomeMess(contactID, mess,time){
        console.log("****** before null *****")
        if(user === null){
            console.log(user)
            console.log("get null....")
            return
        }
        let contact = user.contacts.find(x => x.id === contactID)
        contact.last =  mess;
        contact.lastMessage = time
        console.log("****** the user is ****")
        console.log(user)
        setIsSend(!isSend)
    }

    async function AddUser() {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5125/ChatHub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (userFrom, message, time) => {
                console.log('message: ' + message + '    from:' + userFrom);
                incomeMess(userFrom,message,time)
            })

            connection.onclose(e => {
                setConnection(null);
            })

            await connection.start();
            await connection.invoke("AddUser", userId);
            setConnection(connection);
        } catch (e) {
            console.log(e)
        }
    }

    async function closeConnection() {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

 

    useEffect(() => {
        getAnswer()
            // AddUser();})
    }, [])
    
    
    //get all the user from the server
    async function getUserList() {
        if (userId === null)
            return;
        const output = await $.ajax({
            url: 'http://localhost:5125/api/Users',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
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
        var users = await output;
        const usersListNew = [];
        users.forEach(x => usersListNew.push(fromApiToUser(x)))
        setUserList(usersListNew);
    }

    if (userId && (user == null || userList == null)) {
        return
    }

    return userId ? (
        <div className={"full-screen p-3 mb-2 text-dark m-0 d-flex justify-content-center"} style={{height: "100vh"}}>
                <UsersListApp.Provider value ={userList}>
                    <idContext.Provider value={user}>
                        <SideFrame activeConv={activeConv} setActiveConv={setActiveConv}  isSend={isSend} setIsSend={setIsSend} closeConnection={closeConnection}/>
                        {<ConversationPage activeConv={activeConv} setActiveConv={setActiveConv} isSend={isSend} setIsSend={setIsSend} connection={connection}  />}
                    </idContext.Provider>
                </UsersListApp.Provider>
        </div>
    ) : <Navigate replace to="/"/>;
}

export default MainFrame;