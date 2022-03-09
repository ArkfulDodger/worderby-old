//#region API OPTIONS ---------------------------------------------------
//-----------------------------------------------------------------------

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


//#region GLOBAL VARIABLES ----------------------------------------------
//-----------------------------------------------------------------------


// elements from title animation
const titleTextBeforeBold = document.getElementById('title-1');
const titleTextBold = document.getElementById('title-2');
const titleTextAfterBold = document.getElementById('title-3');

// elements from player form (game area)
const playerForm = document.getElementById('player-form');
const promptUnusable = document.getElementById('prompt-unusable');
const promptUsable = document.getElementById('prompt-usable');
const playerInput = document.getElementById('player-input');
const submitButton = document.querySelector('#player-form [type="submit"]');
let availablePromptText = promptUsable.textContent;
let selectedPromptText = "";

// frankenword element
const frankenword = document.getElementById('frankenword');

// new game button
const newGameButton = document.getElementById('new-game-button');

// game mechanics variables
const pointsPerPromptLetter = 5;
const pointsPerInputLetter = 1;

//#endregion


//#region CODE RUN ON DOC LOAD ------------------------------------------
//-----------------------------------------------------------------------

runTitleAnimationAtInterval(1.5);
addEventListeners();
formatPromptSpans();

//#endregion


//#region FUNCTIONS - COMPLETE ------------------------------------------
//-----------------------------------------------------------------------

// starts the title animation
function runTitleAnimationAtInterval(intervalInSeconds) {
    setInterval(cycleTitle, intervalInSeconds * 1000);
}

// highlight the next word in the title animation sequence
function cycleTitle() {
    switch (titleTextBold.textContent) {
        case 'word':
            titleTextBeforeBold.textContent = 'w';
            titleTextBold.textContent = 'order';
            titleTextAfterBold.textContent = 'bytes';
            break;
        case 'order':
            titleTextBeforeBold.textContent = 'wor';
            titleTextBold.textContent = 'derby';
            titleTextAfterBold.textContent = 'tes';
            break;
        case 'derby':
            titleTextBeforeBold.textContent = 'worder';
            titleTextBold.textContent = 'bytes';
            titleTextAfterBold.textContent = '';
            break;
        case 'bytes':
            titleTextBeforeBold.textContent = '';
            titleTextBold.textContent = 'word';
            titleTextAfterBold.textContent = 'erbytes';
            break;
        
        default:
            console.error('title text cycle broken')
            titleTextBeforeBold.textContent = '';
            titleTextBold.textContent = 'word';
            titleTextAfterBold.textContent = 'erbytes';
            break;
    }
}

// add all event listeners for the page
function addEventListeners() {
    // When player submits text input form, they submit the word as their answer
    playerForm.addEventListener('submit', submitAnswer);
    
    // When New Game button is clicked, entire game resets
    newGameButton.addEventListener('click', resetGame);

    // When unusable prompt section is clicked, flash red and indicate off limits
    promptUnusable.addEventListener('click', instructUnusablePrompt);
}

// callback for when player submits an answer
function submitAnswer(e) {
    e.preventDefault();

    if (!selectedPromptText) {
        alert('must select at least one letter from prompt to begin your word!');
        return;
    } else if (!playerInput.value) {
        alert('must enter at least one letter to play a word!');
        return;
    }

    setFormDisabledTo(true);

    testSingleWord()
    .then( wordEntry => {
        // if a valid word entry was found in the API
        if (wordEntry) {
            // score word
            console.log('Scored ' + getScoreForCurrentWord() + ' points');

            // add input to frankenword
            frankenword.textContent += playerInput.value;

            // set played word as new prompt
            let newWord = wordEntry[0].word;
            availablePromptText = newWord.slice(1);
            promptUnusable.textContent = newWord[0];
            formatPromptSpans();

            // reset form
            playerForm.reset();

            // remove placeholder
            playerInput.placeholder = "";

        // if input did not yield a valid entry in the API
        } else {
            alert('word not found, try again!')
        }

        setFormDisabledTo(false);
    })
}

// test whether current player word guess is a word or not. Returns word entry or false
function testSingleWord() {
    const testWord = selectedPromptText + playerInput.value;
    console.log('testing: ' + testWord);

    return getWord(testWord)
}

// attempt to Get (presumed) word in dictionary API. Return dictionary entry or ""
function getWord(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    // parse json response if status is 200, otherwise return ""
    .then( res => res.status === 200 ? res.json() : false)
    // return parsed dictionary entry, or ""
    .then( data => data ? data : false)
    .catch( error => console.log(error.message))
}

