/**
 * TODO.
 * 1.hover over to pause suicide timeout
 * 2.
 */

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
			this.type = opt.type || 'block';// full, block

			this.theme = ['flip','bouncyflip','jelly','scale','slide','genie'].indexOf(opt.theme)?opt.theme:'flip';
			/**
			 * if type is block, you have to provide alignment
			 */
			this.alignVertical = opt.alignVertical == 'bottom'? 'bottom' : 'top';
			this.alignHorizontal = opt.alignHorizontal == 'left'? 'left' : 'right';

			this.wraper = this.getWraper( this.container );
		}
		/**
		 * in order to show mutible 
		 * @return {[type]} [description]
		 */
		getWraper(container){
			var wraper = document.getElementById('ua-notify-waper');
			if(!wraper ){
				wraper = document.createElement( 'div' );
				container.appendChild(wraper);
				wraper.id = 'ua-notify-waper';
				wraper.style.position = 'absolute';

			}

			wraper.style[ this.alignVertical ] = '0';
			if(this.alignVertical == 'top'){
					wraper.style[ 'bottom' ] = 'auto';
			}else{
				wraper.style[ 'top' ] = 'auto';
			}
			

			wraper.style[ this.alignHorizontal ] = '0';

			if(this.type == 'full') wraper.style.width ='100%';

			return wraper;
		}

		_showMsg (type,msg,title){
		
			this.elm = document.createElement('div');
			this.elm.classList.add('clearfix');

			var styleString = '';
			if(this.type == 'block'){
				styleString = 'float:'+ this.alignHorizontal;
			}

			var titleTpl = '<h5 class="notify-title">'+title+'</h5>';
			var tpl = `<div class="ua-notify notify-${type} notify-${this.type} ua-notify-${this.theme}" style="${styleString}">
					${title? titleTpl : ''}<p>${msg}</p>
			<div>`

			this.elm.innerHTML = tpl;

			// append to container
			this.wraper.appendChild(this.elm);

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

			this.elm.children[0].classList.add('ua-notify-hidding');

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
			life: 4000,
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
			notifier.config(opt);

			this.notifier = new Notify(opt);
			notifiers.push(this.notifier);

			return this.notifier;
		}

		return notifier

	})()


});