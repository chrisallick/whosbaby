var clips = [
	"adele-dont-you-remember-cut",
	"backstreet-boys-shape-of-my-heart-cut",
	"black-eyed-peas-dont-phunk-with-my-heart-cut",
	"britney-spears_baby-one-more-time_cut",
	"britney-spears-im-a-slave-4-u-cut",
	"britney-spears-till-the-world-ends-cut",
	"correct",
	"wrong",
	"crying"
];

var answers = [
	["adele"],
	["backstreetboys", "backstreet boys", "back street boys"],
	["blackeyedpeas", "black eyed peas", "blackeyed peas"],
	["britney", "britney spears"],
	["britney", "britney spears"],
	["britney", "britney spears"],
	["correct"],
	["wrong"],
	["crying"]
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
    		self.audioClips[i]["clip"] = new Audio('./audio/' + self.clips[i] + '.mp3');
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
					if( self.lastPlayed < 6 ) {
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
		$(".right").removeClass("blink right").addClass("complete");
		blinkCount = 0;
	} else {
		if( blinkCount % 2 == 0 ) {
			$(".right").addClass("blink");
		} else {
			$(".right").removeClass("blink");
		}
		setTimeout( blinkMouth, 100 );
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
	$(".active .artist").addClass(answers[currentSong][0]).css("opacity",1);
	$(".active").removeClass("active").addClass("right");
	score++;
	cp.play(6);
	blinkRight();
}

function wrongAnswer() {
	cp.play(7);
	setTimeout(function(){
		cp.play(8);
	}, 700);
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
$(document).ready(function() {

	cp = new ClipPlayer( clips, answers, function(){
		console.log("all loaded");
	});

	$("#game .button").click(function() {
		if( !$(this).hasClass("right") && !$(this).hasClass("wrong") && !$(this).hasClass("complete") ) {
			var index = $(this).attr("id");
			if( cp.audioClips[index]["tried"] == false ) {
				$("#guess").removeClass("active");
				justTried = false;
				currentSong = index;
				cp.play( index );

				$(".active").removeClass("active");
				$(this).addClass("active");
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
		if( !justTried) {
			justTried = true;
			wrongAnswer();
			checkScore();	
		}
		
	});

	$("#answer").submit(function(event) {
		if( currentSong != -1 && cp.audioClips[currentSong]["tried"] == false ) {
			//console.log( cp.audioClips[currentSong]["answer"].indexOf($("#guess").val().toLowerCase()) );
			if( cp.audioClips[currentSong]["answer"].indexOf($("#guess").val().toLowerCase()) >= 0 ) {
				rightAnswer();
			} else {
				wrongAnswer();
			}
		}

		checkScore();

		return false;
	});
});