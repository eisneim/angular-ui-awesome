/*!
 *	angular-ui-awesome
 * 
 * Copyright(c) 2015 Eisneim Terry
 * MIT Licensed
 */

'use strict';

var ua = angular.module('ngUiAwesome',[]);

// app.run()
ua.factory('uaUtil',[function(){
	var dom = {};
	/**
	 * in order to calculate top,left value of ripple center ,
	 * @param  {[type]} elm [description]
	 * @return {Node}     [description]
	 */
	dom.findParentScrolled = function (elm){
		var parent = elm.parentNode;
		if(parent.isEqualNode(document.body) ) return false;

		var styles = getComputedStyle(parent);

		if( 
			elm.scrollHeight > parent.clientHeight && 
			(  styles['overflow']=='scroll'|| styles['overflow-y'] =='scroll'||styles['overflow'] =='auto'||styles['overflow-y'] =='auto'  )
		){
			return parent;
		}else{
			return findParentScrolled( parent );
		}
	};

	// ------------------------------
	
	var _id = 0;
	/**
	 * generate an id for element
	 * @param  {string} prefix  
	 * @return {string}         
	 */
	function idGen(prefix){
		return (prefix || 'uac-comp-')+ _id++;
	}
	/**
	 *  dirAttrToString 
	 * @param  {object} attr [description]
	 * @return {string}      [description]
	 */
	function dirAttrToString(attr){
		var attributes = '';
		for(var aa in attr ){
			if(!attr.hasOwnProperty(aa) || ['$attr','$$element'].indexOf(aa)>=0){
				continue;
			}
			var upperCaseIdx = aa.search(/[A-Z]/);
			if( upperCaseIdx >0 ) {
				var newAttr = aa.substr(0,upperCaseIdx) + '-'+ aa.substr(upperCaseIdx);
				attributes +=( newAttr +'="'+attr[aa]+'"  ');	
			}else{
				attributes += aa+'="'+attr[aa]+'"  ';	
			}
		}
		return attributes;
	}

	return {
		dom:dom,
		idGen:idGen,
		dirAttrToString: dirAttrToString, 
	}

}])
ua.directive('uaButton',['uaUtil',function(uaUtil){
	function linkFunc($scoe,elm,attr){
		var rippleElm = document.createElement('span');
		rippleElm.className = 'uac-button-ripple';

		var rect = elm[0].getBoundingClientRect();

		rippleElm.style.height = rippleElm.style.width = Math.max(rect.width, rect.height) + 'px';
		
		elm[0].appendChild(rippleElm);

		function clickHandel(e){
			rippleElm.classList.remove('uac-animate');
			rect = elm[0].getBoundingClientRect();
			var top = (e.clientY - rect.top) - rippleElm.offsetHeight / 2  - document.body.scrollTop;
			var left = e.clientX - rect.left - rippleElm.offsetWidth / 2  - document.body.scrollLeft;

			// var top = (e.clientY - rect.top) - rippleElm.offsetHeight / 2;
			// var left = e.clientX - rect.left - rippleElm.offsetWidth / 2;
			
			rippleElm.style.top = top + 'px';
			rippleElm.style.left = left +'px';

			rippleElm.classList.add('uac-animate');
		}

		elm.on('click',clickHandel);
	};

	function stringToNode(string){

		var div = document.createElement('div');
		div.innerHTML = string;
		return  div.childNodes;
	}
	// forEach method, could be shipped as part of an Object Literal/Module
	function forEach(array, callback, scope) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(scope, array[i], i ); // passes back stuff we need
	  }
	};
	

	return {
		restrict: 'E',
		// replace: true,
		// scope:{},
		compile:function(tElm,attr){
			var inner = tElm[0].innerHTML;
			var tpl;
			// add all attributes to it;
			if('href' in attr){
				tpl = '<a class="uac-button" __attr__>__replaceme__</a>';
			}else{
				tpl = '<button class="uac-button" __attr__>__replaceme__</button>'
			}

			var topElm = tpl.match(/^\<.+?\>/);
			if(!topElm || !topElm[0]) throw new TypeError('invalid tpl string, it must have a top level element');
			
			// attributes
			var attributes = '';
			for(var aa in attr ){
				if(!attr.hasOwnProperty(aa) || ['$attr','$$element'].indexOf(aa)>=0){
					continue;
				}
				// if this attribute already exitst
				var attrIndex = topElm[0].indexOf( aa+'="');
				if(  attrIndex > -1  ){ 
					tpl = tpl.replace(aa+'="', aa+'="'+ attr[aa]+ ' ');
				}else {
					attributes += aa+'="'+attr[aa]+'"';	
				}
				
			}

			// now replace old Node with new nodes
			var innerNodes = stringToNode( 
				tpl.replace('__replaceme__',inner ).replace('__attr__',attributes) 
			);
			forEach(innerNodes,function(node,index){
				tElm[0].parentNode.insertBefore(node, tElm[0].nextSibling );
			});
			tElm[0].remove();
			return linkFunc;
		}
	}
}]);

