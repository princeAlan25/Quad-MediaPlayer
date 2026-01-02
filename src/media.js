//code block to activate the navigation buttons
const navsArray = ["audio-nav","image-nav","video-nav","document-nav"]
function activateClickedNav(cls){
    //play their button sounds effects first;
    const menuButtonSoundAudio = document.getElementById("menuButtonSound")
    menuButtonSoundAudio.currentTime=0
     //play sound
     menuButtonSoundAudio.play()

    //continue
    const clickedNav = document.getElementById(cls)
    clickedNav.style.background="linear-gradient(to right,rgba(0, 0, 0, 0.452),rgba(255, 255, 255, 0.521))"
    for(let i = 0;i<navsArray.length;i++){
        if(navsArray[i]!=cls){
            const unClickedNav = document.getElementById(navsArray[i])
            clickedNav.addEventListener("mouseover",()=>{
                clickedNav.style.background="linear-gradient(to right,rgba(0, 0, 0, 0.452),rgba(255, 255, 255, 0.521))"
            })
            clickedNav.addEventListener("mouseleave",()=>{
                clickedNav.style.background="linear-gradient(to right,rgba(0, 0, 0, 0.452),rgba(255, 255, 255, 0.521))"
            })
            unClickedNav.style.background="none"
            unClickedNav.addEventListener("mouseover",()=>{
                unClickedNav.style.background="linear-gradient(to left,rgba(0, 0, 0, 0.452),rgba(255, 255, 255, 0.521))"
            })
            unClickedNav.addEventListener("mouseleave",()=>{
                unClickedNav.style.background="none"
            })
        }
    }

    //showing its corresponding main content div audio/video/image or document div
    const audioMain = document.querySelector("#audios-main")
    const imageMain = document.querySelector("#images-main")
    const videoMain = document.querySelector("#videos-main")
    const documentMain = document.querySelector("#documents-main")
    if(cls == "audio-nav"){
        audioMain.style.display="flex"
        imageMain.style.display="none"
        videoMain.style.display="none"
        documentMain.style.display="none"
    }else if(cls == "image-nav"){
        audioMain.style.display="none"
        imageMain.style.display="flex"
        videoMain.style.display="none"
        documentMain.style.display="none"
    }else if(cls == "video-nav"){
        audioMain.style.display="none"
        imageMain.style.display="none"
        videoMain.style.display="flex"
        documentMain.style.display="none"
    }else if(cls == "document-nav"){
        audioMain.style.display="none"
        imageMain.style.display="none"
        videoMain.style.display="none"
        documentMain.style.display="flex"
    }
}
//end********

//function to switch mp3 device on and off
let playState = false;
const audioEle = document.getElementById("audio-tag");
let switchedOn = false;
function switchMp3Device(){
    const ownSound = document.getElementById("switchingMp3")
    ownSound.currentTime=0
    

    switchedOn = !switchedOn
    const powerButton = document.getElementById("power-button")
    const songListPart = document.getElementById("song-list-part")
    const songsListHolder = document.getElementById("songs-list-holder")
    if(switchedOn){
        ownSound.src = "./butttonSounds/wrong-answer-129254.mp3"
        ownSound.play()

        songListPart.style.transitionDuration="300ms"
        songsListHolder.style.transitionDuration="400ms"
        powerButton.style.color="rgb(0, 163, 68)"
        powerButton.style.animation="powerButtonOn 1s linear infinite"
        songListPart.style.background="linear-gradient(white,lightblue)";
        songsListHolder.style.display="block"
    }else{
        ownSound.src = "./butttonSounds/melancholy-ui-chime-47804.mp3"
        ownSound.play()

        songListPart.style.transitionDuration="300ms"
        songsListHolder.style.transitionDuration="200ms"
        powerButton.style.color="rgb(180, 0, 30)"
        powerButton.style.animation="none"
        songListPart.style.background="linear-gradient(45deg,black,rgb(116, 115, 115),black)"
        songsListHolder.style.display="none"
        //stop key function operate on audio element
        audioEle.pause();
        audioEle.currentTime=0
        playState=false;
        playPauseAudio()
    }
}
//end*****

