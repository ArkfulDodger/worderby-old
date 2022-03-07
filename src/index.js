//#region API OPTIONS
// ----------------------------------------------------------------------
// API databases which migh be able to be used for the app
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼

// ***** CURRENT OPTION IN USE *****
// Free Dictionary API
// useful for: getting exact match (or lack of match) for word
// site: https://dictionaryapi.dev/
// GET URL: https://api.dictionaryapi.dev/api/v2/entries/en/${word}

// Datamuse API
// useful for: getting a list of words that start with/end with a string
// site: https://www.datamuse.com/api/
// GET URL: https://api.datamuse.com/words?sp=${word}

// WordsAPI
// site: https://www.wordsapi.com/
// GET URL: [need to register]

//#endregion


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

const frankenword = document.getElementById('frankenword');

//#endregion


//#region CODE RUN ON DOC LOAD
// ----------------------------------------------------------------------
// Any code that should actually be run upon this file being loaded 
// (other than global variable declarations) should go in this region.
// This includes things like function invocations
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼

runTitleAnimationAtInterval(1.5);
addEventListeners();

//#endregion


//#region FUNCTIONS - COMPLETE
// ----------------------------------------------------------------------
// Put any functions here that are complete and part of our working code
// ----------------------------------------------------------------------
// ▼ (Type below this line) ▼

// starts the title animation
function runTitleAnimationAtInterval(intervalInSeconds) {
    setInterval(cycleTitle, intervalInSeconds * 1000);
}

// highlight the next word in the title animation sequence
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

// add all event listeners for the page
function addEventListeners() {
    // Add event listener for player answer submit
    playerForm.addEventListener('submit', submitAnswer)
}

// callback for when player submits an answer
function submitAnswer(e) {
    e.preventDefault();

    playerInput.placeholder = "";

    testWord()
    .then( wordEntry => {
        // if a valid word entry was found in the API
        if (wordEntry) {
            // add input to frankenword
            frankenword.textContent += playerInput.value;

            // set played word as new prompt
            playerPrompt.textContent = wordEntry[0].word;

            // reset form
            playerForm.reset();

        // if input did not yield a valid entry in the API
        } else {
            alert('word not found, try again!')
        }
    })
}

// test player's answer (returns dictionary entry or alerts to try again)
function testWord() {
    // declare an array to contain all fetch (GET) promises
    const promisesArray = [];
    
    // test each possible combination of prompt letters and player input, starting with the second letter
    for (i = 1; i < playerPrompt.textContent.length; i++) {
        // get this word to test
        const testWord = playerPrompt.textContent.slice(i) + playerInput.value;

        // add the Promise reference to the promises array
        promisesArray.push(getWord(testWord));
    }

    // return the first (& therefore longest) existing (truthy) result from the returned words array
    return Promise.all(promisesArray)
    .then(returnedWords => returnedWords.find(x => !!x));
}

// attempt to Get (presumed) word in dictionary API. Return dictionary entry or ""
function getWord(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    // parse json response if status is 200, otherwise return ""
    .then( res => res.status === 200 ? res.json() : "")
    // return parsed dictionary entry, or ""
    .then( data => data ? data : "")
    .catch( error => console.log(error.message))
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