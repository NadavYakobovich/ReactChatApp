import React, {useContext, useState, useEffect} from 'react';
import SideFrame from "../SideFrame/SideFrame";
import ConversationPage from "../ConversationPage/ConversationPage";
import conversation from "../../database/conversation.json"
import {tokenContext, usersContext} from "../../App";
import {Navigate} from "react-router-dom";
import $ from 'jquery';

export const idContext = React.createContext()
export const Conversation = React.createContext()

  function MainFrame({userId}) {

     //let conversationMap = conversation.conversation
     const usersMaps = useContext(usersContext)
     const token = useContext(tokenContext)
      const [userApicheck, setUserApicheck] = useState();

     var response;
     var userCheck;
    
     function fromApiToUser(apiUser) {
         const contacts = [];
         apiUser.contacts.forEach(contact => {
             const NewContact = {
                 id: contact.id,
                 lastMessage: contact.lastdate,
                 last: contact.last
             }
             contacts.push(NewContact);

         });
         userCheck = {
             userId: response.id,
             name: response.name,
             email: response.email,
             password: response.password,
             pic: null,
             contacts: contacts,
         }
         return userCheck;
     }

     var user;


     useEffect(   (idUser) => {
         //get id of user and get from the server the objects user of with that id
         async function getUser(idUser) {
              const rs = await $.ajax({
                 url: 'http://localhost:5125/api/Users/' + idUser,
                 type: 'GET',
                 beforeSend: function (xhr) {
                     xhr.setRequestHeader('Authorization', 'Bearer ' + token.value);
                 },
                 data: {},
                 success: function (data) {
                     response = data;
                 },
                 error: function () {
                 },
             }).then((response) => {
                 user = fromApiToUser(response)
                 setUserApicheck(user);
             })
         }
           getUser(idUser)
      },[]);

     const idUser = userId; //The id of the user that enter the app

     // activeConv -> Holds the ID of the friend the user is currently talking to
     const [activeConv, setActiveConv] = useState(null);
     const [isSend, setIsSend] = useState(false);

     return userId ? (
         <div className={"full-screen p-3 mb-2 text-dark m-0 d-flex justify-content-center"} style={{height: "100vh"}}>
             {"the main frame"}
             {console.log(userApicheck)}
             {/*<Conversation.Provider value={conversationMap}>*/}
                 <idContext.Provider value={userApicheck}>
                     {/*<SideFrame activeConv={activeConv} setActiveConv={setActiveConv}/>*/}
                     {/*<ConversationPage activeConv={activeConv} setActiveConv={setActiveConv} isSend={isSend}*/}
                     {/*                  setIsSend={setIsSend}/>*/}
                 </idContext.Provider>
             {/*</Conversation.Provider>*/}
         </div>
     ) : <Navigate replace to="/"/>;
 }

export default MainFrame;