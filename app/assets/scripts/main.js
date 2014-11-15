'use strict';

angular.module('app',
		['ngResource','ui.router'])
		.config(function($locationProvider,$stateProvider,$urlRouterProvider){

			$urlRouterProvider
					.otherwise('/');

			$stateProvider
					.state('home',{
						url: '/home',
						templateUrl: 'scripts/core/home/home.tpl.html',
						controller: 'app.core.homeCtrl'
					});
		});
