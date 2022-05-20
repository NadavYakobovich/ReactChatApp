import React, {useRef, useState} from 'react';
import ValidFormAlert from "../alerts/ValidFormAlert";
import $ from "jquery";

const InputRePass = ({setRePass, pass}) => {

    const [valid, setValid] = useState("");

    const rePassRef = useRef();

    function checkRePass() {
        let input = rePassRef.current.value;
        $("#holderRePass").hide()
        if (input !== "" && input === pass) {
            setValid("is-valid");
            setRePass(input)
        } else {
            setValid("is-invalid");
            setRePass("")
        }
    }

    function toggleEye() {
        var input = $('#rePass');
        var icon = $("[myatt=icon-rePass]");
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
        <div className="form-floating mb-3">
            <input id="rePass" type="password" className={"mb-1 form-control " + valid}
                   placeholder={"Re-Enter Password"} ref={rePassRef}
                   onKeyUp={checkRePass}/>
            <i className="bi bi-key holder" id="holderRePass"></i>
            <i myatt="icon-rePass" className="far fa-eye" id="togglePassword-push" onClick={toggleEye}></i>
            <label htmlFor="floatingInput">Re-Enter Password</label>
            <ValidFormAlert validInfo={valid} info={"Passwords does not match or not valid"}/>

        </div>
    );
};

export default InputRePass;