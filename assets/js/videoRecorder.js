const { initialize } = require("passport");

const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async() => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    videoPreview.srcObject = stream;
    videoPreview.play();
  } catch(error) {
    console.log('ERROR~!!', error)
    recordBtn.innerHTML = "Cant Record";
    recordBtn.removeEventListener("click", startRecording);
  }
}

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if(recorderContainer) {
  init();
}