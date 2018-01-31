let startButton = document.querySelector("button#start");
let playButton = document.querySelector("button#play");
let downloadButton = document.querySelector("button#download");
let recordVideo = document.querySelector("#recordvideo");
let playVideo = document.querySelector("#playvideo");

startButton.onclick = toggleRecording;
downloadButton.onclick = download;
playButton.onclick = play;

let mediaRecorder;
let stream;
let chunks = [];

const constraints = {
    audio: true,
    video: true
};

// 获取提示用户允许使用一个视频/音频设备
const getMedia = (async constraints => {
    try {
        const result = await navigator.mediaDevices.getUserMedia(constraints);
        stream = result;
        let video = recordVideo;
        video.src = window.URL.createObjectURL(stream);
        video.onloadedmetadata = function(e) {
            video.play();
        };
    } catch (error) {
        console.error(error);
        alert("你这操作，没法演示了(╯°Д°)╯︵ ┻━┻");
    }
})(constraints);

// 开始录制和结束录制
function toggleRecording() {
    if (startButton.textContent === "Start Recording") {
        startRecording();
    } else {
        stopRecording();
    }
}

// 保存视频流
function handleDataAvailable(e) {
    chunks.push(e.data);
}

// 开始录制
function startRecording() {
    let options = {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: "video/webm"
    };
    try {
        mediaRecorder = new MediaRecorder(stream, options);
        startButton.textContent = "Stop Recording";
        playButton.disabled = true;
        downloadButton.disabled = true;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(10);
    } catch (err) {
        console.error(err);
        alert("请使用Chrome 47以上版本浏览器！");
    }
}

// 结束录制
function stopRecording() {
    mediaRecorder.stop();
    startButton.textContent = "Start Recording";
    playButton.disabled = false;
    downloadButton.disabled = false;
}

// 播放录制的视频
function play() {
    let blob = new Blob(chunks, { type: "video/webm" });
    playVideo.src = window.URL.createObjectURL(blob);
    playVideo.play();
}

// 下载录制的视频
function download() {
    var blob = new Blob(chunks, { type: "video/mp4" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "demo";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 50);
}
