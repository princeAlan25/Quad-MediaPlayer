//function to toggle all uploaded videos space
let showVideos=false;
function toggleVideosSpace(){
    showVideos=!showVideos;
    const allUploadedVideos = document.getElementsByClassName("all-uploaded-videos")[0];
    const toggleButton = document.getElementsByClassName("more-videos")[0]
    if(showVideos){
        toggleButton.style.transitionDuration="200ms"
        toggleButton.style.transform = "rotate(90deg)"

        allUploadedVideos.style.transitionDuration = "200ms"
        allUploadedVideos.style.height = "85%";
        allUploadedVideos.style.padding = "2%"
        allUploadedVideos.style.boxShadow = "0px 0px 4px 2px black"
    }else{
        toggleButton.style.transitionDuration="200ms"
        toggleButton.style.transform = "rotate(0deg)"

        allUploadedVideos.style.transitionDuration = "200ms"
        allUploadedVideos.style.height = "0";
        allUploadedVideos.style.padding = "0"
        allUploadedVideos.style.boxShadow = "none"
    }
}
//function to return displayed all-uploaded-videos element to display none;
function hideVideosSpaceElement(){
    const allUploadedVideos = document.getElementsByClassName("all-uploaded-videos")[0];
    allUploadedVideos.addEventListener("mouseleave",()=>{
        showVideos = true;
        toggleVideosSpace()
    })
}
hideVideosSpaceElement();



//event code block to upload videos files
const allVideoElements = []
const allVideoUrls = []
const allVideoInformation = []
const actualVideoElement = document.getElementById("actual-video")
const autoNextVideosHolder = document.getElementsByClassName("auto-next-videos-holder")[0];
const videoInput = document.getElementById("video-input")
const allVideosHolder = document.getElementsByClassName("all-uploaded-videos")[0]
const allVideoIds = [];
let currentVideoIndex;

let functioningAutoPlayer=true;
videoInput.addEventListener("change",()=>{
    const videoFilesArray = videoInput.files;
    for(let init = 0;init<videoFilesArray.length;init++){
        const videoUrl = URL.createObjectURL(videoFilesArray[init])
        const videoName = videoFilesArray[init].name;
        const videoSize = videoFilesArray[init].size;
        const videoModificationDate = videoFilesArray[init].lastModifiedDate;
        const eachVideoElement = `<div class='video-holder' id='video${allVideoElements.length}' onclick='activateClickedVideo(this.id)'>
                                        <video src='${videoUrl}'></video>
                                    </div>`
        allVideoElements.push(eachVideoElement)
        allVideoUrls.push(videoUrl)
        allVideoInformation.push({
            video_name:videoName,
            video_size: videoSize,
            video_modification_date: videoModificationDate
        })
    }
    allVideosHolder.innerHTML=allVideoElements.join("");

    if(videoInput.value){
        const formElement = document.querySelector(".video-upload-form")
        formElement.style.transitionDuration = "200ms"
        formElement.style.boxShadow = "0px 0px 4px 2px green"
    }

    //store video id's
    for(let init = 0;init<allVideoElements.length;init++){
        allVideoIds.push(`video${init}`)
    }

    //play first video by default
    currentVideoIndex = currentVideoIndex?currentVideoIndex:0;
    actualVideoElement.src = allVideoUrls[currentVideoIndex]
    actualVideoElement.play();
    //apply video information ot the text screen element
    applyVideoInformation(currentVideoIndex)
    functioningAutoPlayer=false;
})

//function to activate and play the current clicked video item
function activateClickedVideo(videoId){
    functioningAutoPlayer=false;
    const trackedVideo = document.getElementById(videoId)
    //1st. activate video by signs
    trackedVideo.style.transitionDuration = "200ms"
    trackedVideo.style.opacity = "1"
    trackedVideo.style.boxShadow = "0px 0px 5px 3px pink"
    for(let init = 0;init<allVideoIds.length;init++){
        if(allVideoIds[init]!=videoId){
            const unActivatedVideo = document.getElementById(allVideoIds[init])
            unActivatedVideo.style.transitionDuration = "200ms"
            unActivatedVideo.style.boxShadow = "0px 0px 4px 2px black"
        }
    }
    
    //2nd. track it's dependent video details form saved one's

    const trackedVideoElement = allVideoElements.filter((videoElement)=>{
        let matcher = videoElement.match(videoId)
        if(matcher){
            return videoElement;
        }
    })[0]
    const videoIndex = allVideoElements.indexOf(trackedVideoElement)
    currentVideoIndex = videoIndex;
    actualVideoElement.src = allVideoUrls[currentVideoIndex]
    actualVideoElement.play();
    //apply video information ot the text screen element
    applyVideoInformation(currentVideoIndex)
}

