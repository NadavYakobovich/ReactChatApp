import React, {useEffect} from "react";
import "./TakeSelfie.css";
import Loading from "../alerts/Loading";
import $ from "jquery";

const TakeSelfie = ({setTracks, setImage, remImage}) => {

    useEffect(() => {
        $('#canvasTag').hide();
        $('#retry').prop("disabled", true);
    })


    const tryAgain = function () {
        remImage();
        $('#retry').prop("disabled",true);
        $('#capture').prop("disabled",false);
        $('#canvasTag').hide();
        $('#videoTag').show();
    }

    // capture() - Function called when click on video tag
    // 1. Capture a video frame from the video tag and render on the canvas element
    // 2. Set the H/W of the canvas to match that of the size of the video

    const capture = function () {
        $('#retry').prop("disabled",false);
        $('#capture').prop("disabled",true);
        if (!mediaStream) {
            return;
        }
        var video = document.getElementById('videoTag');
        var canvas = document.getElementById('canvasTag');
        var videoWidth = video.videoWidth;
        var videoHeight = video.videoHeight;

        if (canvas.width !== videoWidth || canvas.height !== videoHeight) {
            canvas.width = videoWidth;
            canvas.height = videoHeight;
        }

        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        $('#canvasTag').show();
        $('#videoTag').hide();
        setImage(canvas.toDataURL('image/jpeg'));
    };

    var mediaStream = null;
    var webcamList = [];
    var currentCam = null;

    // init() - The entry point to the demo code
    // 1. Detect whether getUserMedia() is supported, show an error if not
    // 2. Set up necessary event listners for video tag and the webcam 'switch' button
    // 3. Detect whether device enumeration is supported, use the legacy media capture API to start the demo otherwise
    // 4. Enumerate the webcam devices when the browser supports device enumeration

    const init = function () {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            navigator.mediaDevices.enumerateDevices().then(devicesCallback);
        } else if (navigator.getUserMedia) {
            $('#tooltip').html('Cannot switch web cams because navigator.mediaDevices.enumerateDevices is unsupported by your browser.');
            navigator.getUserMedia({video: true}, initializeVideoStream, getUserMediaError);
        } else {
            console.log('You are using a browser that does not support the Media Capture API');
        }
    };


    // initializeVideoStream() - Callback function when getUserMedia() returns successfully with a mediaStream object
    // 1. Set the mediaStream on the video tag
    // 2. Use 'srcObject' attribute to determine whether to use the standard-based API or the legacy version

    var initializeVideoStream = function (stream) {
        mediaStream = stream;
        var video = document.getElementById('videoTag');
        if (typeof (video.srcObject) !== 'undefined') {
            video.srcObject = mediaStream;
        } else {
            video.src = URL.createObjectURL(mediaStream);
        }
        setTracks(mediaStream.getVideoTracks());
        $('.text-left').hide();
    };


    // nextWebCam() - Function to rotate through the webcam device list
    // 1. Release the current webcam (if there is one in use)
    // 2. Call getUserMedia() to access the next webcam

    var startCam = function () {
        if (currentCam !== null) {
            currentCam++;
            if (currentCam >= webcamList.length) {
                currentCam = 0;
            }
            var video = $('#videoTag');
            video.srcObject = null;
            video.src = null;
            if (mediaStream) {
                var videoTracks = mediaStream.getVideoTracks();
                videoTracks[0].stop();
                mediaStream = null;
            }
        } else {
            currentCam = 0;
        }

        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                height: 720,
                deviceId: {exact: webcamList[currentCam]}
            }
        }).then(initializeVideoStream)
            .catch(getUserMediaError);
    };


    // devicesCallback() - Callback function for device enumeration
    // 1. Identify all webcam devices and store the info in the webcamList
    // 2. Start the demo with the first webcam on the list
    // 3. Show the webcam 'switch' button when there are multiple webcams
    // 4. Show error message when there is no webcam
    // 5. Register event listener (devicechange) to respond to device plugin or unplug

    var devicesCallback = function (devices) {
        // Identify all webcams
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].kind === 'videoinput') {
                webcamList[webcamList.length] = devices[i].deviceId;
            }
        }
        if (webcamList.length > 0) {
            // Start video with the first device on the list
            startCam();
        } else {
            console.log('Webcam not found.');
        }
    };


    // getUserMediaError() - Callback function when getUserMedia() returns error
    // 1. Show the error message with the error.name

    var getUserMediaError = function (e) {
        if (e.name.indexOf('NotFoundError') >= 0) {
            console.log('Webcam not found.');
        } else {
            console.log('The following error occurred: "' + e.name + '" Please check your webcam device(s) and try again.');
        }
    };


    init();

    return (
        <>
            <Loading text="Loading..."/>
            <div className="view--video">
                <canvas id="canvasTag" className="pictureStream view--snapshot__canvas"/>
                <video id="videoTag" src="" autoPlay muted className="pictureStream"/>
                <button id="capture" className="btn btn-primary me-1" onClick={capture}>
                    <i className="bi bi-camera-fill"/> Capture
                </button>
                <button id="retry" className="btn btn-secondary" onClick={tryAgain}>
                    <i className="bi bi-arrow-clockwise"/> Try again
                </button>
            </div>
        </>
    );
}

export default TakeSelfie;