(function($){

	// ----------------------------------------
	// ! shake
	// ----------------------------------------
	var myShakeEvent = new Shake({
	    threshold: 9, // optional shake strength threshold
	    timeout: 1000 // optional, determines the frequency of event generation
	});

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
			title: '可惜，可惜',
			money: '0.00'
		}

		var _data = $.extend( _default, data )


		root.find('h2').text(_data.title);

		if ( _data.money.trim() == '0.00' ) {
			root.find('.p-2').hide();
			root.find('.p-1').hide();
			root.find('.note').hide();
			root.find('strong').text(_data.money);
		}
		else {
			root.find('strong').text(_data.money);
			root.find('.p-2').show();
			root.find('.p-1').show();
			root.find('.note').show();
		}

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
