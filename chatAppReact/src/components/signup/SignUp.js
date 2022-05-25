import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal, ProgressBar} from "react-bootstrap";
import "./SignUp.css"
import InputName from "../form/InputName";
import InputUsername from "../form/InputUsername";
import InputPass from "../form/InputPass";
import InputRePass from "../form/InputRePass";
import UploadImage from "../form/UploadImage";
import $ from 'jquery'
import ShowImage from "../form/ShowImage";
import ValidPic from "../alerts/ValidPic";
import TakeSelfie from "../form/TakeSelfie";
import ModalPopover from "../form/ModalPopover";
import {usersContext} from "../../App";
import {useNavigate} from "react-router-dom";

const SignUp = ({setUserId}) => {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [rePass, setRePass] = useState("");

    let navigate = useNavigate();

    let progress;
    var response;

    const usersMap = useContext(usersContext);

    async function addUser(event) {
        event.preventDefault();
        const data = {Name: fullName, Id: username, Password: pass};
        await $.ajax({
            url: 'http://localhost:5125/api/Users/new',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
            },
            success: function (data) {
                response = data;
                response = response.split(" ");
                sessionStorage.setItem('jwt', response[0]);
                setUserId(parseInt(response[1]));
            },
            error: function () {
            },
        }).then(() => {
            navigate('/home')
        });
    }

    function calcProgress() {
        let count = 0;
        if (fullName !== "")
            count++;
        if (username !== "")
            count++;
        if (pass !== "")
            count++;
        if (rePass !== "")
            count++;
        return 25 * count;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;

        if (fullName === "" || $("#full_name").hasClass("is-invalid")) {
            valid = false
            $('#full_name').addClass("is-invalid")
        }
        if (username === "" || $("#username").hasClass("is-invalid")) {
            valid = false
            $('#username').addClass("is-invalid")
        }
        if (pass === "" || $("#pass").hasClass("is-invalid")) {
            valid = false
            $('#pass').addClass("is-invalid")
        }
        if (rePass === "" || $("#rePass").hasClass("is-invalid")) {
            valid = false
            $('#rePass').addClass("is-invalid")
        }
        
        if (valid) {
            addUser(event);
        }
    };

    progress = calcProgress();
    
    return (
        <Form noValidate onSubmit={handleSubmit}>

            <InputName setFullName={setFullName}/>

            <InputUsername setUsername={setUsername} usersMap={usersMap}/>

            <InputPass setPass={setPass}/>

            <div id="pswd_ancestor">
                <InputRePass setRePass={setRePass} pass={pass}/>
                <div id="pswd_info">
                    <h6>Password <strong>must</strong> meet the following requirements:</h6>
                    <ul>
                        <li id="length" className="invalid">8-20 <strong>characters</strong></li>
                        <li id="letter" className="invalid">At least <strong>one letter</strong></li>
                        <li id="capital" className="invalid">At least <strong>one capital letter</strong></li>
                        <li id="number" className="invalid">At least <strong>one number</strong></li>
                        <li id="special" className="invalid">At least <strong>one special symbol</strong></li>
                    </ul>
                </div>
            </div>

            <ProgressBar className="mb-2" animated now={progress}/>

            <div className="d-grid gap-2">
                <Button variant="primary" size="m" type="submit">
                    Sign Up
                </Button>
            </div>
        </Form>
    );
};

export default SignUp;