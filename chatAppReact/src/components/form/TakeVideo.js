import React, {useEffect} from 'react';
import $ from 'jquery';
import Loading from "../alerts/Loading";

const TakeVideo = ({setTracks, setVideo, remVideo}) => {

    var constraints = {
        audio: true,
        video: {width: {min: 640, ideal: 640, max: 640}, height: {min: 480, ideal: 480, max: 480}, framerate: 60}
    };

    useEffect(() => {
        $("#rec").prop('disabled', true);
        $("#pauseRes").prop('disabled', true);
        $("#stop").prop('disabled', true);
        $('#playback').hide()
    });

    $('#live').prop("controls", false);
    $('#playback').prop("controls", false);

    var mediaRecorder;
    var chunks = [];
    var localStream = null;
    var containerType = "video/webm"; //defaults to webm but we switch to mp4 on Safari 14.0.2+

    if (!navigator.mediaDevices.getUserMedia) {
        alert('navigator.mediaDevices.getUserMedia not supported on your browser, use the latest version of Firefox or Chrome');
    } else {
        if (window.MediaRecorder === undefined) {
            alert('MediaRecorder not supported on your browser, use the latest version of Firefox or Chrome');
        } else {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                    localStream = stream;
                    $('#live').prop("srcObject", localStream);
                    setTracks(localStream.getTracks())
                    $('#live')[0].play();
                    $('.text-left').hide()
                    $('#rec').prop("disabled", false);

                    try {
                        window.AudioContext = window.AudioContext || window.webkitAudioContext;
                        window.audioContext = new AudioContext();
                    } catch (e) {
                        console.log('Web Audio API not supported.');
                    }

                }).catch(function (err) {
                /* handle the error */
                console.log('navigator.getUserMedia error: ' + err);
            });

        }
    }

    function onBtnRecordClicked() {
        remVideo()
        $('#live').show()
        $('#playback').hide()

        $('#rec').prop("disabled", true);
        $('#pauseRes').prop("disabled", false);
        $('#stop').prop("disabled", false);

        chunks = [];

        /* use the stream */
        if (typeof MediaRecorder.isTypeSupported == 'function') {
            var options;
            if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                options = {mimeType: 'video/webm;codecs=vp9'};
            } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
                options = {mimeType: 'video/webm;codecs=h264'};
            } else if (MediaRecorder.isTypeSupported('video/webm')) {
                options = {mimeType: 'video/webm'};
            } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
                containerType = "video/mp4";
                options = {mimeType: 'video/mp4'};
            }
            mediaRecorder = new MediaRecorder(localStream, options);
        } else {
            mediaRecorder = new MediaRecorder(localStream);
        }

        mediaRecorder.ondataavailable = function (e) {
            if (e.data && e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = function () {
            //var recording = new Blob(chunks, {type: containerType});
            var recording = new Blob(chunks, {type: mediaRecorder.mimeType});
            setVideo(recording);
            // Even if they do, they may only support MediaStream
            $('#playback').prop("src", URL.createObjectURL(recording));

            $('#playback').prop("controls", true);

        };

        $('#pauseRes').html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pause-fill\" viewBox=\"0 0 16 16\">\n" +
            "  <path d=\"M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z\"/>\n" +
            "</svg> Pause");

        mediaRecorder.start(1000);
    }


    function onBtnStopClicked() {
        $('#live').hide()
        $('#playback').show()
        mediaRecorder.stop();
        $('#rec').prop("disabled", false);
        $('#pauseRes').prop("disabled", true);
        $('#stop').prop("disabled", true);
    }

    function onPauseResumeClicked() {
        if (mediaRecorder.state === "recording") {
            $('#pauseRes').html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-play-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z\"/>\n" +
                "</svg> Resume");
            mediaRecorder.pause();
            $('#pauseRes').prop('disabled', false);
        } else {
            $('#pauseRes').html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pause-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z\"/>\n" +
                "</svg> Pause");
            mediaRecorder.resume();
            $('#stop').prop('disabled', false);
        }
        $('#rec').prop('disabled', true);
        $('#pauseRes').prop('disabled', false);
    }

    return (
        <div>
            <Loading text="Loading..."/>
            <video className="pictureStream" id="live" autoPlay playsInline muted></video>
            <video className="pictureStream" id="playback" controls></video>
            <br/>
            <div id="controls">
                <button id="rec" className="btn btn-primary me-1" onClick={onBtnRecordClicked}>
                    <i className="bi bi-record-fill"/> Record
                </button>
                <button id="pauseRes" className="btn btn-info me-1" onClick={onPauseResumeClicked}>
                    <i className="bi bi-pause-fill"/> Pause
                </button>
                <button id="stop" className="btn btn-secondary" onClick={onBtnStopClicked}>
                    <i className="bi bi-stop-fill"/> Stop
                </button>
            </div>
        </div>
    );
};

export default TakeVideo;