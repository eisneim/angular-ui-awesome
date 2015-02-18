app.controller('rootCtrl',['$scope',function($scope){
	var rootCtrl = this;

}]);

app.controller('navCtrl',['$scope',function($scope){
	var navCtrl = this;

	this.components = [
		'toggle',
		'loader',
		'dropdown',
		'button',
		'link',
		'slider',
		'date-picker',
	];

	this.services = [
		'$uaDialog',
		'$uaSideOverlay',
	];

}]);