//function to activate the current played video
function activateCurrentPlayedVideo(){
    actualVideoElement.addEventListener("playing",()=>{
        const matchVideoElementBySrc = allVideoElements.filter((videoElement)=>{
            let matcher = videoElement.match(actualVideoElement.getAttribute("src"))
            if(matcher){
                return videoElement;
            }
        })[0]
        const videoElementIndex = allVideoElements.indexOf(matchVideoElementBySrc)
        currentVideoIndex = videoElementIndex;
        allVideosHolder.children[currentVideoIndex].style.transitionDuration = "200ms"
        allVideosHolder.children[currentVideoIndex].style.boxShadow = "0px 0px 5px 3px pink"
        allVideosHolder.children[currentVideoIndex].addEventListener("mouseover",()=>{
            allVideosHolder.children[currentVideoIndex].style.opacity="1"
            applyVideoInformation(currentVideoIndex,"white")
        })
        for(let init = 0;init<allVideoElements.length;init++){
            if(init!=currentVideoIndex){
                allVideosHolder.children[init].style.transitionDuration = "200ms"
                allVideosHolder.children[init].style.boxShadow = "0px 0px 4px 2px black"
                allVideosHolder.children[init].addEventListener("mouseover",()=>{
                    allVideosHolder.children[init].style.opacity="0.5";
                    applyVideoInformation(init,"brown")
                })
                allVideosHolder.children[init].addEventListener("mouseleave",()=>{
                    allVideosHolder.children[init].style.opacity="1"
                    applyVideoInformation(currentVideoIndex,"white")
                })
            }
        }
        //apply video information ot the text screen element
        applyVideoInformation(currentVideoIndex)
    })
}
activateCurrentPlayedVideo()

//function to play next video
function playNextVideo(){
    functioningAutoPlayer=false;
    if(currentVideoIndex==allVideoElements.length-1){
        currentVideoIndex = allVideoElements.length-1
    }else{
        currentVideoIndex++
    }
    actualVideoElement.src = allVideoUrls[currentVideoIndex]
    actualVideoElement.play()
    //apply video information ot the text screen element
    applyVideoInformation(currentVideoIndex)
}

//function to play previous video
function playPreviousVideo(){
    functioningAutoPlayer=false;
    if(currentVideoIndex==0){
        currentVideoIndex = 0
    }else{
        currentVideoIndex--
    }
    actualVideoElement.src = allVideoUrls[currentVideoIndex]
    actualVideoElement.play()
    //apply video information ot the text screen element
    applyVideoInformation(currentVideoIndex)
}

//function to auto show the next video ready to played when current is end
const secondsCounterButton = document.getElementsByClassName("seconds-counter")[0]
const nextNotifier = document.getElementById("next-notifier")
const autoNextVideo = document.getElementsByClassName("auto-next-video")[0]
function prepareAutoNextVideo(){
    //style next notifier button inside the next video

    actualVideoElement.addEventListener("ended",()=>{
        functioningAutoPlayer = true;
        const nextVideoIndex = currentVideoIndex+1;
        autoNextVideo.src=allVideoUrls[nextVideoIndex];
        autoNextVideosHolder.style.transitionDuration="200ms";
        autoNextVideosHolder.style.display="flex";
        
        //sub-function to count number of seconds left
        function secondsCounter(seconds){
            setTimeout(()=>{
                if(seconds == 0 && functioningAutoPlayer){
                    nextNotifier.innerHTML=5;
                    currentVideoIndex = currentVideoIndex==allVideoUrls.length-1?0:currentVideoIndex+1;
                    actualVideoElement.src=allVideoUrls[currentVideoIndex]
                    actualVideoElement.play()
                    autoNextVideosHolder.style.transitionDuration="200ms";
                    autoNextVideosHolder.style.display="none";
                    //apply video information ot the text screen element
                    applyVideoInformation(currentVideoIndex)
                    return currentVideoIndex;
                }else if(!functioningAutoPlayer){
                    nextNotifier.innerHTML=5;
                    autoNextVideosHolder.style.transitionDuration="200ms";
                    autoNextVideosHolder.style.display="none";
                    return currentVideoIndex;
                }else{
                    nextNotifier.innerHTML=seconds;
                    secondsCounter(seconds-1)
                }
            },1000)
            
        }
        secondsCounter(4)
    })
}
prepareAutoNextVideo()

//function to apply the name,size nad modification data of the video
function applyVideoInformation(VideoInformationIndex,specifierColor="white"){
    const videoTextScreen = document.getElementById("text-screen")
    const currentVideoInformation = allVideoInformation[VideoInformationIndex]
    const currentVideoInformationElements = `<p><font color="black" style="font-weight: bold;">Video Name: </font><span style="color:${specifierColor};">${currentVideoInformation.video_name}</span></p>
                                            <p><font color="black" style="font-weight: bold;">Video Size: </font><span style="color:${specifierColor};">${currentVideoInformation.video_size}KB</span></p>
                                            <p><font color="black" style="font-weight: bold;">Modification Date: </font><span style="color:${specifierColor};">${currentVideoInformation.video_modification_date}</span></p>`;
    videoTextScreen.innerHTML=currentVideoInformationElements;
}