import React, {useRef, useState} from 'react';
import {Button, Overlay, Tooltip} from "react-bootstrap";

const ModalPopover = ({cancel ,save, isCaptured, action}) => {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    function showPop() {
        if (isCaptured() === true) {
            save()
        } else {
            setShow(true);
        }
    }

    return (
        <>
            <Button variant="secondary" onClick={cancel}> Cancel</Button>

            <Button ref={target} onBlur={() => {
                setShow(false)
            }} onClick={showPop}>
                Save & Upload
            </Button>

            <Overlay target={target.current} show={show} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Please <strong>{action}</strong> First
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
};

export default ModalPopover;