ua.directive('uaInput',['uaUtil',function(uaUtil){
	
	return {
		restrict: 'E',
		replace: true,
		template:function(tElm,attr ){
			var theme = attr['uaTheme'] || 'nao';
			var label = attr['uaLabel'] || 'input box';
			var inputId = uaUtil.idGen('uainput');


			var tpl = '<span class="uac-input input--'+theme+'" '+
					(attr['ngModel'] ?'ng-class="{ \'input--filled\':'+attr['ngModel']+'}"':'')+
				'>'
			
			var attributes = uaUtil.dirAttrToString(attr);
			
			tpl +=	'<input '+attributes+' class="input__field input__field--'+theme+'" type="text" id="'+inputId+'"/> ';

			var labelContent = '';
			if(['yoshiko','chisato','kozakura'].indexOf(theme)>-1){
				labelContent = attr['uaContent']||label;
			}
			// --- the label ----
			tpl += '<label class="input__label input__label--'+theme+'" for="'+inputId+'"> \
						<span class="input__label-content input__label-content--'+theme+'" data-content="'+labelContent+'">'+label+'</span> \
					</label>';

			// ------------------- some special theme's templates ---------------
			if(theme == 'nao'){
				tpl += '<svg class="graphic graphic--'+theme+'" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/></svg>';
			}else if(theme == 'shoko'){
				tpl += '<svg class="graphic graphic--shoko" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/><path d="M0,2.5c0,0,298.666,0,399.333,0C448.336,2.5,513.994,13,597,13c77.327,0,135-10.5,200.999-10.5c95.996,0,402.001,0,402.001,0"/></svg>';
			}else if(theme == 'kozakura'){
				tpl += '<svg class="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/></svg>';
			}

			tpl +='</span>';
			return tpl;
		},
	}
}]);
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

  tpls.bokeh = '<ul class="uac-loader uac-loader-bokeh"><li></li><li></li><li></li><li></li></ul>';

  tpls.kiri = '<div class="uac-loader uac-loader-kiri"><span></span><span></span><span></span></div>';

  tpls.sail = '<div class="uac-loader uac-loader-sail"><span></span><span></span><span></span><span></span></div>';
  
  tpls.breath = '<div class="uac-loader uac-loader-breath"><span></span><span></span></div>';

  tpls.flipDot = '<div class="uac-loader uac-loader-flipdot"> \
    <div class="semicircle upper-base"><div class="semicircle-inner"></div></div> \
    <div class="semicircle upper-move"><div class="semicircle-inner"></div></div> \
    <div class="semicircle lower-base"><div class="semicircle-inner"></div></div> \
    <div class="semicircle lower-move"><div class="semicircle-inner"></div></div> \
  </div>';
  tpls.squarePuls = '<div class="uac-loader uac-loader-squarepuls"><span></span><span></span><span></span></div>';
  tpls.wave = '<div class="uac-loader uac-loader-wave"><span></span><span></span><span></span><span></span><span></span><span></span></div>';
  tpls.orbit = '<div class="uac-loader uac-loader-orbit"><div class="uac-loader-dot"></div><div class="uac-loader-dot"></div><div class="uac-loader-dot"></div><div class="uac-loader-dot"></div><div class="uac-loader-dot"></div></div>';

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

