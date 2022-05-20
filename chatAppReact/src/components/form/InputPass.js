import React, {useRef, useState} from 'react';
import $ from "jquery";

const InputPass = ({setPass}) => {

    const [valid, setValid] = useState("");

    const passRef = useRef();
    $('input[id=pass]').keyup(function () {
        var pswd = $(this).val();

        if (pswd.length < 8 || pswd.length > 20) {
            $('#length').removeClass('valid').addClass('invalid');
        } else {
            $('#length').removeClass('invalid').addClass('valid');
        }
        if (pswd.match(/[a-z]/)) {
            $('#letter').removeClass('invalid').addClass('valid');
        } else {
            $('#letter').removeClass('valid').addClass('invalid');
        }
        //validate capital letter
        if (pswd.match(/[A-Z]/)) {
            $('#capital').removeClass('invalid').addClass('valid');
        } else {
            $('#capital').removeClass('valid').addClass('invalid');
        }
        //validate number
        if (pswd.match(/\d/)) {
            $('#number').removeClass('invalid').addClass('valid');
        } else {
            $('#number').removeClass('valid').addClass('invalid');
        }
        //validate special number
        if (pswd.match(/[#?\[\]!\\@{}.~;/$%+^&*()-]/)) {
            $('#special').removeClass('invalid').addClass('valid');
        } else {
            $('#special').removeClass('valid').addClass('invalid');
        }
    }).focus(function () {
        $('#pswd_info').show();
    }).blur(function () {
        $('#pswd_info').hide();
        $("#holderPass").hide()
        if ($('#special').hasClass('valid') &&
            $('#number').hasClass('valid') &&
            $('#capital').hasClass('valid') &&
            $('#letter').hasClass('valid') &&
            $('#length').hasClass('valid')) {
            setValid("is-valid")
            setPass(passRef.current.value)
        } else {
            setValid("is-invalid")
            setPass("")
        }
    });

    function toggleEye() {
        var input = $('#pass');
        var icon = $("[myatt=icon-pass]");
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
            <input id="pass" type="password" className={"mb-1 form-control " + valid} placeholder={"Password"}
                   ref={passRef}/>
            <i className="bi bi-key holder" id="holderPass"></i>
            <i myatt="icon-pass" className="far fa-eye" id="togglePassword-push" onClick={toggleEye}></i>
            <label htmlFor="floatingInput">Password</label>
        </div>
    );
};

export default InputPass;