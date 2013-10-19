var clips = [
	"adele-dont-you-remember-cut",
	"backstreet-boys-shape-of-my-heart-cut",
	"black-eyed-peas-dont-phunk-with-my-heart-cut",
	"britney-spears_baby-one-more-time_cut",
	"britney-spears-im-a-slave-4-u-cut",
	"britney-spears-till-the-world-ends-cut"
];

var answers = [
	"adele",
	"backstreet boys",
	"black eyed peas",
	"britney spears",
	"britney spears",
	"britney spears"
];

ClipPlayer = function( _clips, _answers, _onLoad ) {
    var self = this;

    this.clips = _clips;
    this.answers = _answers;
    this.audioClips = {};

    this.onLoad = _onLoad;
    this.loaded = 0;
 
    this.play = function( clip ) {
    	self.audioClips[clip]["clip"].load();
    	self.audioClips[clip]["clip"].play();
    	playing++;
    }
 
    this.load = function() {
    	for( var i = 0, len = self.clips.length; i < len; i++ ) {
    		self.audioClips[i] = {};
    		self.audioClips[i]["clip"] = new Audio('./audio/' + self.clips[i] + '.mp3');
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
					blinkGuess();
				}
    			
    		}, false);
    	}
    }
 
    self.load();
}

function blinkRight() {
	clearTimeout( t );
	blinkCount++;
	if( blinkCount > 10 ) {
		clearTimeout( t );
		$(".right").removeClass("blink");
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
	if( blinkCount > 4 ) {
		clearTimeout( t );
		$("#guess").removeClass("blink");
	} else {
		if( blinkCount % 2 == 0 ) {
			$("#guess").addClass("blink");
		} else {
			$("#guess").removeClass("blink");
		}
		setTimeout( blinkGuess, 110 );
	}		
}

var t, blinkCount = 0, cp, playing = 0;
var currentSong = -1;
var score = 0;
$(document).ready(function() {

	cp = new ClipPlayer( clips, answers, function(){
		console.log("all loaded");
	});

	$("#game .button").click(function() {
		if( !$(this).hasClass("right") && !$(this).hasClass("wrong") ) {
			$(".active").removeClass("active");
			$(this).addClass("active");

			var index = $(this).attr("id");
			currentSong = index;
			cp.play( index );			
		}

	});	

	$("#guess").click(function() {
		playing = 0;
		if( currentSong != -1 ) {
			$(this).val("");
		}
	})

	$("#answer").submit(function(event) {
		if( currentSong != -1 ) {
			if( $("#guess").val().toLowerCase() == cp.audioClips[currentSong]["answer"].toLowerCase() ) {
				console.log("awesome");
				$(".active").removeClass("active").addClass("right");
				score++;
				if( score == 6) {
					$("#answer").fadeOut(function(){
						$("#gameover").fadeIn();
					});
				}
				blinkRight();
			} else {
				$(".active").removeClass("active").addClass("wrong crying");
			}			
		}

		return false;
	});
});