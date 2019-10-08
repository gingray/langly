$(document).ready(() => {
    const recorder = document.getElementById('recorder');
    const player = document.getElementById('player');

    recorder.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        // Do something with the audio file.
        player.src = url;
    });

    let shouldStop = false;
    let stopped = false;
    const downloadLink = document.getElementById('download');
    const stopButton = document.getElementById('stop');
    const startButton = document.getElementById('start');

    stopButton.addEventListener('click', function() {
        shouldStop = true;
    });

    const handleSuccess = function(stream) {
        const context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(1024, 1, 1);

        source.connect(processor);
        processor.connect(context.destination);

        processor.onaudioprocess = function(e) {
            // Do something with the data, e.g. convert it to WAV
            console.log(e.inputBuffer);
        };
    };

    startButton.addEventListener('click', function () {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(handleSuccess);
    })

});
