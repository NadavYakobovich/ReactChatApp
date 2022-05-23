import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal, ProgressBar} from "react-bootstrap";
import "./SignUp.css"
import InputName from "../form/InputName";
import InputEmail from "../form/InputEmail";
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
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [image, setImage] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    let imageRef = useRef(null);
    let tracksRef = useRef(null);

    let navigate = useNavigate();

    let progress;
    var response;

    const usersMap = useContext(usersContext);

    function addUser(event) {
        event.preventDefault();
        //var params = "?name=" + fullName + "&email=" + email + "&password=" + pass
        const data = {Name: fullName, Email: email, Password: pass};
        $.ajax({
            url: 'http://localhost:5125/api/Users/new',
            type: 'POST',
            data: JSON.stringify(data),
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
        if (email !== "")
            count++;
        if (pass !== "")
            count++;
        if (rePass !== "")
            count++;
        if (image !== null && image !== undefined && image.current !== null)
            count++;
        return 20 * count;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;

        if (fullName === "" || $("#full_name").hasClass("is-invalid")) {
            valid = false
            $('#full_name').addClass("is-invalid")
        }
        if (email === "" || $("#email").hasClass("is-invalid")) {
            valid = false
            $('#email').addClass("is-invalid")
        }
        if (pass === "" || $("#pass").hasClass("is-invalid")) {
            valid = false
            $('#pass').addClass("is-invalid")
        }
        if (rePass === "" || $("#rePass").hasClass("is-invalid")) {
            valid = false
            $('#rePass').addClass("is-invalid")
        }

        if (image === null) {
            valid = false
            $('#missingPic').removeClass('d-none')
        }
        if (valid) {
            addUser(event);
            // setUserId(newID);
            // navigate('/home');
        }
    };

    function stopCamera() {
        if (tracksRef !== null) {
            tracksRef.forEach((track) => {
                track.stop();
            });
        }
    }


    function MyVerticallyCenteredModal(props) {

        function exitModal() {
            props.onHide();
            stopCamera();
            setImage(imageRef);
        }

        function isCaptured() {
            return !(imageRef === null || imageRef.current === null);
        }

        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Take Selfie
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {tracksRef = null}
                    <TakeSelfie setTracks={(tracks) => {
                        tracksRef = tracks;
                    }}
                                setImage={(image) => {
                                    imageRef = image;
                                }}
                                remImage={() => {
                                    imageRef = null;
                                }}/>
                </Modal.Body>

                <Modal.Footer>
                    <ModalPopover exitModal={exitModal} isCaptured={isCaptured}/>
                </Modal.Footer>
            </Modal>
        );
    }

    if (image !== null && image !== undefined && image.current !== null) {
        $("#chat-logo").removeClass("img-len").addClass("img-len-small")
    } else {
        $("#chat-logo").removeClass("img-len-small").addClass("img-len")

    }

    progress = calcProgress();
    return (
        <Form noValidate onSubmit={handleSubmit}>

            <InputName setFullName={setFullName}/>

            <InputEmail setEmail={setEmail} usersMap={usersMap}/>

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

            <UploadImage setImage={setImage} setModalShow={setModalShow}/>

            <p id="missingPic" className="text-danger fw-normal d-flex justify-content-center d-none">
                <i className="bi bi-info-circle"></i>&nbsp;Please add picture !
            </p>

            <ShowImage image={image} size={"20"}/>

            <ValidPic validInfo={image} info={"Picture added !"}/>


            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {
                    stopCamera();
                    setModalShow(false)
                }}
            />

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