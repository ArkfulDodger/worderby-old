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
const promptUnusable = document.getElementById('prompt-unusable');
const promptUsable = document.getElementById('prompt-usable');
const playerInput = document.getElementById('player-input');

const frankenword = document.getElementById('frankenword');

const resetButton = document.getElementById('reset-button');

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
    // When player submits text input form, they submit the word as their answer
    playerForm.addEventListener('submit', submitAnswer)
    
    // When reset button is clicked, entire game resets
    resetButton.addEventListener('click', resetGame)
    
    // *** LEAVE COMMENTED OUT *** // this works, but creates too many GET requests, and will lock us out of the API
    // when user types in input field, prompt text will highlight if input makes a valid solution
    // playerInput.addEventListener('input', autoHighlightPrompt)
}

// callback for when player submits an answer
function submitAnswer(e) {
    e.preventDefault();

    testWord()
    .then( wordEntry => {
        // if a valid word entry was found in the API
        if (wordEntry) {
            // add input to frankenword
            frankenword.textContent += playerInput.value;

            // set played word as new prompt
            promptUnusable.textContent = wordEntry[0].word[0];
            promptUsable.children[0].textContent = wordEntry[0].word.slice(1);
            promptUsable.children[1].textContent = "";
            promptUsable.children[2].textContent = "";

            // reset form
            playerForm.reset();

            // remove placeholder
            playerInput.placeholder = "";

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
    for (i = 0; i < promptUsable.textContent.length; i++) {
        // get this word to test
        const testWord = promptUsable.textContent.slice(i) + playerInput.value;
        console.log(testWord);
        
        // add the Promise reference to the promises array
        promisesArray.push(getWord(testWord));
    }

    // return the first (& therefore longest) existing (truthy) result from the returned words array
    return Promise.all(promisesArray)
    .then(returnedWords => {
        console.log(returnedWords);
        return returnedWords.find(x => !!x)});
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

// automatically highlights portion of prompt that creates a valid solution with user input
function autoHighlightPrompt() {
    let promptText = promptUsable.textContent

    // if there is currently input from the player
    if (playerInput.value) {
        testWord()
        .then( wordEntry => {
            // if a valid word entry was found in the API...
            if (wordEntry) {
                // get used and unused strings from prompt...
                let usedLength = wordEntry[0].word.length - playerInput.value.length;
                let usedPrompt = wordEntry[0].word.slice(0, usedLength);
                let unusedLength = promptUsable.textContent.length - usedLength;
                let unusedPrompt = promptUsable.textContent.slice(0,unusedLength);

                // and assign to appropriate styled spans
                promptUsable.children[0].textContent = "";
                promptUsable.children[1].textContent = unusedPrompt;
                promptUsable.children[2].textContent = usedPrompt;
    
            // if input did not yield a valid entry in the API...
            } else {
                // place all prompt text in second, greyed-out, span
                promptUsable.children[0].textContent = "";
                promptUsable.children[1].textContent = promptText;
                promptUsable.children[2].textContent = "";
            }
        })

    // if the input field is currently blank
    } else {
        // all prompt text in first, unstyled, span
        promptUsable.children[0].textContent = promptText;
        promptUsable.children[1].textContent = ""
        promptUsable.children[2].textContent = "";
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


function resetGame() {
    // find random prompt word
    console.log('reset game');
}

//#endregion