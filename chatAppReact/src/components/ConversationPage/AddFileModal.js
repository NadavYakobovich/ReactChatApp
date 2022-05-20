import React, {useRef} from 'react';
import {Button, Modal} from "react-bootstrap";
import ShowImage from "../form/ShowImage";
import ShowVideo from "../form/ShowVideo";
import TakeSelfie from "../form/TakeSelfie";
import TakeVideo from "../form/TakeVideo";
import ModalPopover from "../form/ModalPopover";
import RecordAudio from "../form/RecordAudio";

const AddFileModal = ({file, modalShow, setModalShow, addFile, updateData}) => {

        let tracksRef = useRef([]);
        let imageRef = useRef(null);
        let videoRef = useRef(null);
        let audioRef = useRef(null);

        if (file === null) {
            return;
        }

        function isCaptured() {
            return !(imageRef === null || imageRef.current === null);
        }

        function isRecordedVid() {
            return !(videoRef === null || videoRef.current === null);
        }

        function isRecordedAud() {
            return !(audioRef === null || audioRef.current === null);
        }

        function stopCamera() {
            if (tracksRef !== null && tracksRef.current !== null) {
                tracksRef.current.forEach((trackSet) => {
                    trackSet.forEach((track) => {
                        track.stop();
                    })
                });
            }
        }

        function PreviewFile() {
            if (file.type === "img1") {
                return (
                    <>
                        <ShowImage image={file.data} size={"75"}/>
                        {/*<input className="opt-txt form-control form-control-sm" type="text"*/}
                        {/*       placeholder="(Optional) Add text"/>*/}
                    </>);
            } else if (file.type === "vid1") {
                return (
                    <>
                        <ShowVideo video={file.data} size={"previewVid"}/>
                        {/*<input className="opt-txt form-control form-control-sm" type="text"*/}
                        {/*       placeholder="(Optional) Add text"/>*/}
                    </>);
            } else if (file.type === "img2") {
                return (
                    <TakeSelfie setTracks={(trackSet) => tracksRef.current.push(trackSet)}
                                setImage={(image) => imageRef = image}
                                remImage={() => imageRef = null}/>
                );
            } else if (file.type === "vid2") {
                return (
                    <TakeVideo setTracks={(trackSet) => tracksRef.current.push(trackSet)}
                               setVideo={(video) => videoRef = video}
                               remVideo={() => videoRef = null}/>
                );
            } else if (file.type === "rec") {
                return (
                    <RecordAudio setTracks={(trackSet) => tracksRef.current.push(trackSet)}
                                 setRec={(audio) => audioRef = audio}/>
                );
            }
        }

        function ExitModal({save, cancel}) {
            if (file.type === "img2") {
                return (<ModalPopover cancel={cancel} save={save} isCaptured={isCaptured} action={"Capture"}/>);
            } else if (file.type === "vid2") {
                return (<ModalPopover cancel={cancel} save={save} isCaptured={isRecordedVid} action={"Record"}/>);
            } else if (file.type === "rec"){
                return (<ModalPopover cancel={cancel} save={save} isCaptured={isRecordedAud} action={"Record"}/>);
            } else {
                return (
                    <>
                        <Button variant="secondary" onClick={cancel}> Cancel</Button>
                        <Button onClick={save}>Send</Button>
                    </>
                )
            }
        }

        function MyVerticallyCenteredModal(props) {

            function save() {
                if (isCaptured())
                    updateData(imageRef);
                if (isRecordedVid())
                    updateData(videoRef);
                if (isRecordedAud())
                    updateData(audioRef);
                addFile()
                props.onHide()
            }

            function cancel() {
                if (isCaptured())
                    imageRef = null;
                if (isRecordedVid())
                    videoRef = null;
                if (isRecordedAud())
                    audioRef = null;
                props.onHide()
            }

            return (
                <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Preview
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <PreviewFile/>
                    </Modal.Body>

                    <Modal.Footer>
                        <ExitModal save={save} cancel={cancel}/>
                    </Modal.Footer>
                </Modal>
            )
                ;
        }

        return (
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {
                    stopCamera();
                    setModalShow(false);
                }}
            />
        );
    }
;

export default AddFileModal;