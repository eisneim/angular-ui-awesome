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