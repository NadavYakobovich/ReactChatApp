import './App.css';
import LandingPage from "./components/landingpage/LandingPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainFrame from "./components/MainFrame/MainFrame";
import React, {createContext, useState} from "react";
import users from "./database/users.json";

export const usersContext = createContext()
let usersMap = users.users
export const serverContext = createContext()
let server = "http://localhost:5125";

function App() {
    const [userId, setUserId] = useState(null)

    return (
        <serverContext.Provider value={server}>
            <usersContext.Provider value={usersMap}>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<LandingPage setUserId={setUserId}/>}/>
                        <Route path={'/home'} element={<MainFrame userId={userId} className="mainFrame"/>}/>
                    </Routes>
                </BrowserRouter>
            </usersContext.Provider>
        </serverContext.Provider>


    );
}

export default App;
