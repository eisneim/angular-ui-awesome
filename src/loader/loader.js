
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