
//the Elements in the HTML with ids:
	//wordHolder
	//wrongGuessesHolder
	//movesHolder
	//hintHolder





//Global Variables
var Wins = 0;
var Loses = 0;
var theWords = [beheading , boiling , shooting , impalement , burning , crucifixion , skinning, stoning];
//"playground" , "box" , "basketball" , "bootcamp" , "coding" , "triangle" , "linkinpark"




//Our game object

var myGame = {
	"moves" : 0,
	"theWord" : {}, //will contain the word object being played
	"Words" : [], //copy of the original to use for certain games in order to be able to retrieve the game after running out of words
	"WordsCopier" : function(){ //this function copies the original array into the one in the object

		for(var i = 0;i<theWords.length;i++){
			this.Words[i] = theWords[i];
		}
	},
	"wrongGuesses" : [], //will containe all the wrong guesses
	"spaceHolder" : "", //will work as placeholder for letters that are yet to be revealed
	"starter" : function(){}, //this function will start the game by choosing a new word from list, resetting moves, resetting spaceHolder, etc.
	"reveal" : function(){}, //this function replace the appropriate place holder in spaceholder with a letter
	"checkLetter" : function(){}, //this checks if the guesses letter is correct or wrong
	"wrongGuess" : function(){}, //this function will add the wrong guess to the wrong guess place holder
	"shower" : function(){},
	"gameStatus" : function(){} //this function will check if the game is over and if the user has won or lost

};


myGame.starter = function(){


	if(this.Words.length === 0){ //this conditional check if the list is empty so run the WordsCopier to reset the list from original
		this.WordsCopier();
	};

	console.log(theWords);
	console.log(this.Words);

	var randomIndex = Math.floor(Math.random()*this.Words.length);

	this.theWord = this.Words[randomIndex];
	this.Words.splice(randomIndex, 1); //removing the chosen word from the list to avoid repeatition
	this.moves = Math.round(this.theWord.Word.length*1.5); //set the moves to 1.5 times of the length of the word
	this.spaceHolder = ""; //set the place holder for the word to empty
	this.wrongGuesses = []; //reset the wrong guesses to empty
	$("#wrongGuessesHolder").text("[]");
	$("#movesHolder").text("[" + this.moves + "]");
	$("#hintHolder").text('');

	console.log("------start---------");
	console.log(this.moves);

	for (var i=0;i<this.theWord.Word.length;i++){ //using loop to fill the place holder with the same number of letters as the Word
		this.spaceHolder += "_";
	}

	$("#wordHolder").text(this.spaceHolder); 

};

myGame.reveal = function(letter, index){

	var wordArr = [];

	//turning the space holder to array to replace a place holder with a letter and turning it back to string to be able to show it

	wordArr = this.spaceHolder.split("");
	wordArr[index] = letter;
	this.spaceHolder = wordArr.join('');

	
	$("#wordHolder").text(this.spaceHolder);


};

myGame.checkLetter = function(letter){

	var correctGuess = false;	//this bolean is to see if the guess was wrong

	for(var j = 0;j<this.theWord.Word.length;j++){

		if(this.theWord.Word[j] === letter){
			this.reveal(letter, j);
			correctGuess = true;
		}
	}

	if(correctGuess === false){
		this.wrongGuess(letter);
	}

};

myGame.wrongGuess = function(letter){

	var repeated = false; //this bolean is to toggle if the letter has already been guessed

	this.wrongGuesses.forEach( function(element){
		if(element === letter){
			repeated = true;
		}
	});

	if(repeated === false){
		this.wrongGuesses.push(letter);
		$("#wrongGuessesHolder").text("[" + this.wrongGuesses + "]");
		this.moves --;
		$("#movesHolder").text("[" + this.moves + "]");
	};

};

myGame.shower = function(x){

	if(x === "hint"){
		$("#hintHolder").text(this.theWord.Hint);
	}

}


myGame.gameStatus = function(){

	var ended = true; //this bolean is to determine whether the game is over or not.

	console.log(ended);


	for(var s = 0;s<this.spaceHolder.length;s++){
		if(this.spaceHolder.charAt(s) === "_"){ //as long as the spaceholder contains and moves are greater than 0, the game is on
			ended = false;
		};
	};


	if(ended === true){ //this conditional checks if the user has guessed all the letters so to end the game
		console.log("The Game Is Over Win");
		console.log(this.theWord.Word);
		Wins ++;
		console.log("Wins are" + " :: " + Wins + " & " + "Loses are" + " :: " + Loses);
		this.starter();
		return;
	}

	if(this.moves <= 0 ){ //when the moves are out the game is over
		ended = true;
		console.log("I just executed")
	};


	if(ended === true){ //this conditional checks if the moves have run out so to end the game
		console.log("The Game Is Over Lose");
		console.log(this.theWord.Word);
		Loses ++;
		console.log("Wins are" + " :: " + Wins + " & " + "Loses are" + " :: " + Loses);
		this.starter();
		return;
	}


	console.log("The Moves are " + this.moves);

	
};

myGame.WordsCopier();
myGame.starter();


document.onkeyup = function (event) {

	var keycode = event.keyCode;

	// if(keycode === 13){
	// 	myGame.WordsCopier();
	// 	myGame.starter();
	// };

	if(keycode >= 65 && keycode <= 90){

		var keyId = event.key;
		myGame.checkLetter(keyId);
		myGame.gameStatus();
	};

	if(keycode === 32){
		myGame.shower("hint");
	};
};





