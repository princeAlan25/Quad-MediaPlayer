
//code block to upload the images
const allUploadedImages = [];
const allImagesUrlBlobs = []
const fileInput = document.getElementById("images-file-input")
const allImages=[]
const allImageSlides = []
let currentImageIndex = 0;
let newUpdatedSlides = [];
let upcomingImage;
fileInput.addEventListener("change",()=>{
    const blobFiles = fileInput.files;
    for(let init = 0;init<blobFiles.length;init++){
        const urlBlob = URL.createObjectURL(blobFiles[init])
        allImagesUrlBlobs.push(urlBlob)

        const ImageElement = `<img src='${urlBlob}' width='300' id='image${allUploadedImages.length}' onclick='getClickedImage(this.id)' alt='uploaded image'>`
        allUploadedImages.push(ImageElement)

        allImages.push(`image${init}`)
    }

    //apply images into images-side as the image array screen display
    const ImagesSpaceElement = document.getElementsByClassName("images-side")[0]
    ImagesSpaceElement.innerHTML=allUploadedImages.join("")
})

//function to get image being clicked to be viewed

function getClickedImage(imageId){
    const clickedImage = document.getElementById(imageId)
    clickedImage.style.border="3px solid pink"
    for(let init = 0;init<allImages.length;init++){
        if(allImages[init]!=imageId){
            const unClickedImage = document.getElementById(allImages[init])
            unClickedImage.style.border="none"
        }
    }
    //get image index
    const matchImageInArray = allUploadedImages.filter((imageData)=>{
        let matcher = imageData.match(imageId)
        if(matcher){
            return imageData
        }
    })
    const imageIndex = allUploadedImages.indexOf(matchImageInArray[0])
    currentImageIndex = imageIndex;
    //set the clicked image to the viewed-image-holder as its background

    const viewedImageHolder = document.getElementById("viewed-image-holder");
    viewedImageHolder.style.transitionDuration="200ms"
    viewedImageHolder.style.transform="scale(1)"
    viewedImageHolder.style.backgroundImage=`url(${clickedImage.getAttribute('src')})`

    //apply all mages to the slide side to be slidden
    const imagesSlider = document.getElementsByClassName("image-slider")[0]
    for(let init = 0;init<allUploadedImages.length;init++){
        const imageClipBox = `<div class='slide-image-holder' style='background-image:linear-gradient(transparent,black), url(${allImagesUrlBlobs[init]});'></div>`
        allImageSlides.push(imageClipBox)
    }
    const fetchCurrentSlide = allImageSlides.filter((imageClip)=>{
        let matcher = imageClip.match(clickedImage.getAttribute("src"))
        if(matcher){
            return imageClip;
        }
    })
    const imageClipIndex = allImageSlides.indexOf(fetchCurrentSlide[0])
    let clipIndex0 = allImageSlides[0]
    let currentClip = allImageSlides[imageClipIndex]
    allImageSlides[0] = currentClip;
    allImageSlides[imageClipIndex] = clipIndex0
    imagesSlider.innerHTML=allImageSlides.join("")

    //update upcomingVariable
    upcomingImage = currentImageIndex-1
}



//function to close the viewed-image-holder div element
function closeViewedImage(){
    const viewedImageHolder = document.getElementById("viewed-image-holder");
    viewedImageHolder.style.transitionDuration="200ms"
    viewedImageHolder.style.transform="scale(0)"
}

//function to play next images
function playNextImage(){
    const viewedImageHolder = document.getElementById("viewed-image-holder");
    viewedImageHolder.style.transitionDuration="200ms"
    if(currentImageIndex >= allImagesUrlBlobs.length - 1){
        currentImageIndex = allImagesUrlBlobs.length-1
    }else{
        currentImageIndex++
    }
    viewedImageHolder.style.backgroundImage=`url(${allImagesUrlBlobs[currentImageIndex]})`
    
    //set nex image to be played
    const imagesSlider = document.getElementsByClassName("image-slider")[0]
    if(upcomingImage >= allUploadedImages.length-1){
        upcomingImage = allUploadedImages.length-1
    }else{
        upcomingImage = currentImageIndex+1
    }
    newUpdatedSlides.push(allImageSlides[upcomingImage])
    newUpdatedSlides.push(allImageSlides[upcomingImage+1])
    imagesSlider.innerHTML=newUpdatedSlides.join("")
    imagesSlider.children[0].innerHTML="Upcoming Next"
    newUpdatedSlides = []
}

//function to play previous images
function playPreviousImage(){
    const viewedImageHolder = document.getElementById("viewed-image-holder");
    viewedImageHolder.style.transitionDuration="200ms"
    if(currentImageIndex <= 0){
        currentImageIndex = 0;
    }else{
        currentImageIndex--
    }
    viewedImageHolder.style.backgroundImage=`url(${allImagesUrlBlobs[currentImageIndex]})`
    //set nex image to be played
    const imagesSlider = document.getElementsByClassName("image-slider")[0]
    if(upcomingImage <= 0){
        upcomingImage = 0
    }else{
        upcomingImage = currentImageIndex-1
    }
    newUpdatedSlides.push(allImageSlides[upcomingImage])
    newUpdatedSlides.push(allImageSlides[upcomingImage+1])
    imagesSlider.innerHTML=newUpdatedSlides.join("")
    imagesSlider.children[0].innerHTML="Next Previous"
    newUpdatedSlides = []
}

