ua.directive('uaButton',function(){
	function linkFunc($scoe,elm,attr){
		var rippleElm = document.createElement('span');
		rippleElm.className = 'uac-button-ripple';

		var rect = elm[0].getBoundingClientRect();

		rippleElm.style.height = rippleElm.style.width = Math.max(rect.width, rect.height) + 'px';
		
		elm[0].appendChild(rippleElm);

		function clickHandel(e){
			rippleElm.classList.remove('uac-animate');

			var top = e.pageY - rect.top - rippleElm.offsetHeight / 2  - document.body.scrollTop;
			var left = e.pageX - rect.left - rippleElm.offsetWidth / 2  - document.body.scrollLeft;
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

			var innerNodes = stringToNode( 
				tpl.replace('__replaceme__',inner ).replace('__attr__',attributes) 
			);
			// console.log( innerNodes )

			forEach(innerNodes,function(node,index){
				tElm[0].parentNode.insertBefore(node, tElm[0].nextSibling );
			});
			tElm[0].remove();
			return linkFunc;
		}
	}
});
