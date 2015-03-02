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