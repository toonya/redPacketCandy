(function(){
	function Player(el, callback){
		this.el = el;
		this.callback = callback || function(){}
		this.isPlay = true;
		this.init();
	}
	Player.prototype = {
		init: function(){
			var _this = this,
				attr = {loop: false, src: this.el.attr("data-src")};

			this._audio = new Audio;

            $(this._audio).on({
            	canplay: function(){
            		_this.callback.call(_this, true);
            		
            	},
            	error: function(e){
            		_this.callback.call(_this, false, e);
            	}
            })

			try{
	            for (var i in attr){
	                attr.hasOwnProperty(i) && i in this._audio && (this._audio[i] = attr[i]);
	            }

	            // this._audio.load(); // 会导致iPad下"未知错误"等提示的出现
            }catch(e){
            	this.callback.call(_this, false, e);
            }
            
			this.el.on('click', function(){
				_this._play();
			});
		},
		_play: function(){
			var _text = this.el.prev()[0];

			
			if(!this.isPlay){
				this._audio.play();
				this.el.addClass('on');
				$(_text).text('打开');
			}else{
				this._audio.pause();
				this.el.removeClass('on');
				$(_text).text('关闭');
			}
			this.isPlay = !this.isPlay;

			_text.className = 'text';
			setTimeout(function(){
				_text.className = 'text move hide';
			}, 1000);
		}
	}

	window.Player = Player;
})();

