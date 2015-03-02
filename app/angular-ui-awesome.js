/*!
 *	angular-ui-awesome
 * 
 * Copyright(c) 2015 Eisneim Terry
 * MIT Licensed
 */

'use strict';

var ua = angular.module('ngUiAwesome',[]);

// app.run()
ua.directive('uaLink',function(){
	return {
		restrict:'E',
		replace:true,
		transclude:true,
		template:function(elm,attr){
			// console.log(attr)
			var atribute = '';
			if(attr['hover']) atribute+= 'data-hover="'+ attr['hover'] +'"';
			var theme = attr['uaTheme'] == 'light'?'uac-light':'uac-dark' 

			return '<a class="ua-link '+theme+'"><span '+atribute+' ng-transclude=""></span></a>';
		},
		link:function($scope,elm,attr){
			
		}
	}
});

ua.factory('$uaLoader',function(){
  var tpl = '<div class="uac-loader uac-loader-stroke"> \
	      <svg class="circular"> \
	        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/> \
	      </svg> \
	    </div>';
  var count = 0;

  function Loader(option){
    this.elm = null;
    if(!option) var option = {};

    var $container = option.container || document.body;

    this.id = idGen();


    this.elm = angular.element( tpl.replace('__id__',this.id) )[0];
    $container.appendChild(this.elm);

  }

  Loader.prototype.hide = function(){
    this.elm.style.display = 'none';
  }

  Loader.prototype.show = function(){
    this.elm.style.display = 'block';
  }

  Loader.prototype.remove = function(delay){
  	delay = delay || 0;

  	setTimeout(function(){
  		this.elm.remove();

  	}.bind(this),delay);

  };

   function idGen(){
    return 'uac-loader-elm-'+ (count++);
  }

  return function(opt){
    return new Loader( opt );
  };

});


ua.directive('uaLoaderCircle',['$uaLoader',function($uaLoader){
	return {
		restric:'EA',
		template:'<div class="ua-loader-circle" id="__id__"> \
	      <svg class="circular"> \
	        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/> \
	      </svg> \
	    </div>',
		replace:true,
		scope:{},
		link:function($scope,elm,attrs,ctrl){
			
		}
	}
}])
ua.directive('uaToggleBarArrow',function(){
	return {
		restric:'EA',
		template:'<a href="" class="uac-toggle-bararrow">Menu \
		  <span class="uac-togglebararrow-bar"></span> \
		  <svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54"> \
		  <circle fill="transparent" stroke="#66788f" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle> \
		</svg> \
		</a>',
		replace:true,
		scope:{},
		link:function($scope,elm,attrs,ctrl){
			var isLateralNavAnimating = false;
			var direction = (attrs.uaDirection && attrs.uaDirection == 'right') ? 'uac-right' : 'uac-left';

			elm.addClass(direction);

			elm.on('click',function(e){
				// e.preventDefault();
				elm.toggleClass('open');
				isLateralNavAnimating = !isLateralNavAnimating;
			});
		}
	}
})

ua.directive('uaToggleBarCircle',function(){
	return {
		restric:'EA',
		template:'<div class="uac-toggle-barcircle"> \
		  <div class="uac-top"></div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"> \
		    <path class="uac-circle" fill="none" stroke-width="4" stroke-miterlimit="10" d="M16,32h32c0,0,11.723-0.306,10.75-11c-0.25-2.75-1.644-4.971-2.869-7.151C50.728,7.08,42.767,2.569,33.733,2.054C33.159,2.033,32.599,2,32,2C15.432,2,2,15.432,2,32c0,16.566,13.432,30,30,30c16.566,0,30-13.434,30-30C62,15.5,48.5,2,32,2S1.875,15.5,1.875,32"></path> \
		    </svg> \
		  <div class="uac-bottom"></div> \
		</div>',
		replace:true,
		scope:{},
		link:function($scope,elm,attrs,ctrl){
			var isLateralNavAnimating = false;
			var theme = (attrs.uaTheme && attrs.uaTheme == 'dark') ? 'uac-dark' : 'uac-light';

			elm.addClass(theme);

			elm.on('click',function(e){
				// e.preventDefault();
				elm.toggleClass('uac-close');
				isLateralNavAnimating = !isLateralNavAnimating;
			});
		}
	}
})

ua.directive('uaToggleSwitch',function(){
	return {
		restrict:'EA',
		template:function(elm,attr){
			var id = Math.floor(1+Math.random()*10000);
			return '<div class="uac-toggle-switch-wraper"> \
              <input class="uac-toggle-switch" id="'+id+'" type="checkbox">\
              <label class="uac-toggle-switch-btn" for="'+id+'" data-tg-off="OFF" data-tg-on="ON"></label> \
            </div>'
		},
        replace: true,
        scope:{},
        link:function( $scope,elm,attrs,ctrl){
        	var themes = ['skewed','ios','light','flat','flip']
        	var theme = (attrs.uaTheme && themes.indexOf(attrs.uaTheme) != -1 )? attrs.uaTheme : 'ios'; 
        	elm.find('input').addClass( 'uac-toggle-switch-'+theme );

        },
	}
});
