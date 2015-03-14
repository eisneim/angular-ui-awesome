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

	return {
		dom:dom,
	}

}])