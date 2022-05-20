import React, {useRef, useState} from 'react';
import ValidFormAlert from "../alerts/ValidFormAlert";

const InputEmail = ({setEmail, usersMap}) => {

    const [valid, setValid] = useState("");
    const [message, setMessage] = useState("");

    const emailRef = useRef();

    function checkEmail() {
        let input = emailRef.current.value;
        if (input === "" || !input.includes('@')) {
            setValid("is-invalid")
            setEmail("")
            setMessage("Email address should contain @ sign")
        } else if (usersMap.find(user => user.email === input)) {
            setValid("is-invalid")
            setEmail("")
            setMessage("This email is already in use, please pick another one or sign in.")
        } else {
            setValid("is-valid")
            setEmail(input)
        }
    }

    return (
        <div className="form-floating mb-3">
            <input id="email" className={"mb-1 form-control " + valid} placeholder={"Email Address"} ref={emailRef}
                   onKeyUp={checkEmail}/>
            <label htmlFor="floatingInput">Email Address</label>
            <ValidFormAlert validInfo={valid} info={message}/>
        </div>
    );
};

export default InputEmail;