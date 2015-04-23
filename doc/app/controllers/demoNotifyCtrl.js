app.controller('demoNotifyCtrl',['$scope','$uaNotify',
	function($scope,$uaNotify){
	var ctrl = this;
	
	this.error = function(msg){
		$uaNotify.error(msg||'this is some error message');
	}

	this.warn = function(msg){
		$uaNotify.warn('this is some error message');
	}

	this.info = function(msg){
		$uaNotify.info('this is some error message');
	}

	this.success = function(msg){
		$uaNotify.success('this is some error message');
	}

}])