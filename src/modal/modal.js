ua.factory('$uaModal',[function(){

	class Modal {
		constructor( opt ) {
			this.type = opt.type || 'confirm';// prompt
			// this.event = opt.event; // get starting x,y position 
				 

		}

		_show(){

		}
		
		_destory(  ){

		}

		confirm( message ){

		}

		prompt( message ){

		}

		custom( opt ){


		}


	}
	
	return function(opt){
		return new Modal( opt );
	}

}])