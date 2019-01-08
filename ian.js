
var questions = [
//Round 1
    {word: 'caught'},
    {word: 'diary'},
    {word: 'fierce'},
    {word: 'advance'},
    {word: 'sincere'},
    {word: 'vegetable'},
    {word: 'bracelet'},
    {word: 'fortunate'},
    {word: 'sponsor'},
    {word: 'tragedy'},
    {word: 'campaign'},
    {word: 'stampede'},
    {word: 'appearance'},
    {word: 'nausea'},
    {word: 'discipline'},
    {word: 'sympathy'},
    {word: 'boundary'},
    {word: 'lightning'},
    {word: 'territorial'},
    {word: 'apparatus'},
//Round 2
	{
		words: [
         { word: 'necessary', correct: true },
         { word: 'neccesary', correct: false },
         { word: 'necesary', correct: false },
		 { word: 'nesesary', correct: false }
		 
			]
    	},
		{
		words: [
         { word: 'separate', correct: true },
         { word: 'saperate', correct: false },
         { word: 'seperate', correct: false },
		 { word: 'sepparate', correct: false }
		 
			]
    	},
		{
		words: [
         { word: 'mischievous', correct: true },
         { word: 'mischeivous', correct: false },
         { word: 'misschevous', correct: false },
		 { word: 'mischevious', correct: false }
		 
			]
    	},
		{
		words: [
         { word: 'conscientious', correct: true },
         { word: 'conscientius', correct: false },
         { word: 'consceintious', correct: false },
		 { word: 'consentious', correct: false }
		 
			]
    	},{
		words: [
         { word: 'exaggerate', correct: true },
         { word: 'exagerate', correct: false },
         { word: 'exaggarate', correct: false },
		 { word: 'exagarrate', correct: false }
		 
			]
    	},
//Round 3		
		{word: 'metaphor'},
		{word: 'column'},
		{word: 'foreign'},
		{word: 'anxious'},
		{word: 'fiery'},
//Round 4		
		{word: 'accommodation'},
		{word: 'soliloquy'},
		{word: 'miscellaneous'},
		{word: 'synchronise'},
		{word: 'conscientious'},
//Round 5		
		{word: 'knowledgeable'},
		
		

];	




var index = 0;

var correctCount = 0;
var incorrectCount = 0;

function nextQuestion() {
    index++;
    if (index > questions.length) {
        quizFinished();
    } else{
        renderQuestion();
    }
}

function renderQuestion(){
    var questionDiv = jQuery('#questions');
    var type = questions[index - 1].word != undefined ? 'word' : 'multichoice';
    if (type == 'word') {
        // Single word 
        questionDiv.html("Question " + (index) + "<br/><br/><input type='text' id='word' spellcheck='false'> <button class='myButton' onclick='checkWord();'>Answer</button>");
      //look at question + index to find a way to add rounds(see line above)
    } else {
        // Multi-choice
        var multiHtml = 'Question ' + (index); + '<br/><br/>'
        for (var x = 0; x < questions[index - 1].words.length; x++){
            multiHtml += "<div> <a class='questionLink' onclick='checkMulti(" + x + ");'>" + questions[index - 1].words[x].word + "</div>";
        }
        questionDiv.html(multiHtml);
    }
}

function checkWord(){
    var word = questions[index - 1].word.toLowerCase();
    var typedWord = jQuery('#word').val().toLowerCase();

    
    if (word == typedWord){ 
        correct();
		play();//AUDIO
		//getRandomSounds();//AUDIO?
    } else{
        incorrect();
        //alert ('the correct spelling was: ' + word);
      document.getElementById('the-correct-answer').innerHTML = 'The correct spelling was: ' + word;
    }
}

function checkMulti(clickedIndex){
    var clickedWord = questions[index -1].words[clickedIndex];
    if (clickedWord.correct) {
        correct();
    } else {
        // for (var x = 0; x < questions[index -1].words.length; x++){
        //     if (questions[index -1].words[x].correct){
        //         alert('The correct spelling was: '+ questions[index -1].words[x].word);
        //         break;
        //     }
        // }
        var correctWords = questions[index -1].words.filter((checkWord) => { return checkWord.correct == true; } );
       
      //alert('the correct spelling was:' + (correctWords.length > 0 ? correctWords[0].word : 'we have no idea actually, oops'));
        incorrect();
     document.getElementById('the-correct-answer').innerHTML = 'The correct spelling was: ' + (correctWords.length > 0 ? correctWords[0].word : 'we have no idea actually, oops');
    }
}

 function getRandomSounds() {
	 var sounds = new Array();
        sounds[0]="http://www.soundjay.com/button/button-1.wav";
        sounds[1]="http://www.soundjay.com/button/button-2.wav";
        sounds[2]="http://www.soundjay.com/button/button-3.wav";   
        sounds[3]="http://www.soundjay.com/button/button-4.wav";
        sounds[4]="http://www.soundjay.com/button/button-5.wav";
            var randomNum = Math.floor(Math.random()*sounds.length);
            document.getElementById("myaudio").src=sounds[randomNum];
        }
      //  getRandomSounds();

function correct(){
    var correctDiv = jQuery('#correct');
    var incorrectDiv = jQuery('#incorrect');
    var questionDiv = jQuery('#questions');
    var beeLogoDiv = jQuery('#beeLogo');
    var leftLogoDiv = jQuery('#leftLogo');
    beeLogoDiv.hide();
    leftLogoDiv.hide();
    questionDiv.hide(); //check 
    correctDiv.show();
    correctDiv.delay(4000).fadeOut(2000);  //check
    incorrectDiv.hide();
    questionDiv.delay(6000).fadeIn(2000);
    beeLogoDiv.delay(6000).fadeIn(2000);//check
    leftLogoDiv.delay(6000).fadeIn(2000);
    nextQuestion();
    correctCount++;
    updateCountDisplay();
}

function incorrect(){
    var correctDiv = jQuery('#correct');
    var incorrectDiv = jQuery('#incorrect');
    var questionDiv = jQuery('#questions');
    var beeLogoDiv = jQuery('#beeLogo');
    var leftLogoDiv = jQuery('#leftLogo');
    beeLogoDiv.hide();
    leftLogoDiv.hide();
    questionDiv.hide();
    correctDiv.hide();
    incorrectDiv.show();
    incorrectDiv.delay(4000).fadeOut(2000);//check
    questionDiv.delay(6000).fadeIn(2000);
    beeLogoDiv.delay(6000).fadeIn(2000);//check
    leftLogoDiv.delay(6000).fadeIn(2000);
    nextQuestion();
    incorrectCount++;
    updateCountDisplay();
}


function play(){
    var audio = document.getElementById("audio");
    audio.play();
}





function updateCountDisplay(){
    var countDiv = jQuery('#counts');
    countDiv.html('Total: ' + 'Correct: ' + correctCount + '.  Incorrect: ' + incorrectCount);
}

function quizFinished(){
    var questionDiv = jQuery('#questions');
    questionDiv.html('<h2>Quiz finished!</h2>');
}
