import React, {useRef, useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import "../landingpage/LandingPage.css";
import $ from 'jquery';
import "./SignIn.css"
import ValidFormAlert from "../alerts/ValidFormAlert";


const SignIn = ({setUserId}) => {

    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [validLogin, setValidLogin] = useState("");
    const [message, setMessage] = useState("");

    const pass = useRef("");
    const email = useRef("");

    var response;
    let navigate = useNavigate();

    async function checkLogin(event) {
        event.preventDefault();
        let validLogin = true;
        let emailVal = email.current.value;
        let passVal = pass.current.value;
        if (emailVal === "" || !emailVal.includes("@")) {
            setMessage("Please enter a valid email address");
            setValidEmail(false);
            validLogin = false;
        }
        if (passVal === "") {
            setValidPass(false);
            validLogin = false;
        } else {
            setValidPass(true);
        }

        const data = {Email: emailVal, Password: passVal};
        await $.ajax({
            url: 'http://localhost:5125/api/Users',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                response = data;
                response = response.split(" ");
                sessionStorage.setItem('jwt', response[0]);
                setUserId(parseInt(response[1]));
            },
            error: function () {
                setValidLogin(false);
            }
        }).then(() => {
            navigate('/home')
        });
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