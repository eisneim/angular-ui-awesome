ua.directive('uaLink',function(){
	return {
		restrict:'E',
		replace:true,
		transclude:true,
		template:function(elm,attr){
			// console.log(attr)
			var atribute = '';
			if(attr['hover']) atribute+= 'data-hover="'+ attr['hover'] +'"';

			return '<a class="ua-link"><span '+atribute+' ng-transclude></span></a>';
		},
		link:function($scope,elm,attr){

		}
	}
});