function isVideoDone() {
  // tests if the video has completed by seeing if the play button is a play button or a pause button, it turns back into a play button once it is done
	if (document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Play Video"]') == null) {
	return false
} else {return true}
}

// sleep to allow a while loop to not crash the website
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};


var count = 0

// 2. The Main Asynchronous Loop
async function monitorVideoProgress() {
    console.log("Starting video monitor. Checking every 10 seconds...");
    let keepRunning = true;
  await sleep(5000)
  // this just clicks the play button in the bottom right corner to start the video
    document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Play Video"]').click();
    while (keepRunning) {
        // Wait 10 seconds (10,000 milliseconds)
        await sleep(5000); 

        // Call your function and store the returned boolean
        const isDone = isVideoDone();

        // Check the returned value
        if (isDone === true) {
          
            console.log("Video is finished! Clicking close button and exiting loop.");
            
            // Execute the click
          // clicks the x button to close the now completed video
            document.querySelector('button[data-test-id="modal-close-button"]').click(); 
          await sleep(5000);
          startVideo();
            
            // Stop the while loop
            keepRunning = false; 
             
        } else {
            console.log("Video still playing. Waiting another 10 seconds...");
        }
    }
}

function startVideo() {
  // click on the "View" button to open the video, count keeps track of which ones have already been watched.
  document.querySelector(".StudentAssignments tbody").children[count].querySelector(".action-button-cell button").click()
  count = count + 1
  // once clicked, start the video monitoring loop
  monitorVideoProgress();
  
}


// 3. Start the monitoring loop
startVideo();
