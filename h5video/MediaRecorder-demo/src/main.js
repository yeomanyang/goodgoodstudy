let startButton = document.querySelector("button#start");
let playButton = document.querySelector("button#play");
let downloadButton = document.querySelector("button#download");
let uploadButton = document.querySelector("button#upload");
let recordVideo = document.querySelector("#recordvideo");
let playVideo = document.querySelector("#playvideo");
let audioRate = document.querySelector("#audioRate");
let videoRate = document.querySelector("#videoRate");
let uploadInput = document.querySelector("#uploadInput");

startButton.onclick = toggleRecording;
downloadButton.onclick = download;
playButton.onclick = play;
uploadButton.onclick = upload;

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
        audioBitsPerSecond: Number(audioRate.value) * 1000 || 128000,
        videoBitsPerSecond: Number(videoRate.value) * 1000 || 400000,
        mimeType: "video/webm"
    };
    try {
        mediaRecorder = new MediaRecorder(stream, options);
        startButton.textContent = "Stop Recording";
        playButton.disabled = true;
        downloadButton.disabled = true;
        downloadButton.disabled = true;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
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
    uploadButton.disabled = false;
}

// 播放录制的视频
function play() {
    let blob = new Blob(chunks, { type: "video/webm" });
    playVideo.src = window.URL.createObjectURL(blob);
    playVideo.play();
}

// 下载录制的视频
function download() {
    const blob = new Blob(chunks, { type: "video/mp4" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
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

// 上传到服务器
function upload() {
    const blob = new Blob(chunks, { type: "video/mp4" });

    const formData = new FormData();
    formData.append('file', blob, 'demo.mp4');
    formData.append('fileSize', 123);
    formData.append('stockId', 1234);
    formData.append('logisticBill', 'test');
    formData.append('createBy', 'yeoman');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadInput.value);

    xhr.send(formData);
}

window.addEventListener('beforeunload', function(ev) {
    // console.log(123);
    // stopRecording();
    upload();
    return ev.returnValue = 'My reason';
})
