app.directive('uaDemoLoaders',['$uaLoader',function($uaLoader){
	return function($scope,elm,attrs){
		var circleContainer = document.getElementById('ua-loader-stroke');
		var circleLoader = $uaLoader({container: circleContainer});
	}
}])