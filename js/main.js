var clips = [
	"correct",
	"wrong",
	"crying"
];

var all_clips = [
	["adele", "adel"],
	["backstreetboys", "backstreet boys", "back street boys"],
	["blackeyedpeas", "black eyed peas", "blackeyed peas", "black eye peas"],  
	["britney", "britney spears", "brittney spears", "britney speers"],
	["britney", "britney spears", "brittney spears", "britney speers"],
	["britney", "britney spears", "brittney spears", "britney speers"],
	["britney", "britney spears", "brittney spears", "britney speers"],
	["britney", "britney spears", "brittney spears", "britney speers"],
	["busta", "busta rhymes", "buster rhymes"],
	["chrisbrown", "chris brown", "chris", "cris brown"],
	["christina", "christina aguilera", "christina"],
	["christina", "christina aguilera", "christina"],
	["elvis", "elvis presley"],
	["eminem", "eminim"],
	["enrique", "enrique iglesias", "enrique", "iglesias"],
	["fergie", "fergy"],
	["george", "george michael"],
	["haddaway"],
	["janet", "janet jackson"],
	["jayz", "jay-z", "jay z", "jay"],
	["bieber", "justin bieber"],
	["timberlake", "justin timberlake", "justin"],
	["katy", "katy perry"],
	["kingsofleon", "kings of leon", "kings of leon"],
	["kingsofleon", "kings of leon", "kings of leon"],
	["ladygaga", "lady gaga", "gaga"],
	["ladygaga", "lady gaga", "gaga"],
	["lana", "lana del rey", "lana delray"],
	["laroux", "la roux", "larou", "la rou"],
	["mariah", "mariah carey", "mariah carrey"],
	["mariah", "mariah carey"],
	["jackson", "michael jackson"],
	["moby"],
	["nodoubt", "no doubt"],
	["rihanna", "rihana"],
	["rihanna", "rihana"],
	["rihanna", "rihana"],
	["robyn", "robin", "roben"],
	["sisqo", "sisco", "cisco", "sysqo", "sysco"],
	["killers", "the killers"],
	["chapman", "tracy chapman", "tracy"],
	["usher"],
	["usher"],
	["vanillaice", "vanilla ice", "vanilla", "vanila ice"]
};

var answers = [
	["correct"],
	["wrong"],
	["crying"]
];

var all_answers = [
	["adele"],
	["backstreetboys", "backstreet boys", "back street boys"],
	["blackeyedpeas", "black eyed peas", "blackeyed peas"],
  	["britney", "britney spears"],
  	["britney", "britney spears"],
  	["britney", "britney spears"],
  	["britney", "britney spears"],
  	["britney", "britney spears"],
	["busta", "busta rhymes", "buster rhymes"],
	["chrisbrown", "chris brown", "chris"],
	["christina", "christina aguilera", "christina"],
	["christina", "christina aguilera", "christina"],
	["elvis", "elvis presley"],
	["eminem"],
	["enrique", "enrique iglesias", "enrique", "iglesias"],
	["fergie"],
	["george", "george michael"],
	["haddaway"],
	["janet", "janet jackson"],
	["jayz", "jay-z", "jay z", "jay"],
	["bieber", "justin bieber"],
	["timberlake", "justin timberlake", "justin"],
	["katy", "katy perry"],
	["kingsofleon", "kings of leon", "kings of leon"],
	["kingsofleon", "kings of leon", "kings of leon"],
	["ladygaga", "lady gaga", "gaga"],
	["ladygaga", "lady gaga", "gaga"],
	["lana", "lana del rey", "lana delray"],
	["laroux", "la roux"],
	["mariah", "mariah carey"],
	["mariah", "mariah carey"],
	["jackson", "michael jackson"],
	["moby"],
	["nodoubt", "no doubt"],
	["rihanna"],
	["rihanna"],
	["rihanna"],
	["robyn", "robin"],
	["sisqo"],
	["killers", "the killers"],
	["chapman", "tracy chapman"],
	["usher"],
	["usher"],
	["vanillaice", "vanilla ice", "vanilla"]
];

ClipPlayer = function( _clips, _answers, _onLoad ) {
    var self = this;

    this.clips = _clips;
    this.answers = _answers;
    this.audioClips = {};

    this.onLoad = _onLoad;
    this.loaded = 0;
    this.lastPlayed = -1;
 
    this.play = function( clip ) {
    	self.lastPlayed = clip;
    	self.audioClips[clip]["clip"].load();
    	self.audioClips[clip]["clip"].play();
    	playing++;
    }
 
    this.load = function() {
    	for( var i = 0, len = self.clips.length; i < len; i++ ) {
    		self.audioClips[i] = {};
    		self.audioClips[i]["clip"] = new Audio();
    		if (self.audioClips[i]["clip"].canPlayType('audio/mpeg;')) {
    			self.audioClips[i]["clip"].src = './audio/' + self.clips[i] + '.mp3';
    		} else {
    			self.audioClips[i]["clip"].src = './audio/' + self.clips[i] + '.ogg';		
    		}
    		

    		//self.audioClips[i]["clip"] = new Audio('./audio/' + self.clips[i] + '.ogg');
    		
    		self.audioClips[i]["tried"] = false;
    		self.audioClips[i]["answer"] = self.answers[i];

    		self.audioClips[i]["clip"].addEventListener('canplaythrough', function() {
    			self.loaded++;
    			if( self.loaded == self.clips.length ) {
    				self.onLoad();
    			}
    		}, false);

    		self.audioClips[i]["clip"].addEventListener('ended', function() {
				playing--;
				if( !playing ) {
					if( self.lastPlayed < 6 && blinkAfter ) {
						blinkGuess();
					}
				}
    		}, false);
    	}
    }
 
    self.load();
}

