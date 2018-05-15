$(function () {

	var checkScrollSpeed = (function (settings) {
		settings = settings || {};

		var lastPos, newPos, timer, delta,
			delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

		function clear() {
			lastPos = null;
			delta = 0;
		}

		clear();

		return function () {
			newPos = window.scrollY;
			if (lastPos != null) { // && newPos < maxScroll 
				delta = newPos - lastPos;
			}
			lastPos = newPos;
			clearTimeout(timer);
			timer = setTimeout(clear, delay);
			return delta;
		};
	})();
	
	var setSkew = _.throttle(function (skew) {
		console.log(skew);
		$('p').css('transform', 'skewY(' + skew + 'deg)');
	}, 16);
	
	var setBack = _.debounce(function(){
		$('p').css('transform', 'skewY(0deg)');
	}, 250);
	
	setSkew(0);
	
	// listen to "scroll" event
	window.onscroll = function () {
		var speed = checkScrollSpeed()
		
		speed = setSpeed(speed*0.1, 5);
		
		setSkew(speed);
		setBack();
	};
	
	function setSpeed(speed, MAX) {
		if (speed > MAX) {
			speed = MAX;
		} else if (speed < -MAX) {
			speed = -MAX;
		}
		
		return speed;
			
	};
	

});