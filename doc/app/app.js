'use strict';

var app = angular.module('ua-doc',['ngRoute','ngAnimate','ngUiAwesome']);

app.run([function(){
	document.getElementsByTagName('html')[0].classList.remove('no-js');
}]);

app.config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/',{
			templateUrl:'app/partials/home.html',
			// controller:'homeCtrl',
			// controllerAs:'homeCtrl',
			title:'a collection of awesome ui components',
		}
	).when('/component/:component',{
			templateUrl:'app/partials/component.html',
			controller:'componentCtrl',
			controllerAs:'comCtrl',
			title:'',
		}
	).when('/404',{
		templateUrl:'app/partials/404.html',
		title:'404 page not found'
	})
	.otherwise({
		redirectTo:'/404',
	})
	
});