ua.directive('uaWords',function(){
	function parseWords(string){
		return string.split('|||');
	}

	function wordToLetter(word){
		var letters = '';
		for(var ii=0;ii<word.length; ii++){
			letters += '<i><em>'+ word[ii] +'</em></i>';
		}
		return letters;
	}

	var letterAnimThemes = ['letter-rotatex','letter-rotatey','letter-scale','letter-roll','letter-type'];

	return {
		restric:'E',
		template:function(elem,attr){
			var theme = attr.uaTheme ||'rotate';
			var words = attr.words || 'no|||words|||specified';

			words = parseWords(words);
			// build up template
			var tpl = '<span class="uac-words">';   
			if( letterAnimThemes.indexOf(theme) > -1 ){
				for(var ii=0;ii<words.length ; ii++){
					tpl+= '<b '+ ( ii==0 ? 'class="uac-visible"':'')+'>'+wordToLetter( words[ii].trim() ) + '</b>';
				}

			}else{
				for(var ii=0;ii<words.length ; ii++){
					tpl+= '<b '+ ( ii==0 ? 'class="uac-visible"':'')+'>'+ words[ii].trim() + '</b>';
				}
			}
			tpl += '</span>';

			return tpl;
		},
		replace:true,
		// scope:{},
		link:function($scope,elm,attr,ctrl){
			var _duration = parseInt(attr.uaDuration,10) || 2500;
			var animationDuration = 1200;// in and out duration;
			var letterAnimDelay = 80;

			var _letterDuration = 800;

			var theme = attr.uaTheme ||'rotate';
			 elm.addClass(( theme.indexOf('letter')>-1?'uac-':'uac-words-')+theme );

			var $words = elm.find('b');

			var wordAnimatorTimeout;

			var activeWordIndex=0,$current = $words[0],$previous, $next;
			function wordAnimator(){
				if(activeWordIndex >= $words.length ) activeWordIndex = 0;
				$current = getByIndex($words, activeWordIndex );
				$previous = getByIndex($words, activeWordIndex - 1 );
				$next = getByIndex($words, activeWordIndex +1 );

				$current.classList.remove('uac-hidden');
				$current.classList.add('uac-visible');

				$previous.classList.remove('uac-visible');
				$previous.classList.add('uac-hidden');
				// check for extra theme;
				extraThemeAfter();
				// check if this need letter animation
				if(letterAnimThemes.indexOf(theme) > -1){
					letterIn($current.childNodes );
					letterOut($previous.childNodes );
				}

				activeWordIndex ++;
				// self call
				wordAnimatorTimeout = setTimeout(wordAnimator,_duration + animationDuration );
			}
			function extraThemeAfter(){
				switch(theme){
					case 'loading':
						elm.removeClass('uac-loading');
						setTimeout(function(){ elm.addClass('uac-loading'); }, 200);
						break;
					case 'clip':
						// delay 1 loop;
						setTimeout(cliping , _duration + 100 )
						break;
					case 'letter-type':
						elm.removeClass('uac-waiting');
						setTimeout(function(){
							// select words
							elm.addClass('uac-selected');
						} , _duration + 100 )
						break;
					default: '';
				}
			}
			/**
			 * trigger cliping animation onece;
			 */
			function cliping(){
				// calculate length of word;
				var width = $next.getBoundingClientRect().width;
				elm[0].style.width = '0px' ;
				setTimeout(function(){
					elm[0].style.width = (width + 15 )+'px' ;
				},1000)
			}

			// sequencially add .uac-in and .uac-out to letters
			var inLetterIndex = 0, outLetterIndex = 0;
			function letterIn(letters){
				if(theme == 'letter-type'){
					elm.removeClass('uac-selected');
				}

				if(letters[inLetterIndex]) {
					letters[inLetterIndex].classList.remove('uac-out');
					letters[inLetterIndex].classList.add('uac-in');
				}
					
				inLetterIndex++;
				if( inLetterIndex < letters.length ) {
					setTimeout(function(){ letterIn(letters) },letterAnimDelay );
				}else{ // finished all letter animation , now waitting for next
					inLetterIndex = 0;
					// flicker effect
					if(theme == 'letter-type'){
						elm.addClass('uac-waiting');
					}
				}
			}

			function letterOut(letters){
				if(theme == 'letter-type'){
					// hide all at onece;
					for(var ii=0;ii<letters.length; ii++){
						letters[ii].classList.remove('uac-in');
					}
					return;
				}
				if(letters[outLetterIndex]) {
					letters[outLetterIndex].classList.remove('uac-in');
					letters[outLetterIndex].classList.add('uac-out');
				}

				outLetterIndex++;

				if( outLetterIndex < letters.length ){
					return setTimeout(function(){ letterOut(letters) },letterAnimDelay );
				}else{
					for(var ii=0;ii<letters.length; ii++){
						letters[ii].classList.remove('uac-in');
					}
					outLetterIndex = 0;
					// 
				}
					
			}

			function getByIndex(arr,index){
				if( index >= arr.length ){
					return arr[0];
				}else if( index < 0 ){
					return arr[ arr.length-1 ];
				}else{
					return arr[index];
				}
			}

			// --------- run -------------
			wordAnimator();
			if(theme == 'clip') cliping();

			$scope.$on('$destroy',function(){
				// clear timeouts
				clearTimeout(wordAnimatorTimeout);
			})
		}
	}
})