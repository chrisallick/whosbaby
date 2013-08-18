function blink() {
	clearTimeout( t );
	blinkCount++;
	if( blinkCount > 10 ) {
		clearTimeout( t );
		$(".right").removeClass("blink");
	} else {
		if( blinkCount % 2 == 0 ) {
			$(".right").addClass("blink");
		} else {
			$(".right").removeClass("blink");
		}
		setTimeout( blink, 100 );
	}
	
	
	
}

var t, blinkCount = 0;
$(document).ready(function() {
	$("#game .button").click(function(){
		$(".active").removeClass("active");
		$(this).addClass("active");

		setTimeout( blink, 100 );
	});

	
});