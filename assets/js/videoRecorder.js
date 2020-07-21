const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  //video를 녹화시작하거나 도중에는 event를 얻을수 없다,
  const { data:videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = `${Date.now()}.webm`;
  document.body.appendChild(link);
  link.click();
  
}


const startRecording = () => {
  //비디오스트림 파일이 있어야 레코드가 가능하다 그러므로 streamObject파일에 stream을 넣어서
  //전역변수로 선언하고 생성자 함수인 new MediaRecorder을 활용하여 전역변수 streamObject를 넣어준다.

  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
  
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
}

const getVideo = async() => {
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
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch(error) {
    recordBtn.innerHTML = "Cant Record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
}

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if(recorderContainer) {
  init();
}