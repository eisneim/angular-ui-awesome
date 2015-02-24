ua.directive('uaToggleBarArrow',function(){
	return {
		restric:'EA',
		template:'<a href="" class="uac-togglebararrow-trigger">Menu \
		  <span class="uac-togglebararrow-bar"></span> \
		  <svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54"> \
		  <circle fill="transparent" stroke="#66788f" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle> \
		</svg> \
		</a>',
		replace:true,
		scope:{},
		link:function($scope,elm,attrs,ctrl){
			var isLateralNavAnimating = false;
			var direction = (attrs.direction && attrs.direction == 'right') ? 'uac-right' : 'uac-left';

			elm.addClass(direction);

			elm.on('click',function(e){
				// e.preventDefault();
				elm.toggleClass('open');
				isLateralNavAnimating = !isLateralNavAnimating;
			});
		}
	}
})

