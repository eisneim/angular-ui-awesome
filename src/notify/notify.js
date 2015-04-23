ua.factory('$uaNotify',function(){
	/**
	 * store id for notification;
	 */
	var id = 0;
	// store all added notify, so according previous notify, we can postion next notify
	// [instacne,instance]
	let notifiers = [];

	class Notify{
		constructor( opt ){
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

		_showMsg (type,msg,title){
			console.log('should show some message');
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
		/**
		 * for suicide: remove element and remove itself from notifiers array;
		 */
		suicide(){
			// prevent click multi times
			if( this.leaving ) return;
			this.leaving = true;

			this.elm.classList.add('hidding');

			setTimeout(function(){
				notifiers.shift();

				this.elm.remove();
			}.bind(this),500)
		}

		error( msg, title ){
			this._showMsg('error',msg,title );
		}

		success(msg, title){
			Array.prototype.unshift.call(arguments,'success');
			this._showMsg.apply(this, arguments )
		}

		info(msg, title){
			Array.prototype.unshift.call(arguments,'info');
			this._showMsg.apply(this, arguments )
		}

		warn(msg, title){
			Array.prototype.unshift.call(arguments,'warn');
			this._showMsg.apply(this, arguments )
		}
	}

	function _idGen(prefix){
		return (prefix||'nbNoti-elm-') + id++;
	}

	return ( ()=>{
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
		var notifier = {
			notifier: defaultNotifier,
		}

		notifier.error = notifier.notifier.error.bind(notifier.notifier);
		notifier.warn = notifier.notifier.warn.bind(notifier.notifier);
		notifier.info = notifier.notifier.info.bind(notifier.notifier);
		notifier.success = notifier.notifier.success.bind(notifier.notifier);

		notifier.create = (opt)=>{
			// remove the default notifier;
			notifiers.unshift()

			this.notifier = new Notify(opt);
			notifiers.push(this.notifier);

			return this.notifier;
		}
		return notifier

	})()


});