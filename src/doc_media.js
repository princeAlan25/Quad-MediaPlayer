//event codes block to upload the pdf files
const pdfInput = document.getElementById("pdf-input");
const pdfViewer = document.getElementsByClassName("pdf-viewer")[0];
const pdfFilesHolder = document.getElementsByClassName("pdf-files-holder")[0];
const allPdfUrl = [];
const allPdfIds = [];
const allPdfDetailsElements = [];
let currentPdfIndex;
//activate fileChange event to upload the files
pdfInput.addEventListener("change",()=>{
    const allPdfFiles = pdfInput.files;
    for(let init = 0;init<allPdfFiles.length;init++){
        const fileUrl = URL.createObjectURL(allPdfFiles[init])
        const fileName = allPdfFiles[init].name;
        const fileSize = allPdfFiles[init].size;
        const dateModified = allPdfFiles[init].lastModifiedDate;
        const pdfDetailsElement = `<div class="pdf-details" id="pdf${allPdfDetailsElements.length}" onclick="activateClickedPdf(this.id)">
                                        <span class="pdf-name">
                                            <h4>File name: </h4>
                                            <p>${fileName}</p>
                                        </span>
                                        <span class="pdf-size">
                                            <h4>File size: </h4>
                                            <p>${fileSize}</p>
                                        </span>
                                        <span class="pdf-date">
                                            <h4>Data modified</h4>
                                            <p>${dateModified}</p>
                                        </span>
                                    </div>`;
        allPdfDetailsElements.push(pdfDetailsElement)
        allPdfUrl.push(fileUrl)
        allPdfIds.push(`pdf${init}`)
    }
    currentPdfIndex = currentPdfIndex?currentPdfIndex:0;
    pdfFilesHolder.innerHTML = allPdfDetailsElements.join("")
    const pdfObjectElement = `<object data="${allPdfUrl[currentPdfIndex]}" type="application/pdf" width="100%" height="100%" id="actualPdf"></object>`
    pdfViewer.innerHTML=pdfObjectElement;
})


//function to activate and display the clicked pdf file details div;
function activateClickedPdf(ownId){
    //default activated pdf details element

    const clickedPdf = document.getElementById(ownId)
    clickedPdf.style.opacity = "0.8"
    clickedPdf.addEventListener("mouseover",()=>{
        clickedPdf.style.opacity="0.8"
    })
    clickedPdf.addEventListener("mouseleave",()=>{
        clickedPdf.style.opacity="0.8"
    })
    const filterPdfFromList = allPdfDetailsElements.filter((pdfDetails)=>{
        let matcher = pdfDetails.match(ownId)
        if(matcher){
            return pdfDetails
        }
    })[0];
    const clickedPdfIndex = allPdfDetailsElements.indexOf(filterPdfFromList)
    currentPdfIndex = clickedPdfIndex;
    const pdfObjectElement = `<object data="${allPdfUrl[currentPdfIndex]}" type="application/pdf" width="100%" height="100%" id="actualPdf"></object>`
    pdfViewer.innerHTML=pdfObjectElement;

    //un-mark the unselected pdf details element
    for(let init=0;init<allPdfIds.length;init++){
        if(init != currentPdfIndex){
            const unClickedPdf = document.getElementById(allPdfIds[init])
            unClickedPdf.style.opacity = "1"
            unClickedPdf.addEventListener("mouseover",()=>{
                unClickedPdf.style.opacity="0.8"
            })
            unClickedPdf.addEventListener("mouseleave",()=>{
                unClickedPdf.style.opacity="1"
            })
        }
    }
}