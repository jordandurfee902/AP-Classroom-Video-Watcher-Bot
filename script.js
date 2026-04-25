let playbackSpeed;

// you can change this value to the video you are on to avoid completing repeats
let videoCount = 0;


function playback() {
    let alertValue = prompt("Enter the playback speed (1, 1.25, 1.5, 1.75, 2)");

    const validSpeeds = ["1", "1.25", "1.5", "1.75", "2"];

    if (validSpeeds.includes(alertValue)) {
        playbackSpeed = alertValue;
        console.log("Playback speed set to " + playbackSpeed);
    }

    else {
        alert("Invalid playback speed");
        playback();
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

function isVideoPlaying() {
    var playButton = document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Play Video"]');
    if (playButton) {
        return false;
    } else {
        return true;
    }
}

function clickPlayButton() {
    var playButton = document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Play Video"]');
    if (playButton) {
        playButton.click()
        console.log("Clicked Play Button")
    } else {
        console.log("Play button not found");
    }
}

function openSettingsMenu() {
    var openSettingsButton = document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Show settings menu"]');
    if (openSettingsButton) {
        openSettingsButton.click();
        console.log("Opened settings menu");
        return true;
    }
    console.log("Settings menu not found");
    return false;
}

function clickSpeedMenu() {
    var speedButton = document.querySelector('wistia-player').shadowRoot.querySelector('.w-accordion-item__head.w-css-reset-dialog-button-important.w-vulcan-v2-button');
    if (speedButton) {
        speedButton.click();
        console.log("Clicked speed menu");
        return true;
    }
    console.log("Speed button not found");
    return false;
}
// this is the part of the script that is most brittle and likely to fail if AP classroom changes their website at all. If the console gives a "specific speed button not found" you need to redo the buttons here
function applySpeedSelection() {
    var setSpeedButton;

    if (playbackSpeed == "1.25") {
        setSpeedButton = document.querySelector('wistia-player').shadowRoot.querySelector('.w-checkmark').closest('div').parentElement.children[4].children[1];
    } else if (playbackSpeed == "1.5") {
        setSpeedButton = document.querySelector('wistia-player').shadowRoot.querySelector('.w-checkmark').closest('div').parentElement.children[5].children[1];
    } else if (playbackSpeed == "1.75") {
        setSpeedButton = document.querySelector('wistia-player').shadowRoot.querySelector('.w-checkmark').closest('div').parentElement.children[6].children[1];
    } else if (playbackSpeed == "2") {
        setSpeedButton = document.querySelector('wistia-player').shadowRoot.querySelector('.w-checkmark').closest('div').parentElement.children[7].children[1];
        console.log("playback speed identified as 2");
    }

    if (setSpeedButton) {
        setSpeedButton.click();
        console.log("Set playback speed to " + playbackSpeed);
        return true;
    }
    console.log("Specific speed button (" + playbackSpeed + ") not found");
    return false;
}

function closeSettingsMenu() {
    var closeSettingsButton = document.querySelector('wistia-player').shadowRoot.querySelector('button[aria-label="Hide settings menu"]');
    if (closeSettingsButton) {
        closeSettingsButton.click();
        console.log("Closed settings menu");
    }
}

function setPlaybackSpeed() {
    if (openSettingsMenu()) {
        if (clickSpeedMenu()) {
            applySpeedSelection();
        }
        closeSettingsMenu();
    }
}

function clickNextVideo() {
    var nextButton = document.querySelector('.ResponsiveTabs--items.css-103rzyi').children[videoCount]
    if (nextButton) {
        nextButton.click()
        console.log("Clicked Next Video")
    } else {
        console.log("Next video button not found")
    }
}

async function main() {
    playback();

    while (true) {
        console.log("Checking video status...");
        await sleep(2000);
        clickPlayButton();
        await sleep(2000);
        openSettingsMenu();
        await sleep(2000);
        clickSpeedMenu();
        await sleep(2000);
        applySpeedSelection();
        await sleep(2000);
        closeSettingsMenu();

        while (isVideoPlaying()) {
            await sleep(5000);
            console.log("Video is still playing");
        }

        console.log("Video has ended");
        videoCount++;
        clickNextVideo();
        await sleep(5000);
    }
}

main();

