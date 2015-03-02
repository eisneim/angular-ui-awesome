app.directive('coding',function(){
	return {
		restrict:'E',
		replace: true,
		compile:function(tElm,attr){
			window.test = tElm[0];
			var text = tElm[0].innerHTML.trim().replace(/\&lt;/g,'<').replace(/\&gt;/g,'>');
			var codeTextNode = document.createTextNode( text );

			var lan = '';
			if(attr.lan && attr.lan.length>0) lan='class="language-'+ attr.lan+'"';

			var tpl = '<pre><code '+lan+'></code></pre>';
			tElm.html(tpl);
			var codeElm = tElm.find('code');

			codeElm[0].appendChild(codeTextNode);
			return function($scope,elm,attr){
				Prism.highlightElement( codeElm[0],false,function(){});
			}
		}
	}
});
app.directive('highlight',function(){
	return function(){
		Prism.highlightAll(false,function(){});
	}
})

app.directive('uaDemoLoaders',['$uaLoader',function($uaLoader){
	return function($scope,elm,attrs){
		var circleContainer = document.getElementById('ua-loader-stroke');
		var circleLoader = $uaLoader({container: circleContainer});
	}
}])