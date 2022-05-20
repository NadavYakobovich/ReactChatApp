import React from "react";
import {Form} from "react-bootstrap";

const UploadImage = ({setImage, setModalShow}) => {

    return (
        <div className={"row"}>

            <span className={"col-4"}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalShow(true)}>
                    <i className="bi bi-camera-fill"/> Take a picture</button>
            </span>


            <span className={"col-8"}>
                <Form.Control
                    type="file"
                    name="myImage"
                    className={"mb-3"}
                    accept={"image/*"}
                    onChange={(event) => {
                        setImage(event.target.files[0]);
                    }}
                />
            </span>


        </div>

    );
};

export default UploadImage;