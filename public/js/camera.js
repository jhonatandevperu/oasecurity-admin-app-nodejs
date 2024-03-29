"use strict";

async function getMediaStreamFromUser(withAudio = false) {
  try {
    const md = new MobileDetect(window.navigator.userAgent);
    return await navigator.mediaDevices.getUserMedia(
      md.mobile()
        ? {
            audio: withAudio,
            video: {
              width: { min: 640, ideal: 800, max: 1280 },
              height: { min: 480, ideal: 600, max: 720 },
              facingMode: "user",
            },
          }
        : {
            audio: withAudio,
            video: {
              width: { min: 640, ideal: 800, max: 1280 },
              height: { min: 480, ideal: 600, max: 720 },
            },
          }
    );
  } catch (error) {
    throw new Error("Error on getMediaStreamFromUser: ", error);
  }
}

function setVideoMediaStream(
  videoElement = HTMLVideoElement,
  stream = MediaStream
) {
  if ("srcObject" in videoElement) {
    videoElement.srcObject = stream;
  } else {
    videoElement.src = window.URL.createObjectURL(stream); // for older browsers
  }
}
