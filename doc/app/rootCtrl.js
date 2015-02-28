app.controller('rootCtrl',['$scope',function($scope){
	var rootCtrl = this;

	$scope.$root.$on('$routeChangeSuccess',function(e,current){
		// change page title
		if( current.$$route && current.$$route.title) 
			document.title = current.$$route.title + ' - Angular-UI-Awesome';
	})

}]);

app.controller('navCtrl',['$scope',function($scope){
	var navCtrl = this;

	this.components = [
		'toggle',
		'loader',
		'dropdown',
		'date-picker',
		'dialog',
		'button',
		'link',
		'slider',
		'inputBox',
		'checkbox',
		'radioButton',
		'pageTransition',
		
	];

	this.services = [
		'$uaDialog',
		'$uaSideOverlay',
	];

}]);