//function to show/hide setting bar
let showSetting = false;
function showSettingBar(){
    const ownSound = document.getElementById("mp3SettingSound")
    ownSound.currentTime=0
    ownSound.play()

    showSetting = !showSetting;
    const audioSettingSide = document.getElementsByClassName("audio-settings-side")[0]
    const settingButton = document.getElementById("setting-button")
    if(showSetting){
        settingButton.style.transitionDuration="300ms"
        audioSettingSide.style.transitionDuration="500ms"
        audioSettingSide.style.width="60%"
        settingButton.style.transform="rotate(90deg)"
        settingButton.style.color="orange"
    }else{
        settingButton.style.transitionDuration="300ms"
        audioSettingSide.style.transitionDuration="500ms"
        audioSettingSide.style.width="0%"
        settingButton.style.transform="rotate(0deg)"
        settingButton.style.color = "white"
    }
}

//function to upload and handle the audios
let filesUrls = [];
let songListItems = []
function uploadAudios(){
    const fileInput = document.getElementById("file-input")
    for(let init = 0;init<fileInput.files.length;init++){
        const urlObject = URL.createObjectURL(fileInput.files[init])
        filesUrls.push(urlObject)
        const songDetailHolder = `<span class='song-detail-holder'>
        <i class='fa fa-headphones'></i>
        <p class='song-list-name' id='song${init}' onclick='getClickedSong(this.id)'>${fileInput.files[init].name}</p>
        <i class='fa fa-trash' id='trash-button${init}' onclick='removeChosenSongFromList(this.id)'></i>
        </span>`
        songListItems.push(songDetailHolder)
    }
    //set all songs into mp3 tab
    const allSongsSpace = document.getElementById("songs-list-holder")
    allSongsSpace.innerHTML=songListItems.join("")
    //play audio immediately
    let audioTag = document.getElementById("audio-tag")
    audioTag.src=filesUrls[0]
    if(switchedOn){
        audioTag.play()
    }else{
        audioTag.pause()
    }
}

//functions to play next song and previous song
let startSongIndex = 0;
function playNextSong(){
    if(switchedOn){
        if(startSongIndex>=filesUrls.length-1){
            startSongIndex = filesUrls.length-1
        }else{
            startSongIndex += 1
        }
        let audioTag = document.getElementById("audio-tag")
        audioTag.src=filesUrls[startSongIndex]
        audioTag.play()
    }
}
function playPreviousSong(){
    if(switchedOn){
        if(startSongIndex<=0){
            startSongIndex = 0;
        }else{
            startSongIndex -= 1
        }
        let audioTag = document.getElementById("audio-tag")
        audioTag.src=filesUrls[startSongIndex]
        audioTag.play()
    }
}

//code block to loop and repeat the playlist;
let randomPlay = false;
let loopChangeCounter = 1;
const audioElement = document.getElementById("audio-tag")
audioElement.addEventListener("ended",()=>{
    if(switchedOn){
        if(loopChangeCounter==2){
            playNextSong();
            if(startSongIndex==filesUrls.length-1){
                startSongIndex=0;
            }
        }else if(loopChangeCounter==3){
            startSongIndex=startSongIndex
            audioElement.src = filesUrls[startSongIndex]
            audioElement.play()
        }else if(loopChangeCounter==1 && !randomPlay){
            audioElement.pause()
        }
    
        //randomize the audio playing procedure
        if(randomPlay){
            let randomIndex = Math.floor(Math.random(0)*filesUrls.length-1);
            if(startSongIndex==randomIndex){
                startSongIndex = Math.floor(Math.random(0)*filesUrls.length-1);
            }else{
                startSongIndex = randomIndex;
            }
            playNextSong()
        }
    }
})

//function to activate InfiniteLoop
function setInfiniteLoop(){
    const loopButton = document.getElementById("loop-button")
    const randomButton = document.getElementById("random-button")
    randomPlay=false;
    if(switchedOn){
        if(loopChangeCounter>=3){
            loopChangeCounter = 1;
        }else{
            loopChangeCounter++;
        }
    
        //apply loop button color
        if(loopChangeCounter==1){
            loopButton.style.color="brown"
            loopButton.innerText=""
        }else if(loopChangeCounter==2){
            loopButton.style.color="red"
            loopButton.innerText=""
        }else if(loopChangeCounter==3){
            loopButton.style.color="red"
            loopButton.innerText=1
        }
        //set random button to default
        randomButton.style.color="brown"
    }
}