// puts each letter of the player's usable prompt in its own span,
function formatPromptSpans() {
    // clear span HTML content
    promptUsable.innerHTML = "";

    for (let i = 0; i < availablePromptText.length; i++) {
        const span = document.createElement('span');
        span.textContent = availablePromptText[i];
        span.addEventListener('click', () => selectPromptLetters(i))
        promptUsable.appendChild(span);
    }

    selectedPromptText = "";
}

// "select" which prompt letters player is using based off starting letter index (in usable prompt)
function selectPromptLetters(i) {
    // if selected current starting letter, deselect
    if (selectedPromptText === availablePromptText.slice(i)) {
        selectedPromptText = "";
        removePromptHighlight();
    } else {
        selectedPromptText = availablePromptText.slice(i);
        highlightPromptStartingAt(i);
        playerInput.focus();
    }    
}

// set usable prompt text back to default font styling
function removePromptHighlight() {
    for (let i = 0; i < availablePromptText.length; i++) {
        promptUsable.children[i].className = "";
    }
}

// highlight selected portion of prompt, dim unused portion
function highlightPromptStartingAt(startIndex) {
    for (let i = 0; i < availablePromptText.length; i++) {
        promptUsable.children[i].className = i < startIndex ? 'not-using' : 'using';
    }
}

// briefly apply '.alert' class to element to style, then remove
function flashTextRed(element) {
    if (element.className === 'alert') {
        return;
    }
    element.className = 'alert';
    setTimeout(() => {element.className = ""}, 100);
}

//#endregion


//#region NOT IN USE ----------------------------------------------------
//-----------------------------------------------------------------------

// // WHY NOT IN USE: player prompt selection means only one word needs to be tested, not all possible from input
// // test player's answer (returns dictionary entry or alerts to try again)
// function testWord() {
//     // declare an array to contain all fetch (GET) promises
//     const promisesArray = [];
//    
//     // test each possible combination of prompt letters and player input, starting with the second letter
//     for (i = 0; i < availablePromptText.length; i++) {
//         // get this word to test
//         const testWord = availablePromptText.slice(i) + playerInput.value;
//        
//         // add the Promise reference to the promises array
//         promisesArray.push(getWord(testWord));
//     }
//
//     // return the first (& therefore longest) existing (truthy) result from the returned words array
//     return Promise.all(promisesArray)
//     .then(returnedWords => {
//         console.log(returnedWords);
//         return returnedWords.find(x => !!x)});
// }

// // WHY NOT IN USE: makes too many Get Calls, hits API limit. Replaced with manual player prompt selection
//
// // when user types in input field, prompt text will highlight if input makes a valid solution
// playerInput.addEventListener('input', autoHighlightPrompt)
//
// // automatically highlights portion of prompt that creates a valid solution with user input
// function autoHighlightPrompt() {
//     let promptText = availablePromptText
//
//     // if there is currently input from the player
//     if (playerInput.value) {
//         testWord()
//         .then( wordEntry => {
//             // if a valid word entry was found in the API...
//             if (wordEntry) {
//                 // get used and unused strings from prompt...
//                 let usedLength = wordEntry[0].word.length - playerInput.value.length;
//                 let usedPrompt = wordEntry[0].word.slice(0, usedLength);
//                 let unusedLength = availablePromptText.length - usedLength;
//                 let unusedPrompt = availablePromptText.slice(0,unusedLength);
//
//                 // and assign to appropriate styled spans
//                 promptNeutralText.textContent = "";
//                 promptDimText.textContent = unusedPrompt;
//                 promptLitText.textContent = usedPrompt;
//  
//             // if input did not yield a valid entry in the API...
//             } else {
//                 // place all prompt text in second, greyed-out, span
//                 promptNeutralText.textContent = "";
//                 promptDimText.textContent = promptText;
//                 promptLitText.textContent = "";
//             }
//         })
//
//     // if the input field is currently blank
//     } else {
//         // all prompt text in first, unstyled, span
//         promptUsable.children[0].textContent = promptText;
//         promptUsable.children[1].textContent = ""
//         promptUsable.children[2].textContent = "";
//     }
// }

//#endregion


//#region FUNCTIONS - IN-PROGRESS ---------------------------------------
//-----------------------------------------------------------------------
// reset page for new game
function resetGame() {
    // find random prompt word
    console.log('reset game');
}

// alert that prompt selection is unusable
function instructUnusablePrompt() {
    flashTextRed(promptUnusable);
}

// retrieve score for word based on current selected prompt and input
function getScoreForCurrentWord() {
    let promptPoints = selectedPromptText.length * pointsPerPromptLetter;
    let inputPoints = playerInput.value.length * pointsPerInputLetter;

    return promptPoints + inputPoints;
}

function setFormDisabledTo(bool) {
    console.log('form disabled: ' + bool);

    playerInput.disabled = bool;
    submitButton.disabled = bool;
}

//#endregion