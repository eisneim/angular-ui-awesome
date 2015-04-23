app.controller('demoNotifyCtrl',['$scope','$uaNotify',
	function($scope,$uaNotify){
	var ctrl = this;
	this.notify = {
		msg: 'you can add message and title, and even select type',
	}

	this.options = {
		life: 4000,
		type:'full',
	};
	
	this.showNotify = function(type ) {
		$uaNotify.create( ctrl.options )[type]( ctrl.notify.msg, ctrl.notify.title );
	}


}])