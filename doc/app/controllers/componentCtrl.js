app.controller('componentCtrl',['$scope','$routeParams','COMDATA',function($scope,$routeParams,COMDATA){
	var ctrl = this;
	this.component = $routeParams.component;

	// change page title
	document.title = this.component + ' - angular-ui-awesome';
	
	console.log(COMDATA);


}])