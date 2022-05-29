import React, {useContext, useState} from 'react'
import {Tab, Tabs} from "react-bootstrap"
import "./LandingPage.css"
import SignIn from "../signin/SignIn"
import SignUp from "../signup/SignUp"
import {usersContext} from "../../App";


const LandingPage = ({setUserId}) => {
    const usersMap = useContext(usersContext)
    const [key, setKey] = useState('signin');
    
    function AddUser(user) {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5125/ChatHub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user,))
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="container" style={{height: "100vh"}}>
            <div className="row">
                <div className="col">
                </div>
                <div className="col-xxl-5 col-lg-6 col-md-8 col-sm-9 col-7">
                    <div className={"card mt-4"}>
                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                <img id="chat-logo" src="chaticon.png" alt="logo"
                                     className="img-len d-none d-sm-block"/>
                            </div>
                            <usersContext.Provider value={usersMap}>
                                <Tabs
                                    id="controlled-tabs"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3 justify-content-center"
                                    justify
                                >
                                    <Tab eventKey="signin" title="Sign In">
                                        <SignIn className={"signIn"} setUserId={setUserId}/>
                                    </Tab>
                                    <Tab eventKey="signup" title="Sign Up">
                                        <SignUp setUserId={setUserId}/>
                                    </Tab>
                                </Tabs>
                            </usersContext.Provider>
                        </div>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </div>

    );
};

export default LandingPage;