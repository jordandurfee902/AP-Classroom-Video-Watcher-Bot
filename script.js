function getElementByXpath(xpath, context = document) {
  if (typeof xpath !== "string") {
    throw new TypeError("XPath must be a string.");
  }
  const result = document.evaluate(
    xpath,
    context,
    null, // no namespace resolver
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
}

function isVideoDone() {
    if (document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Play Video"]') == null) {
    return false
} else {return true}
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};


var count = 0

// 2. The Main Asynchronous Loop
async function monitorVideoProgress() {
    console.log("Starting video monitor. Checking every 10 seconds...");
    let keepRunning = true;
  // play button
  await sleep(5000)
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
            document.querySelector('button[data-test-id="modal-close-button"]').click(); 
          await sleep(5000);
          startVideo();
            
            // Stop the while loop
            keepRunning = false; 
            
            // Alternatively, you can just use `break;` here instead of keepRunning
        } else {
            console.log("Video still playing. Waiting another 10 seconds...");
            // The loop naturally continues from here because keepRunning is still true
        }
    }
}

function startVideo() {
  document.querySelector(".StudentAssignments .action-button-cell button").click();
  document.querySelector(".StudentAssignments tbody").children[count].querySelector(".action-button-cell button").click()
  count = count + 1
  monitorVideoProgress();
  
}


// 3. Start the monitoring loop
startVideo();
