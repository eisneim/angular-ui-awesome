app.controller('rootCtrl',['$scope','$q',function($scope,$q){
	var rootCtrl = this;

	var $viewContainer = null,isAnimating = true,isRouteSuccess = false;
	$scope.$root.$on('$routeChangeStart',function(e,current,prev){
		// do route change animation:
		if(!$viewContainer) $viewContainer = document.getElementById('ua-doc-main');
		$viewContainer.classList.add('hidding');
		
		// create our promise
		var defered = $q.defer();
		if(!current.resolve) current.resolve = {};
		current.resolve.aniDelay = function(){
			return defered.promise;	
		};

		setTimeout(function(){
			isAnimating = false;
			defered.resolve('done');
			checkRouteAnimation();
		},300);

		return defered.promise;
	})

	$scope.$root.$on('$routeChangeSuccess',function(e,current){
		// change page title
		if( current.$$route && current.$$route.title) 
			document.title = current.$$route.title + ' - Angular-UI-Awesome';
		
		isRouteSuccess = true;
		checkRouteAnimation();
	});

	function checkRouteAnimation(){
		if(!isAnimating && isRouteSuccess ){
			// finish route change animation
			$viewContainer.classList.remove('hidding');
			// reset 
			isRouteSuccess = false;
			isAnimating = true;
		}
	}

}]);

app.controller('navCtrl',['$scope','$location',function($scope,$location){
	var navCtrl = this;
	this.ui = {};

	this.components = [
		'words',
		'toggle',
		'link',
		'loader',
		'button',
		'inputBox',
		'dropdown',
		'date-picker',
		'dialog',
		'slider',
		'checkbox',
		'radioButton',
		'pageTransition',
		
	];

	this.services = [
		'$uaDialog',
		'$uaSideOverlay',
	];

	$scope.$root.$on('$routeChangeSuccess',function(e,route){
		if(route.params.component ){
			navCtrl.ui.selectedComp = route.params.component;
		}
	});

	// this.ui.switchComp = function(comp){
		
	// }

}]);