var bread=[
			   { descript: 'first', text: 'Welcome to GetCentre::'},
			   { descript: 'Web site Tour ', text: ' Would you like a short Website Tour?'}
			  ];
var pageController = angular.module('pageController', []);
var breadController = angular.module('breadController', []);
pageController.controller('pageController', function(){
		this.page=1;
		this.setPage=function(selectedPage){
			this.page=selectedPage;
		}
		this.isSet=function(checkPage){
			return this.page===checkPage
		}
	})

breadController.controller('breadController', function(){
		this.info=bread;	
	})