//function to play all audios randomly
function setRandomPlay(){
    if(switchedOn){
        randomPlay=!randomPlay;
        loopChangeCounter = 1;
        const randomButton = document.getElementById("random-button")
        const loopButton = document.getElementById("loop-button")
        if(randomPlay){
            randomButton.style.color="red"
            loopButton.style.color="brown"
            loopButton.innerText=""
        }else{
            randomButton.style.color="brown"
        }
    }
}
//codes block end

//function to restart playlist
function restartPlayList(){
    if(switchedOn){
        startSongIndex = 0;
        audioElement.src = filesUrls[startSongIndex]
        audioElement.play();
    }
}

//function to play and pause audio
function playPauseAudio(){
    const iconTag = document.getElementById("play-pause");
    if(switchedOn){
        playState = !playState
        if(playState && audioElement.getAttribute("src")){
            audioElement.play()
            iconTag.setAttribute("class","fa fa-pause")
            iconTag.style.color="pink"
        }else{
            iconTag.setAttribute("class","fa fa-play")
            iconTag.style.color="brown"
            audioElement.pause()
        }
    }
}

//function to change play/pause button according to the audio state
function changePlayPauseButton(){
    function markSongBeingPlayed(){
        const songsSpace = document.getElementById("songs-list-holder")
        for(let init = 0;init<songListItems.length;init++){
            if(init!=startSongIndex){
                const songElement = songsSpace.children[init]
                songElement.style.background="transparent";
                songElement.style.fontWeight="normal";
                
            }else{
                const songElement = songsSpace.children[init]
                songElement.style.background="linear-gradient(pink,transparent)"
                songElement.style.fontWeight="bold";
            }
        }
    }

    const iconTag = document.getElementById("play-pause");
    audioElement.addEventListener("play",()=>{
        iconTag.setAttribute("class","fa fa-pause")
        iconTag.style.color="pink"
        playState = true;
        markSongBeingPlayed()
    })
    audioElement.addEventListener("pause",()=>{
        iconTag.setAttribute("class","fa fa-play")
        iconTag.style.color="brown"
        playState = false;
    })
}
changePlayPauseButton()

//function to get current song list item clicked id

function getClickedSong(songId){
    const fetchingSon = songListItems.filter((songItem)=>{
        const exist = songItem.match(songId)
        if(exist){
            return songItem;
        }
    })
    const fetchedSongIndex = songListItems.indexOf(fetchingSon[0])
    startSongIndex = fetchedSongIndex
    audioElement.src=filesUrls[startSongIndex]
    audioElement.play()
}

//function to delete one song at time
let allDeletedSongs=[]
let allDeletedUrls = []
let trashCenter = []
function removeChosenSongFromList(deleteButtonId){
    const matchedFromSongsList = songListItems.filter((songElement)=>{
        const matched = songElement.match(deleteButtonId)
        if(matched){
            return songElement;
        }
    })
    const matchedSongIndex = songListItems.indexOf(matchedFromSongsList[0])
    allDeletedSongs.push(songListItems.splice(matchedSongIndex,1))
    allDeletedUrls.push(filesUrls.splice(matchedSongIndex,1))
    const songsSpace = document.getElementById("songs-list-holder")
    songsSpace.innerHTML=songListItems.join("");
    if(matchedSongIndex<startSongIndex){
        startSongIndex--
    }
    audioElement.src=filesUrls[startSongIndex]
    audioElement.play()

    //pass into trash space
    const trashSpaceElement = document.getElementById("sub-setting-trash")
    let firstSongNameIndex = matchedFromSongsList[0].indexOf(".id)'>")+6
    let lastSongNameIndex = matchedFromSongsList[0].indexOf("</p>")-1
    let filteredDeletedSongName = "";
    for(firstSongNameIndex;firstSongNameIndex<=lastSongNameIndex;firstSongNameIndex++){
        filteredDeletedSongName+=matchedFromSongsList[0][firstSongNameIndex];
    }
    const deletedSong = `<span><p>${filteredDeletedSongName}</p></span>`
    trashCenter.push(deletedSong)
    trashSpaceElement.innerHTML=trashCenter.join("")
    if(trashCenter.length>6){
        trashSpaceElement.style.overflowY="scroll"
    }

}

function clearTrash(){
    allDeletedSongs = []
    allDeletedUrls=[]
    const trashSpaceElement = document.getElementById("sub-setting-trash")
    const resetTrashElementTextContent = `<span><p class="deleted-song">deleted song</p></span>`
    trashSpaceElement.innerHTML = resetTrashElementTextContent;
}
//end of audio's codes for interaction


//set menu's buttons sounds