function blinkMouth() {
	clearTimeout( t );
	blinkCount++;
	if( blinkCount > 4 ) {
		$(".active").removeClass("open");
		blinkCount = 0;
	} else {
		if( blinkCount % 2 == 0 ) {
			$(".active").removeClass("close").addClass("open");
		} else {
			$(".active").removeClass("open").addClass("close");
		}
		setTimeout( blinkMouth, 180 );
	}
}

function blinkRight() {
	clearTimeout( t );
	blinkCount++;
	if( blinkCount > 10 ) {
		$(".right").removeClass("blink right").addClass("complete");
		blinkCount = 0;
	} else {
		if( blinkCount % 2 == 0 ) {
			$(".right").addClass("blink");
		} else {
			$(".right").removeClass("blink");
		}
		setTimeout( blinkRight, 100 );
	}
}

function blinkGuess() {
	clearTimeout( t );
	blinkCount++;
	if( blinkCount > 6 ) {
		$("#guess").removeClass("blink").addClass("active");
		blinkCount = 0;
	} else {
		if( blinkCount % 2 == 0 ) {
			$("#guess").addClass("blink");
		} else {
			$("#guess").removeClass("blink");
		}
		setTimeout( blinkGuess, 110 );
	}		
}

function rightAnswer() {
	cp.audioClips[currentButton]["tried"] = true;

	$(".active .artist").addClass(answers[currentSong][0]).css("opacity",1);
	$(".active").removeClass("active").addClass("right");
	score++;
	cp.play(6);
	blinkRight();
}

function wrongAnswer() {
	cp.audioClips[currentButton]["tried"] = true;

	cp.play(7);
	setTimeout(function(){
		cp.play(8);
	}, 700);
	var go = currentButton;
	setTimeout(function(){
		$("#"+go).removeClass("crying");
		$(".artist", "#"+go).css("opacity",1);
	}, 1600);
						
	$(".active .artist").addClass(answers[currentSong][0]);
	$(".active").removeClass("active").addClass("wrong crying");
}

function checkScore() {
	tries++;

	$("#score p").text( score + "/" + tries );

	if( tries == 6) {
		$("#answer").fadeOut(function(){
			if( score < 6 ) {
				$("#gameover .won").hide();
				$("#gameover .lost").show();
			}

			$("#fb-description").attr("content", "I got "+ score +" out of 6 babies correct. How well do you know your babies, baby?! whosebabyisitanyway.com");
			$("#gameover").fadeIn();
		});
	}

	$("#guess").val("");
}

var t, blinkCount = 0, cp, playing = 0;
var currentSong = -1;
var score = 0;
var tries = 0;
var justTried = true;
var picked = [];
var currentButton = -1;
blinkAfter = false;
$(document).ready(function() {

	for( var i = 0; i < 6; i++ ) {
		var index = Math.floor(Math.random()*all_answers.length);
		while( picked.indexOf(index) != -1 ) {
			index = Math.floor(Math.random()*all_answers.length);
		}
		answers.unshift( all_answers[index] );
		clips.unshift( all_clips[index] );
		picked.push( index );
	}

	cp = new ClipPlayer( clips, answers, function(){
		//console.log("all loaded");
	});

	$("#game .button").click(function() {
		if( !$(this).hasClass("right") ) {
			var index = $(this).attr("id");
			currentButton = index;
			if( cp.audioClips[index]["tried"] == false ) {
				$("#guess").removeClass("active");
				justTried = false;
				currentSong = index;
				blinkAfter = true;
				cp.play( index );

				$(".active").removeClass("active");
				$(this).addClass("active");

				blinkMouth();
			} else if( cp.audioClips[index]["tried"] == true ) {
				blinkAfter = false;
				cp.play( index );
			}
		}
	});	

	$("#guess").click(function() {
		playing = 0;
		if( currentSong != -1 ) {
			$(this).val("");
		}
	});

	$("#enter").click(function(){
		if( !justTried && $("#guess").val() != "" ) {
			justTried = true;
			$("#answer").submit();
		}
	});

	$("#noclue").click(function(){
		if( !justTried ) {
			justTried = true;
			wrongAnswer();
			checkScore();	
		}
		
	});

	$("#answer").submit(function(event) {
		$("#guess").blur();
		if( currentSong != -1 && cp.audioClips[currentSong]["tried"] == false ) {
			if( cp.audioClips[currentSong]["answer"].indexOf($("#guess").val().toLowerCase()) >= 0 ) {
				rightAnswer();
			} else {
				wrongAnswer();
			}
		}

		checkScore();

		return false;
	});

	$(".playshare .playagain").click(function(event){
		event.preventDefault();
		location.reload();
	});
});