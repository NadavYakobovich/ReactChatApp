import React, {useContext, useRef, useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import "../landingpage/LandingPage.css";
import $ from 'jquery';
import "./SignIn.css"
import ValidFormAlert from "../alerts/ValidFormAlert";
import {usersContext} from "../../App";



const SignIn = ({setUserId}) => {

    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validLogin, setValidLogin] = useState("");
    const [message, setMessage] = useState("");

    const pass = useRef();
    const email = useRef();

    const usersMap = useContext(usersContext);

    let navigate = useNavigate();

    function checkLogin(event) {
        event.preventDefault();
        let index;
        let validLogin = true;
        if (email.current.value === "" || !email.current.value.includes("@")) {
            setMessage("Please enter a valid email address");
            setValidEmail(false);
            validLogin = false;
        } else {
            index = usersMap.findIndex(user => user.email === email.current.value);
            if (index === -1) {
                setMessage("User name does not exist in the system, please sign up")
                setValidEmail(false);
                validLogin = false;
            } else {
                setValidEmail(true);
            }
        }
        if (pass.current.value === "") {
            setValidPass(false);
            validLogin = false;
        } else {
            setValidPass(true);
        }
        if (validLogin) {
            if (pass.current.value === usersMap[index].password) {
                setUserId(usersMap[index].userId)
                navigate('/home');
            } else {
                setValidLogin(false)
            }
        }
    }


    function toggleEye() {
        var input = $('#signin-floatingPassword');
        var icon = $("#togglePassword");
        var className = icon.attr('class');
        className = className.indexOf('slash') !== -1 ? 'far fa-eye' : 'far fa-eye-slash'
        icon.attr('class', className);
        if (input.attr("type") === "password") {
            input.prop("type", "text");
        } else {
            input.prop("type", "password");
        }
    }

    return (
        <Form noValidate onSubmit={checkLogin}>
            <FloatingLabel className="mb-3" controlId="signin-floatingInput" label="Email address">
                <Form.Control className="mb-1" type="email" placeholder="Email address" ref={email}/>
                <ValidFormAlert validInfo={validEmail} info={message}/>
            </FloatingLabel>

            <FloatingLabel className="mb-3" controlId="signin-floatingPassword" label="Password">
                <Form.Control className="mb-1" type="password" placeholder="Password" ref={pass}/>
                <i className="far fa-eye" id="togglePassword" onClick={toggleEye}></i>
                <ValidFormAlert validInfo={validPass} info={"Please enter a valid password"}/>
            </FloatingLabel>

            <div className="d-grid gap-2">
                <Button variant="primary" size="m" type="submit">
                    Sign In
                </Button>
                <div className={"d-flex justify-content-center"}>
                    <ValidFormAlert validInfo={validLogin}
                                    info={"Error : You have entered incorrect email or password."}/>
                </div>
            </div>
        </Form>
    );
};

export default SignIn;