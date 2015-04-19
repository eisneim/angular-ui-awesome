ua.factory('$uaNotify',function(){
	/**
	 * store id for notification;
	 */
	var id = 0;
	// store all added notify, so according previous notify, we can postion next notify
	// [instacne,instance]
	var notifiers = [];

	function Notify( opt ){
		this.id = opt.id || _idGen();
		this.container = opt.container || document.body ;
		this.life = opt.life || 4000,
		// defaults to true;
		this.clickToHide = !opt.clickNotHide;
		this.type = opt.type || 'full';// full, block
		/**
		 * if type is block, you have to provide position: top or bottom, left or right;
		 */
		if(opt.position && typeof opt.position == 'object' ){
			this.pos = opt.position;
		}else{
			this.pos = {top:'0em',right:'0em'};
		}

	}

	var pt = Notify.prototype;

	pt._showMsg = function(type,msg,title){
		this.elm = document.createElement('div');


		this.elm.style.position = 'fixed';

		this.pos.top ? ( this.elm.style.top = this.pos.top ) : ( this.elm.style.bottom = this.pos.bottom );
		

		if(this.type == 'block'){
			this.pos.left ? ( this.elm.style.left = this.pos.left ) : ( this.elm.style.right = this.pos.right );
		}

		this.elm.className = 'nb-notify notify-'+type + ' notify-'+this.type;

		var tpl = '';
		if(title){
			tpl += '<h4>'+title+'</h4>';
		}
		tpl += '<p>'+msg+'</p>';

		this.elm.innerHTML = tpl;

		// append to container
		this.container.appendChild(this.elm);
		if(this.clickToHide){
			this.elm.onclick = this.suicide.bind(this);
		}
		// suicide timer
		setTimeout( this.suicide.bind(this), this.life );
	}

	pt.suicide = function(){
		// prevent click multi times
		if( this.leaving ) return;
		this.leaving = true;

		this.elm.classList.add('hidding');

		setTimeout(function(){
			notifiers.shift();

			this.elm.remove();
		}.bind(this),500)
	}

	pt.error = function( msg, title ){
		// 超级装逼的写法，我也来脱了裤子放P一会，免得产品经理说我写的代码没有经过精细的设计
		Array.prototype.unshift.call( arguments ,'error');
		this._showMsg.apply(this, arguments )
		/*
			其实只需要这样：   this._showMsg('error',msg,title );
		 */
	}

	pt.success = function(msg, title){
		Array.prototype.unshift.call(arguments,'success');
		this._showMsg.apply(this, arguments )
	}

	pt.info = function(msg, title){
		Array.prototype.unshift.call(arguments,'info');
		this._showMsg.apply(this, arguments )
	}
	pt.warn = function(msg, title){
		Array.prototype.unshift.call(arguments,'warn');
		this._showMsg.apply(this, arguments )
	}
	function _idGen(prefix){
		return (prefix||'nbNoti-elm-') + id++;
	}

	return ( function(){
		var defaultNotifier = new Notify({
			container: document.body,
			life: 5000,
			type: 'full',
			position: {
				top: '0px',
				left: '0px',
			}
		});

		notifiers.push( defaultNotifier );

		return {
			notifier: defaultNotifier ,
			error: this.notifier.error,
			info: this.notifier.info,
			success: this.notifier.success,
			create: function(opt){
				this.notifier = new Notify(opt);
				notifiers.push(this.notifier);

				return this.notifier;
			}
		}

	})()


});