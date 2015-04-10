(function($){

	// ----------------------------------------
	// ! shake
	// ----------------------------------------
	var myShakeEvent = new Shake({
	    threshold: 9, // optional shake strength threshold
	    timeout: 1000 // optional, determines the frequency of event generation
	});

	console.log(myShakeEvent);
	// myShakeEvent.start();

	// myShakeEvent.stop();

	// ----------------------------------------
	// ! game
	// ----------------------------------------
	$('.game')
	// shake
	.on('shakeOn', function(e){
		myShakeEvent.start();
	})
	.on('shakeOff', function(e){
		myShakeEvent.stop();
	})
	// candy
	.on('openCandy', function(e){
		$('.shake-result').addClass('on');
	})
	.on('closeCandy', function(e){
		$('.shake-result').removeClass('on');
	})
	// redpacket
	.on('openRedpacket', function(e){
		$('.redpacket-result').addClass('on');
	})	
	.on('setRedpacket', function(e, data){
		
		var root = $('.redpacket-result');
		var _default = {
			title: '这里是一句吉祥语',
			money: '9.99'
		}

		var _data = $.extend( _default, data )

		root.find('h2').text(_data.title);
		root.find('strong').text(_data.money);

	})
	.on('closeRedpacket', function(e){
		$('.redpacket-result').removeClass('on');
	})
	// share
	.on('openShare', function(e){
		$('.notice').addClass('open-share');
	})
	.on('closeShare', function(e){
		$('.notice').removeClass('open-share');
	})
	.on('begin', function(e){
		$('.notice').removeClass('begin').find('.begin').remove();
	})
	// opportunity
	.on('openNoOpportunity', function(e){
		$('.notice').addClass('open-no-opportunity');
	})
	.on('closeNoOpportunity', function(e){
		$('.notice').removeClass('open-no-opportunity');
	})
	// close notice
	.on('touchstart', '.notice', function(e){
		$('.game').trigger('closeShare').trigger('closeNoOpportunity');
	})
	.one('touchstart', '.notice', function(e){
		$('.game').trigger('begin');
	})
	// close redpacket
	.on('touchstart', 'a.close', function(e){
		$('.game').trigger('closeRedpacket');
	})
	// close redpacket
	.on('touchstart', 'a.candy', function(e){
		$('.game').trigger('closeCandy').trigger('openRedpacket');
	})
	// open share
	.on('touchstart', '.share', function(e){
		e.preventDefault();

		$('.game').trigger('openShare');
	})

	// ----------------------------------------
	// ! scroll
	// ----------------------------------------

	var touch_scroll = function () {
		var startY, state, startTop, h;

		h = 0 - $('.touchmove .target').height() + $('.touchmove').height();

		$(document).on('touchmove', 'body', function(e){
			e.preventDefault();

		})
		.on('touchstart', '.touchmove', function(e){
			startY = e.originalEvent.pageY;
			startTop = $('.touchmove .target').css('top').replace('px','') / 1;
			state = 'on';
		})
		.on('touchend', '.touchmove', function(e){
			state = 'off';
		})
		.on('touchmove', '.touchmove', function(e){
			e.preventDefault();

			if ( ( $(e.target).is('.touchmove') || $(e.target).closest('.touchmove').size() > 0 ) ) {
				var dis = startTop + ( e.originalEvent.pageY - startY );

				if (dis > 0) dis = 0;
				if (dis < h ) dis = h;

				$('.touchmove .target').css('top', dis);
			}
		})
	}

	touch_scroll();

})(jQuery)
