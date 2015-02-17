ua.directive('uaToggle',function(){
	return {
		restric:'EA',
		template:'',
		link:function($scope,elm,attrs,ctrl){

			var isLateralNavAnimating = false;
			var $trigger = document.querySelector('.cd-nav-trigger');
			var $body = document.querySelector('body');

				//open/close lateral navigation
			$trigger.addEventListener('click', function(event){
			      event.preventDefault();
			      //stop if nav animation is running 
			      if( !isLateralNavAnimating ) {
			        $trigger.classList.add('open');
			     				   isLateralNavAnimating = true;   
			      }else{
			        $trigger.classList.remove('open');
			        isLateralNavAnimating = false;
			      }
				});

			elm.on('click',function(e){

			})
		}
	}
})