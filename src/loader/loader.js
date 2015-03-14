
ua.factory('$uaLoader',function(){
  var tpls = {};
  tpls.stroke = '<div class="uac-loader uac-loader-stroke" id="__id__"> \
	      <svg class="circular"> \
	        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/> \
	      </svg> \
	    </div>';
  tpls.liquidSquare = '<div class="uac-loader uac-loader-liquidsquare" id="__id__"> <div></div> <div></div> <div></div><div></div> </div>';

  tpls.fourdots = '<div class="uac-loader-fourdots"> \
    <div class="uac-loader-dot uac-loader-red"></div> \
    <div class="uac-loader-dot uac-loader-blue"></div> \
    <div class="uac-loader-dot uac-loader-green"></div> \
    <div class="uac-loader-dot uac-loader-yellow"></div> \
  </div>';

  var count = 0;

  function Loader(option){
    this.elm = null;
    if(!option) var option = {
      theme:'stroke',
    };
    var $container = option.container || document.body;
    var tpl = tpls[ option.theme ] || tpls['stroke'];

    this.id = idGen();

    this.elm = angular.element( 
      tpl.replace('__id__',this.id)
      .replace('__className__',option.className || '') 
    )[0];
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


