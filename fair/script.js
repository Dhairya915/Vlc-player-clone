const videoBtn=document.querySelector("#videoBtn");
const videoInput=document.querySelector("#videoInput");
const videoPlayer = document.querySelector("#main");
const totalTimeElem = document.querySelector("#totalTime");
const currentTimeElem = document.querySelector("#currentTime");
const slider = document.querySelector("#slider");

let video = "";
let duration;
let timerObj;
let currentPlayTime = 0;
let isPlaying = false;

const handleInput = () =>{
    videoInput.click();
}

const acceptInputHandler = (Obj) => {
    const selectedVideo = Obj.target.files[0];
    //src -> base
    const link= URL.createObjectURL(selectedVideo);

    const videoElement = document.createElement("video");
    videoElement.src= link;
    //now it is done

    videoElement.setAttribute("class","video");
    // videoElement.controls="true";
    videoPlayer.appendChild(videoElement);
    video = videoElement;
    isPlaying=true;
    setPlayPause();
    videoElement.play();
    videoElement.volume = 0.3;
    videoElement.addEventListener("loadedmetadata", function () {
        // it gives in decimal value -> convert that into seconds
        duration = Math.round(videoElement.duration);
        // convert seconds into hrs:mins:secs
        let tottime = timeFormate(duration);
        totalTimeElem.innerText = tottime;
        
        //current time
        videoElement.addEventListener("timeupdate",() => {
          currentTimeElem.innerText = timeFormate(videoElement.currentTime);
        })
        
      })
}

videoBtn.addEventListener("click",handleInput);
//when the file is selected
videoInput.addEventListener("change",acceptInputHandler);

/***********************************************************************88 */

const speedUp=document.querySelector("#speedUp");
const speedDown=document.querySelector("#speedDown");
const volumeUp=document.querySelector("#volumeUp");
const volumeDown=document.querySelector("#volumeDown");
const toast=document.querySelector(".toast");



const speedUpHandler = () => {
    
   const videoElement = document.querySelector("video");
   if(videoElement == null)
   {
     return;
   }

   if(videoElement.playbackRate > 3){
    return ;
   }
    
   const increaseSpeed = videoElement.playbackRate + 0.5;
   videoElement.playbackRate = increaseSpeed;
   showToast(increaseSpeed + "X");
}

const speedDownHandler = () => {

     const videoElement = document.querySelector("video");
   if(videoElement == null)
   {
     return;
   }

   if(videoElement.playbackRate > 0){
    
     const decreaseSpeed = videoElement.playbackRate - 0.5;
     videoElement.playbackRate = decreaseSpeed;
     showToast(decreaseSpeed + "X");
   }
    
  
}


const volumeUpHandler = () => {
 
  const videoElement = document.querySelector("video");
  if(videoElement == null){
     return;
   }


  if(videoElement.volume >= 0.99){
    return;
  }

   const increaseVolume = videoElement.volume + 0.1;
   videoElement.volume = increaseVolume;
   const percentage = (increaseVolume*100) + "%";
   showToast(percentage);
   
}


const volumeDownHandler =  () => {

   const videoElement = document.querySelector("video");
  if(videoElement == null){
     return;
   }

  
  if(videoElement.volume <= 0.1){
    videoElement.volume = 0 ;
  }

  if(videoElement.volume>0.1){

   const decreaseVolume = videoElement.volume - 0.1;
   videoElement.volume = decreaseVolume;
   const percentage = (decreaseVolume*100) + "%";
   showToast(percentage);
  }
}

function showToast(message){

     toast.textContent = message;
     toast.style.display = "block";
     setTimeout(()=>{
        toast.style.display = "none"
     },1000);

}


speedUp.addEventListener("click",speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);
volumeUp.addEventListener("click",volumeUpHandler);
volumeDown.addEventListener("click",volumeDownHandler);

/******************************************************* */
const handleFullScreen = () => {
    videoPlayer.requestFullscreen();
}

const fullScreenElem = document.querySelector("#fullScreen");
fullScreenElem.addEventListener("click", handleFullScreen);

slider.addEventListener("click", e => {
  let timelineWidth = e.target.clientWidth;
  videoElement.currentTime = (e.offsetX / timelineWidth) * videoElement.duration;
})


/***************forward and backward button******************************************* */
// function forward(){
   
// }
// function backward(){
  
// }
// const backwardBtn = document.querySelector("#backwardBtn");
// const forwardBtn = document.querySelector("#forwardBtn");
// backwardBtn.addEventListener("click",backward);
// forwardBtn.addEventListener("click",forward);

/***************************control buttons***************************** */

const playPauseContainer = document.querySelector("#playPause");
function setPlayPause(){
  if(isPlaying === true){
    playPauseContainer.innerHTML= '<i class="fa-solid fa-play"></i>';
    video.play();
  }
  else{
    playPauseContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';
    video.pause();
  }
}

playPauseContainer.addEventListener("click",function(e){
  if(video){
    isPlaying =! isPlaying;
    setPlayPause();
  }
})

/***************************************************************/
//formate duration
function timeFormate(timeCount) {
    let time = '';
    const sec = parseInt(timeCount, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds
    time = `${hours}:${minutes}:${seconds}`;
    return time;
}