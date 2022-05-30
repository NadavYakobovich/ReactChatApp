import React, {useContext, useRef, useState} from 'react';
import ValidFormAlert from "../alerts/ValidFormAlert";
import $ from 'jquery'
import {serverContext} from "../../App";

const InputUsername = ({setUsername}) => {

    const [valid, setValid] = useState("");
    const [message, setMessage] = useState("");

    const serverUrl = useContext(serverContext)

    const usernameRef = useRef();

    async function userExist(username) {
        console.log(username)
        await $.ajax({
            url: serverUrl + '/api/Users/find/' + username,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
            },
            success: function (data) {
                setValid("is-invalid")
                setUsername("")
                setMessage("This user name is already in use, please pick another one or sign in.")
            },
            error: function () {
                setValid("is-valid")
                setUsername(username)
            }
        })
    }

    function checkUsername() {
        let input = usernameRef.current.value;
        if (input === "" || input.includes(' ')) {
            setValid("is-invalid")
            setUsername("")
            setMessage("user name shouldn't contain spaces")
        }
        console.log(input)
        userExist(input);
        if (valid !== "is-invalid") {
            setValid("is-valid")
            setUsername(input)
        }
    }

    return (
        <div className="form-floating mb-3">
            <input id="username" className={"mb-1 form-control " + valid} placeholder={"Username"} ref={usernameRef}
                   onBlur={checkUsername}/>
            <label htmlFor="floatingInput">Username</label>
            <ValidFormAlert validInfo={valid} info={message}/>
        </div>
    );
};

export default InputUsername;