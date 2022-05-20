import React, {useEffect, useState} from 'react';
import $ from 'jquery';

const RecordAudio = ({setRec, setTracks}) => {

    const [audio, setAudio] = useState(null);

    //webkitURL is deprecated but nevertheless
    URL = window.URL || window.webkitURL;

    var gumStream; 						//stream from getUserMedia()
    var recorder; 						//MediaRecorder object
    var chunks = [];					//Array of chunks of audio data from the browser
    var extension;

    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        extension = "webm";
    } else {
        extension = "ogg"
    }

    useEffect(() => {
        $("#recordButton").prop('disabled', false);
        $("#stopButton").prop('disabled', true);
        $("#pauseButton").prop('disabled', true);
    });


    function startRecording() {
        var constraints = {audio: true}

        $("#recordButton").prop('disabled', true);
        $("#stopButton").prop('disabled', false);
        $("#pauseButton").prop('disabled', false);

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            /*  assign to gumStream for later use  */
            gumStream = stream;
            setTracks(gumStream.getAudioTracks());

            var options = {
                audioBitsPerSecond: 256000,
                videoBitsPerSecond: 2500000,
                bitsPerSecond: 128000,
                mimeType: 'audio/' + extension + ';codecs=opus'
            }

            /*
                Create the MediaRecorder object
            */
            recorder = new MediaRecorder(stream, options);

            //when data becomes available add it to our attay of audio data
            recorder.ondataavailable = function (e) {
                // add stream data to chunks
                chunks.push(e.data);
                // if recorder is 'inactive' then recording has finished
                if (recorder.state === 'inactive') {
                    // convert stream data chunks to a 'webm' audio format as a blob
                    const blob = new Blob(chunks, {type: 'audio/' + extension, bitsPerSecond: 128000});
                    setAudio(blob);
                }
            };

            recorder.onerror = function (e) {
                console.log(e.error);
            }

            //start recording using 1 second chunks
            //Chrome and Firefox will record one long chunk if you do not specify the chunck length
            recorder.start(1000);

            //recorder.start();
        }).catch(function (err) {
            //enable the record button if getUserMedia() fails
            $("#recordButton").prop("disabled", false);
            $("#stopButton").prop("disabled", true);
            $("#pauseButton").prop("disabled", true);
        });
    }

    function pauseRecording() {
        if (recorder.state === "recording") {
            //pause
            recorder.pause();
            $("#pauseButton").html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-play-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z\"/>\n" +
                "</svg> Resume");
        } else if (recorder.state === "paused") {
            //resume
            recorder.resume();
            $("#pauseButton").html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pause-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z\"/>\n" +
                "</svg> Pause");
        }
    }

    function stopRecording() {
        //disable the stop button, enable the record to allow new recordings
        $("#stopButton").prop("disabled", true);
        $("#recordButton").prop("disabled", false);
        $("#pauseButton").prop("disabled", true);

        //reset button just in case the recording is stopped while paused
        $("#pauseButton").html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pause-fill\" viewBox=\"0 0 16 16\">\n" +
            "  <path d=\"M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z\"/>\n" +
            "</svg> Pause");

        //tell the recorder to stop the recording
        recorder.stop();

        //stop microphone access
        gumStream.getAudioTracks()[0].stop();
    }

    function AudioPreview() {
        if (audio !== null && audio.current !== null) {
            const recording = URL.createObjectURL(audio);
            setRec(recording);
            return (
                <audio src={recording} controls/>
            );
        }
    }

    return (
        <>
            <div>
                <div id="controls" className="mb-3">
                    <button id="recordButton" className="btn btn-primary me-1" onClick={startRecording}>
                        <i className="bi bi-mic-fill"/> Record
                    </button>
                    <button id="pauseButton" className="btn btn-info me-1" onClick={pauseRecording}>
                        <i className="bi bi-pause-fill"/> Pause
                    </button>
                    <button id="stopButton" className="btn btn-secondary" onClick={stopRecording}>
                        <i className="bi bi-stop-fill"/> Stop
                    </button>
                </div>
                <AudioPreview/>
            </div>
        </>
    );
};

export default RecordAudio;