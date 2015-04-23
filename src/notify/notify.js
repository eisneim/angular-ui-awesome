ua.factory('$uaNotify',function(){
	/**
	 * store id for notification;
	 */
	var id = 0;
	// store all added notify, so according previous notify, we can postion next notify
	// [instacne,instance]
	window.notifiers = [];

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

			this.elm.className = 'ua-notify notify-'+type + ' notify-'+this.type;

			var tpl = '';
			if(title){
				tpl += '<h4>'+title+'</h4>';
			}
			tpl += '<p>'+msg+'</p>';

			this.elm.innerHTML = tpl;
			console.log(this.elm);

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
			console.log('should__remove itself')
			console.log(this);
			// prevent click multi times
			if( this.leaving ) return;

			this.leaving = true;

			this.elm.classList.add('hidding');

			setTimeout(function(){
				notifiers.shift();
				this.leaving = false;

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
		return (prefix||'uaNoti-elm-') + id++;
	}

	function registerAllMethod( instance, defaultOption ){
		['error','warn','info','success'].forEach(function( property,index ){
			instance[ property ] = (msg,title) =>{
				instance.notifier = new Notify( instance.options || defaultOption );
				notifiers.push( instance.notifier );
				return instance.notifier[ property ](msg,title);
			}

		})
	}

	return ( ()=>{
		var defaultOption = {
			container: document.body,
			life: 5000,
			type: 'full',
			position: {
				top: '0px',
				left: '0px',
			}
		};

		var notifier = {
			options:null,
			notifier: null,
		}

		registerAllMethod( notifier , defaultOption );

		notifier.config = (opt) =>{
			if(typeof opt != 'object') throw Error('option must be an object');
			this.options = opt;
		}

		notifier.create = (opt)=>{
			this.config(opt);

			this.notifier = new Notify(opt);
			notifiers.push(this.notifier);

			return this.notifier;
		}

		return notifier

	})()


});