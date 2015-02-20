app.controller('componentCtrl',['$scope','$routeParams','COMDATA','$location',
	function($scope,$routeParams,COMDATA,$location){
	var ctrl = this;
	if(!$routeParams.component) return $location.path('/404');

	this.component = $routeParams.component;
	
	COMDATA.forEach(function(com,index){
		if(com.name == ctrl.component )  ctrl.compData = COMDATA[ index ];
	});
	// console.log(this.)
	if(!this.compData) return $location.path('/404');

	// change page title
	document.title = this.component + ' - angular-ui-awesome';
	


}])