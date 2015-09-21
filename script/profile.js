// JavaScript Document
var profile =  angular.module('profile', []);
profile.controller('profile', ['$scope','profileRQ', 'searchData','userData','fetchUserPRQ', 'fetchUserRRQ','updatePassRQ', function($scope, profileRQ, searchData,userData,fetchUserPRQ, fetchUserRRQ, updatePassRQ) {
	$scope.userD=userData.data();
	$scope.data=searchData.data();
	
	$scope.get_review=function(pnum, dex){
		$scope.fetchP= fetchUserRRQ.query({service_no:pnum, author:$scope.userD[1].userId}, function(res){
			console.log(res);	$scope.Business[dex]=res;	console.log($scope.Business);	})
	}
	$scope.getNumber = function(num){	return new Array(parseInt(num));   }	
	$scope.get_post=function(pnum){
		$scope.fetchP= fetchUserPRQ.query({author_no:pnum}, function(res){
			$scope.reviews=res
			$scope.totalReview=$scope.reviews.length;
			$scope.Business=[];
			while( $scope.Business.push([]) < $scope.totalReview);
		})	
	}
	$scope.updatePass=function(pass){
		$scope.editP='Y';
		console.log(pass);
				$scope.postRQ= updatePassRQ.get({npass:pass.oldnr, email:$scope.userD[0].email}, function(res){
				console.log(res);
			})	
		
	}
}]);
