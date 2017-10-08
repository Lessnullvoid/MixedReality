/*
mixedReality.
=============
>> interspecifics // mecanosaurio
<< abandon normal devices 2017
*/

// camera activation handling
// runs after DOM is loaded

document.addEventListener('DOMContentLoaded', function () {

    // References to all the element we will need.
    var video = document.querySelector('#camera-stream'),
        image = document.querySelector('#snap'),
        start_camera = document.querySelector('#start-camera'),
        error_message = document.querySelector('#error-message');


    // prefix to use getUserMedia interface for handling camera input.
    navigator.getMedia = ( 
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.mediaDevices.getUserMedia
    );


    if(!navigator.getMedia){
        displayErrorMessage("[x.X]: el navegador no soporta la interface navigator.getUserMedia.");
    }
    else{
        // request the cam
        navigator.getMedia(
            {
                video: true
            },
            // success callback
            function(stream) {
                // create URL for stream, then play
                video.src = window.URL.createObjectURL(stream);
                //video.src = stream;
                video.play();
                video.onplay = function() {
                    showVideo();
                };

            },
            // error callback
            function(err) {
                displayErrorMessage("[x.X]: error con el stream de cámara: " + err.name, err);
            }
        );
    }

    // button to start playing on mobile browsers.
    start_camera.addEventListener("click", function(e) {
        e.preventDefault();
        video.play();
        showVideo();
    });


    function showVideo() {
        hideUI();
        video.classList.add("visible");
    }


    function displayErrorMessage(error_msg, error) {
        error = error || "";
        if(error){
            console.error(error);
        }
        error_message.innerText = error_msg;
        hideUI();
        error_message.classList.add("visible");
    }

   
    function hideUI() {
        // Clearing the app UI.
        start_camera.classList.remove("visible");
        video.classList.remove("visible");
        snap.classList.remove("visible");
        error_message.classList.remove("visible");
    }
});
