app.controller('demoNotifyCtrl',['$scope','$uaNotify',
	function($scope,$uaNotify){
	var ctrl = this;
	
	this.error = function(){
		$uaNotify.error('this is some error message');
	}

	this.warn = function(){
		$uaNotify.warn('this is some error message');
	}

	this.info = function(){
		$uaNotify.info('this is some error message');
	}

	this.success = function(){
		$uaNotify.success('this is some error message');
	}

}])