const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async() => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 1280,
        height: 720
      }
    });
    videoPreview.srcObject = stream;
    videoPreview.play();
    videoPreview.muted = true;
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