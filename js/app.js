//global variables
let workingArray = [];
let numInSeq = 0;

//button listeners
document.getElementById('commonWords').addEventListener("click", function() {
	if ((document.getElementById('commonWords').className).indexOf('active') > -1) {
		document.getElementById('commonWords').classList.remove('active');
	} else {
		document.getElementById('commonWords').classList.add('active');
	}
	reset();
});

document.getElementById('commonPhrases').addEventListener("click", function() {
	if ((document.getElementById('commonPhrases').className).indexOf('active') > -1) {
		document.getElementById('commonPhrases').classList.remove('active');
	} else {
		document.getElementById('commonPhrases').classList.add('active');
	}
	reset();
});

document.getElementById('magicWords').addEventListener("click", function() {
	if ((document.getElementById('magicWords').className).indexOf('active') > -1) {
		document.getElementById('magicWords').classList.remove('active');
	} else {
		document.getElementById('magicWords').classList.add('active');
	}
	reset();
});

document.getElementById('hideEng').addEventListener("click", function() {
	document.getElementById('hideEng').classList.add('active');
	document.getElementById('hideKor').classList.remove('active');
	document.getElementById('randomize').classList.remove('active');
});

document.getElementById('hideKor').addEventListener("click", function() {
	document.getElementById('hideEng').classList.remove('active');
	document.getElementById('hideKor').classList.add('active');
	document.getElementById('randomize').classList.remove('active');
});

document.getElementById('randomize').addEventListener("click", function() {
	document.getElementById('hideEng').classList.remove('active');
	document.getElementById('hideKor').classList.remove('active');
	document.getElementById('randomize').classList.add('active');
});

//global functions
function nextCard(button) { //if it is the first press (at the start or after a reset), shuffle the cards.  moves all cards selected into a separate array
	if (workingArray.length == 0) {
		if ((document.getElementById('commonWords').className).indexOf('active') > -1) {
			for (let i = 0; i < common.length; i++) {
				workingArray.push(common[i]);
			}
		}
		if ((document.getElementById('commonPhrases').className).indexOf('active') > -1) {
			for (let i = 0; i < commonPhrases.length; i++) {
				workingArray.push(commonPhrases[i]);
			}
		}
		if ((document.getElementById('magicWords').className).indexOf('active') > -1) {
			for (let i = 0; i < magic.length; i++) {
				workingArray.push(magic[i]);
			}
		}
		workingArray = shuffle(workingArray);
	}

	if (button.innerText == 'Start' && workingArray.length == 0) {
		document.getElementById('status').innerHTML = "Hey! You didn't select any modules!";
	} else {
		button.innerText = "Next";
		advance();
	}
}

function advance () { //when next is clicked, go to next flashcard
	hideAnswer();
	document.getElementById('prompt').innerHTML = workingArray[numInSeq][0];
	document.getElementById('answer').innerHTML = workingArray[numInSeq][1];
	if (workingArray.length - numInSeq - 1 == 1){
		document.getElementById('status').innerHTML = workingArray.length - numInSeq - 1 + ' flashcard left';
	} else {
		document.getElementById('status').innerHTML = workingArray.length - numInSeq - 1 + ' flashcards left';
	}
	if (numInSeq < workingArray.length-1){ //moves current card as each card is completed
		numInSeq++;
	} else {
		numInSeq = 0;
	}
}

function hideAnswer() { //hides one side, depending on which button is active
	document.getElementById('revealPrompt').classList.add('hidden');
	document.getElementById('revealAnswer').classList.add('hidden');
	if ((document.getElementById('hideEng').className).indexOf('active') > -1) {
		document.getElementById('revealPrompt').classList.remove('hidden');
	} else if ((document.getElementById('hideKor').className).indexOf('active') > -1) {
		document.getElementById('revealAnswer').classList.remove('hidden');
	} else if ((document.getElementById('randomize').className).indexOf('active') > -1) {
		let randomNum = Math.floor(Math.random()*2);
		if (randomNum == 0) {
			document.getElementById('revealPrompt').classList.remove('hidden');
		} else if (randomNum == 1) {
			document.getElementById('revealAnswer').classList.remove('hidden');
		}
	}
}

function shuffle(array) { //shuffles set of cards
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) { // while there remain elements to shuffle

    randomIndex = Math.floor(Math.random() * currentIndex);  // pick a remaining element
    currentIndex -= 1;

    temporaryValue = array[currentIndex];  // swap it with the current element
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function disappear(button) { //uncovers the answer
	button.classList.add('hidden');
}

function reset() { //resets the cards (allows for reshuffle)
	numInSeq = 0;
	workingArray = [];
	document.getElementById('next').innerText = 'Start';
	document.getElementById('prompt').innerHTML = '';
	document.getElementById('answer').innerHTML = '';
	document.getElementById('revealPrompt').classList.add('hidden');
	document.getElementById('revealAnswer').classList.add('hidden');
	document.getElementById('status').innerHTML = '';
}