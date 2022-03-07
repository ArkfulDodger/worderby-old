//#region GLOBAL VARIABLES
// ----------------------------------------------------------------------
// Declare any global variables we need in this region
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼

const title1 = document.getElementById('title-1');
const title2 = document.getElementById('title-2');
const title3 = document.getElementById('title-3');

const playerForm = document.getElementById('player-form')
const playerPrompt = document.getElementById('player-prompt');
const playerInput = document.getElementById('player-input');

//#endregion


//#region CODE RUN ON DOC LOAD
// ----------------------------------------------------------------------
// Any code that should actually be run upon this file being loaded 
// (other than global variable declarations) should go in this region.
// This includes things like function invocations
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼

startTitleAnimation();

//#endregion


//#region FUNCTIONS - COMPLETE
// ----------------------------------------------------------------------
// Put any functions here that are complete and part of our working code
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼

function startTitleAnimation() {
    setInterval(cycleTitle, 1500);
}

function cycleTitle() {
    switch (title2.textContent) {
        case 'word':
            title1.textContent = 'w';
            title2.textContent = 'order';
            title3.textContent = 'bytes';
            break;
        case 'order':
            title1.textContent = 'wor';
            title2.textContent = 'derby';
            title3.textContent = 'tes';
            break;
        case 'derby':
            title1.textContent = 'worder';
            title2.textContent = 'bytes';
            title3.textContent = '';
            break;
        case 'bytes':
            title1.textContent = '';
            title2.textContent = 'word';
            title3.textContent = 'erbytes';
            break;
        
        default:
            console.error('title text cycle broken')
            title1.textContent = '';
            title2.textContent = 'word';
            title3.textContent = 'erbytes';
            break;
    }
}

//#endregion


//#region FUNCTIONS - IN-PROGRESS
// ----------------------------------------------------------------------
// Use the space below to when writing new functions.
// Once you are satisfied with how the function looks/works, move it to
// the region above.
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼



//#endregion