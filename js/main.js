var clips = [
	"adele-dont-you-remember-cut",
	"backstreet-boys-shape-of-my-heart-cut",
	"black-eyed-peas-dont-phunk-with-my-heart-cut",
	"britney-spears_baby-one-more-time_cut",
	"britney-spears-im-a-slave-4-u-cut",
	"britney-spears-till-the-world-ends-cut"
];

ClipPlayer = function( _clips, _onLoad ) {
    var self = this;

    this.clips = _clips;
    this.audioClips = new Array();

    this.onLoad = _onLoad;
    this.loaded = 0;
 
    this.play = function( clip ) {
    	self.audioClips[clip].load();
    	playing++;
    	self.audioClips[clip].play();
    }
 
    this.load = function() {
    	for( var i = 0, len = self.clips.length; i < len; i++ ) {
    		var audio = new Audio('./audio/' + self.clips[i] + '.mp3');

    		audio.addEventListener('canplaythrough', function() {
    			self.audioClips.push( this );
    			self.loaded++;
    			if( self.loaded == self.clips.length ) {
    				self.onLoad();
    			}
    		}, false);

    		audio.addEventListener('ended', function() {
				playing--;
				if( !playing ) {
					blinkGuess();
				}
    			
    		}, false);
    	}
    }
 
    self.load();
}

// function blink() {
// 	clearTimeout( t );
// 	blinkCount++;
// 	if( blinkCount > 10 ) {
// 		clearTimeout( t );
// 		$(".right").removeClass("blink");
// 	} else {
// 		if( blinkCount % 2 == 0 ) {
// 			$(".right").addClass("blink");
// 		} else {
// 			$(".right").removeClass("blink");
// 		}
// 		setTimeout( blink, 100 );
// 	}
// }

function blinkGuess() {
	clearTimeout( t );
	blinkCount++;
	if( blinkCount > 4 ) {
		clearTimeout( t );
		$(".guess").removeClass("blink");
		blinkCount = 0;
	} else {
		if( blinkCount % 2 == 0 ) {
			$(".guess").addClass("blink");
		} else {
			$(".guess").removeClass("blink");
		}
		setTimeout( blinkGuess, 110 );
	}		
}

var t, blinkCount = 0, cp, playing = 0;
$(document).ready(function() {

	cp = new ClipPlayer( clips, function(){
		console.log("all loaded");
	});

	$("#game .button").click(function() {
		$(".active").removeClass("active");
		$(this).addClass("active");

		var index = $(this).attr("id");
		self.cp.play( index );
	});	
});