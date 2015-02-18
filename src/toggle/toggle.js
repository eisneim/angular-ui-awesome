ua.directive('uaToggleOne',function(){
	return {
		restric:'EA',
		template:'<a href="#cd-nav" class="cd-nav-trigger">Menu \
		  <span class="cd-nav-icon"></span> \
		  <svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54"> \
		  <circle fill="transparent" stroke="#66788f" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle> \
		</svg> \
		</a>',
		link:function($scope,elm,attrs,ctrl){
			var isLateralNavAnimating = false;

			elm.on('click',function(e){
				// e.preventDefault();
				elm.toggleClass('open');
				isLateralNavAnimating = !isLateralNavAnimating;

				// if( !isLateralNavAnimating ) {
				// 	elm.classList.add('open');
				// 	isLateralNavAnimating = true;   
				// }else{
				// 	elm.classList.remove('open');
				// 	isLateralNavAnimating = false;
				// }
			});
		}
	}
})