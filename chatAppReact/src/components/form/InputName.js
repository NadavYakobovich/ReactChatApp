import React, {useRef, useState} from 'react';
import ValidFormAlert from "../alerts/ValidFormAlert";

const InputName = ({setFullName}) => {

    const [valid, setValid] = useState("");

    const nameRef = useRef();

    function checkName() {
        let input = nameRef.current.value;
        const regName = new RegExp(/^[a-zA-Z\s]*$/)
        if (regName.test(input) && input !== "") {
            setValid("is-valid");
            setFullName(input)
        } else {
            setValid("is-invalid");
            setFullName("")
        }
    }

    return (
        <div className="form-floating mb-3">
            <input id="full_name" className={"mb-1 form-control " + valid} placeholder={"Full Name"} ref={nameRef}
                   onKeyUp={checkName}/>
            <label htmlFor="floatingInput">Full Name</label>
            <ValidFormAlert validInfo={valid} info={"Name should only contain letters and spaces"}/>
        </div>
    );
};

export default InputName;