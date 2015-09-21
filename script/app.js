// JavaScript Document
(function(){
	
	var app= angular.module('AskMe',['ngRoute', 'facebookUtils','directive.g+signin',//'ngSanitize', 
	'appServices','ui.bootstrap','review','profile']).constant('facebookConfigSettings', {
		'appID' : '1480965748889934', 'permissions': "public_profile, email",
		
	  });
	  
	app.directive('a', function () {
    return {
			restrict: 'E',
			link: function (scope, elem, attrs) {
				if ( attrs.href == '' || attrs.href == '#') {
					elem.on('click', function (e) {
						e.preventDefault();
						return;
					});
				}
			}
		};
	}) 
	
	app.filter('custNo', function () {
		return function (input) {
			var n = input;
			if(n < 10){ if(n < 0){n=0; n='0' + n;}  else{ n='0' + n}}
			
			return n;
		}
	});

	app.filter('time_am_pm', function () {
		return function (input) {
			var n =moment(input,'hh:mm').format('hh:mm a');
			return n;
		}
	});
	app.filter('posttime', function () {
		return function (input) {
			var n =moment.unix(input).fromNow();
			//var p = 
			return n;
		}
	});	
	app.filter('hdate', function () {
		return function (input) {
			text={ 4: "-",    6: "-"}
			String.prototype.insertTextAtIndices = function(text) {
				return this.replace(/./g, function(char, index) {
					return text[index] ? text[index] + char : char;
				});
			};			
			input= input.insertTextAtIndices(text);
			var n =moment(input).format('ddd. DD MMM');
			return n;
		}
	});
	app.filter('htime', function () {
		return function (input) {
			input=input.substring(0, 2) + ":" + input.substring(2);
			return input+"pm";
		}
	});
	app.filter('hrtomin', function () {
		return function (minu) {
			var hours = Math.floor( minu / 60);          
			var minutes = minu% 60;
			return(hours+'hrs '+minutes+'mins')
		}
	})
	
	app.filter('shortdate', function () {
		return function (date) {
			var n=moment(date).format('ddd. DD MMM');
			return(n)
		}
	})
	app.filter('lastlegDate', function () {
		return function (legobj) {
			$total_channel=-1 
			for (property in legobj){if(legobj.hasOwnProperty(property)){$total_channel++;}}
			$arr_leg='leg'+$total_channel;//getting the last leg of this trip
			$arr_date=legobj[$arr_leg]['@desDate'];//getting the destination date of the last leg
			$arr_date=moment($arr_date).format('ddd. DD MMM');//format the date to a better readable format	
			return($arr_date)
		}
	})
	app.filter('lastlegTime', function () {
		return function (legobj) {
			$total_channel=-1 
			for (property in legobj){if(legobj.hasOwnProperty(property)){$total_channel++;}}
			$arr_leg='leg'+$total_channel;//getting the last leg of this trip
			$arr_date=legobj[$arr_leg]['@desDate'];//getting the destination date of the last leg
			$arr_time=legobj[$arr_leg]['@desTime'];//getting the destination date of the last leg
			$arr_time=moment($arr_date+' '+$arr_time).format('hh:mm a');
			return($arr_time)
		}
	})
	app.filter('stopover', function () {
		return function (legobj) {
			$total_channel=-1;
			for (property in legobj){if(legobj.hasOwnProperty(property)){$total_channel++;}}
			return($total_channel)
		}
	})
	app.filter('lower_price', function () {
		return function (price) {
			try{return price[0].HotelRoom.Price.Amount; $scope.room_opt=price.length}
			catch(e){return price.HotelRoom.Price.Amount}
		}
	})
	app.filter('first_b', function () {
		return function (board) {
			try{return board[0].HotelRoom.Board.$;}
			catch(e){return board.HotelRoom.Board.$;}
		}
	})
	app.filter('first_r', function () {
		return function (rtype) {
			try{return rtype[0].HotelRoom.RoomType.$;}
			catch(e){return rtype.HotelRoom.RoomType.$;}
		}
	})
	app.filter('first_c', function () {
		return function (category) {
			try{return category[0].Name;}
			catch(e){return category.Name;}
		}
	})
	app.filter('peradult', function () {
		return function (price) {
			if(Array.isArray(price)){
				if(Array.isArray(price[0].PriceList.Price)){return price[0].PriceList.Price[0].Amount;}
				else{return  price[0].PriceList.Price.Amount}
			}
			else{
				if(Array.isArray(price.PriceList.Price)){
					return price.PriceList.Price[0].Amount;
				}
				else{return price.PriceList.Price.Amount}
			}
			
		}
	})
	app.filter('first_d',  function (hdateFilter) {
		return function (dates) {
			if(Array.isArray(dates)){
				if(Array.isArray(dates[0].OperationDateList.OperationDate)){return hdateFilter(dates[0].OperationDateList.OperationDate[0]['@date']);}
				else{return  hdateFilter(dates[0].OperationDateList.OperationDate['@date'])}
			}
			else{
				if(Array.isArray(dates.OperationDateList.OperationDate)){
					return hdateFilter(dates.OperationDateList.OperationDate[0]['@date']);
				}
				else{return hdateFilter(dates.OperationDateList.OperationDate['@date'])}
			}
		}
	})
	app.filter('hotel_room', function () {
		return function (room) {
			room_opt=room.length
			if(room_opt>1){return room_opt}
			else{ return 1;}
		}
	})
	app.filter('imglarge', function () {
		return function (imgs) {
			try{newimg=imgs.replace("/small", "");}
			catch(e){newimg=imgs}
			return newimg
		}
	})
	app.filter('hotel_r', function () {
		return function (room) {
			room_opt=room.length
			if(room_opt>1){return 'Room Options'}
			else{ return  'Room Option';}
		}
	})
	app.filter('pernight', function () {
		return function (price, tnights) {
			if(price instanceof Array){ 
				console.log('an array')
				if(typeof price[0].HotelRoom.Price.PriceList =='undefined'){return parseFloat(parseFloat(price[0].HotelRoom.Price.Amount)/tnights).toFixed(2); console.log('here')}
				else if(price[0].HotelRoom.Price.PriceList.Price instanceof Array){return price[0].HotelRoom.Price.PriceList.Price[0].Amount;}
				else if(price[0].HotelRoom.Price.PriceList.Price.Amount)return price[0].HotelRoom.Price.PriceList.Price.Amount;				
				
			}
			else {
				console.log('not array')
				if(typeof price.HotelRoom.Price.PriceList !='undefined'){
					if( price.HotelRoom.Price.PriceList.Price instanceof Array){return price.HotelRoom.Price.PriceList.Price[0].Amount;}
					else {return price.HotelRoom.Price.PriceList.Price.Amount;}
				}				
				else{return price.HotelRoom.Price.Amount}
			}
		}
	})
	app.filter('hotel_room_policy', function (htimeFilter, hdateFilter) {
		return function (cancelation) {
			if(Array.isArray(cancelation.CancellationPolicy)){
				policy=''
				for($i=0; $i<cancelation.CancellationPolicy.length; $i++){
					
					policy= '<div class="col-md-18">Cancellation after '+htimeFilter(cancelation.CancellationPolicy[$i]['@time'])+' '+hdateFilter(cancelation.CancellationPolicy[$i]['@dateFrom'])+' will Cost '+cancelation.CancellationPolicy[$i]['@amount']+"</div>" + policy; 
				}
				return policy;
			}
			else{ return  '<div> Cancellation after '+htimeFilter(cancelation.CancellationPolicy['@time'])+' '+hdateFilter(cancelation.CancellationPolicy['@dateFrom'])+' will Cost '+cancelation.CancellationPolicy['@amount']+'</div>';}
		}
	})
	app.filter('tour_cancel_policy', function (htimeFilter, hdateFilter) {
		return function (cancelation) {
			if(Array.isArray(cancelation)){
				policy=''
				for($i=0; $i<cancelation.length; $i++){
					
					policy= '<div class="col-md-18">Cancellation from '+hdateFilter(cancelation[$i].Price.DateTimeFrom['@date'])+' to '+hdateFilter(cancelation[$i].Price.DateTimeTo['@date'])+' will Cost '+cancelation[$i].Price.Amount+"</div>" + policy; 
				}
				return policy;
			}
			else{ return  '<div class="col-md-18">Cancellation from '+hdateFilter(cancelation.Price.DateTimeFrom['@date'])+' to '+hdateFilter(cancelation.Price.DateTimeTo['@date'])+' will Cost '+cancelation.Price.Amount+"</div>";}
		}
	})
	
	app.service('searchData', function(){
		var savedData =  [	 {service_term:'', service_loc:'', service_id:'', service_desc:''}	]
		return{
			 data:function() {   return savedData;	 },
			 setData:function(dataName, dataValue) { savedData.push({valueName:dataName, valueData:dataValue});	 }
		}
	})

	app.service('userData', function(){
		var userData =  [{
				status:'Register'
			}]
		return{
			 data:function() {
			   return userData;
			 },
			 setData:function(data) {		
				userData.splice(1, 1, data);
			 },
			 addData:function(data, index){
				userData[index].push(data);
			 }
		}
	})
	app.config(['$routeProvider',
	  function($routeProvider) {
		$routeProvider.
		  when('/home', {
			templateUrl: 'partials/home.php'//,
			//controller: 'AskMe'
		  }).
		  when('/review', {
			templateUrl: 'partials/review.php',
			controller: 'review'
		  }).
		  when('/profile', {
			templateUrl: 'partials/profile.php',
			controller: 'profile'
		  }).
		  otherwise({
			redirectTo: '/home'
		  });
	  }]);		
	  app.controller('AskMe', ['$scope', '$rootScope', 'userData', '$modal', '$log', 'searchData', '$location', 'facebookUser', 'fetchServRQ',  function ($scope, $rootScope, userData, $modal, $log, searchData, $location, facebookUser, fetchServRQ) {
		$scope.searchPara={searchType:'P', searchED:'N',  searchDesc:'',  searchEL:'N', searchLocation:''}
		jQuery("#product_finder").autocomplete({
		source: 'server/product_autocomplete.php',
		minLength: 3,
		select: function(event, ui) {
			var url = ui.item.id; var pla=ui.item.value; var lab=ui.item.label
			$scope.searchPara.searchTerm=url;
			$scope.searchPara.searchDesc=pla;
			$scope.searchPara.searchED='Y';
			$scope.searchPara.searchType=ui.item.type
			console.log($scope.searchPara)
			$scope.$apply();
		},
	
		html: true, // optional (jquery.ui.autocomplete.html.js required)
	
	  // optional (if other layers overlap autocomplete list)
		open: function(event, ui) {
			jQuery(".ui-autocomplete").css("z-index", 1000);
		}
		
	});
	jQuery("#place_finder").autocomplete({
		source: 'server/place_autocomplete.php',
		minLength: 3,
		select: function(event, ui) {
			var url = ui.item.id; var pla=ui.item.value; var lab=ui.item.label
			$scope.searchPara.searchLocation=pla;
			$scope.searchPara.searchEL='Y';
			//console.log($scope.searchPara)
			$scope.$apply();
		},
	
		html: true, // optional (jquery.ui.autocomplete.html.js required)
	
	  // optional (if other layers overlap autocomplete list)
		open: function(event, ui) {
			jQuery(".ui-autocomplete").css("z-index", 1000);
		}
		
	});
		$rootScope.$on('fbLoginSuccess', function(name, response) {
			console.log(response)
		  facebookUser.then(function(user) {
			user.api('/me').then(function(response) {
			  $rootScope.loggedInUser = response;
			  
			});
		  });
		});
		
		$rootScope.$on('fbLogoutSuccess', function() {
		  $scope.$apply(function() {
			$rootScope.loggedInUser = {};
		  });
		});
		checkCookie();	
		function checkCookie() {
			var lSsearch=getCookie("AskMeUser");
			if (lSsearch != "") {
				userData.setData(JSON.parse(lSsearch))
				$scope.getUdata=userData.data();
				$scope.getUdata[0].status="Logged_in";
			}
			else{
				$scope.getUdata=userData.data();
			}
		}
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			
			for(var i=0; i<ca.length; i++) {
				var c = ca[i].trim();
				   if (c.indexOf(name)==0) {return c.substring(name.length,c.length);}
			}
			return "";
		} 
		$scope.searchSer=function(){
			$scope.findServ= fetchServRQ.query({searchP:$scope.searchPara}, function(Sresult){
				$scope.searchResult=Sresult;
				console.log($scope.searchResult);
			})
		}
		$scope.openRegister = function () {	
			var modalInstance = $modal.open({
			  templateUrl: 'template/register_user.html',
			  controller: 'registerModalInstanceCtrl',
			  //size: 'xs',
			  windowClass: 'register-modal-window',
			  resolve: {
				account: function () {
				  return $scope.account;
				}
			  }
			})
			}
	
	}]);
   

app.controller('registerModalInstanceCtrl', ['$scope', 'userData', '$modalInstance', 'account',  'registerUser','loginUserRs', function ($scope, userData, $modalInstance, account, registerUser, loginUserRs) {
	//document.cookie = "AskMeUser" + "=" + '' + "; " + 0;
	$scope.reset = function() {
        $scope.user = angular.copy($scope.master);
		$scope.login = angular.copy($scope.master);
    };
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + JSON.stringify(cvalue) + "; " + expires;
	}
	$scope.account={action:'log_reg'};
    $scope.reset();
	$scope.login= function (login){
		$scope.loginD=loginUserRs.query({pass:login.password, email:login.email}, function(loginD){
			//loginD=JSON.parse(loginD);
			console.log(loginD)
			if(loginD[0].info!='error'){
				userData.setData(loginD[0]);
				//setCookie('AskMeUser',loginD[0], 30 )
				$scope.getUdata=userData.data();
				$scope.getUdata[0].status="Logged_in";
				$modalInstance.dismiss('cancel');
				console.log($scope.getUdata)
			}
			else{
				$scope.login_error=loginD[0].error_message
			}
			
		})
	}
    $scope.ok = function (user) {
    $scope.regUser = registerUser.get({title:user.title, fname:user.fname, lname:user.lname, email:user.email, pass:user.password, phone:user.phone, date_birth:user.dbirth, con_add:user.caddress, city:user.city, state:user.state, postal_c:user.pcode, country:user.country, national:user.nationality, agent:user.agent },	function(regUser) {
	if($scope.regUser[0]=='o'){
		userData.setData(user);
		setCookie('AskMeUser',user, 30)
		$scope.getUdata=userData.data();
		$scope.getUdata[0].status="Logged_in";
		console.log(userData.data())
		$modalInstance.dismiss('cancel');
	}
	
	})
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
app.directive('dateFrom', function() {
		return function ($scope, element, attrs) {
			//var doDate = $('#EndDate');
			element.datepicker({
				defaultDate: "+1w",
				dateFormat:'dd MM yy',
				minDate:0,
				changeMonth: true,
				numberOfMonths: 3,
				onClose: function( selectedDate ) {  
					var minDate = $(this).datepicker('getDate');
					if(minDate) {minDate.setDate(minDate.getDate() + 1)}
					$( "#todate" ).datepicker( "option", "minDate", minDate|| 1 );
					var dt=selectedDate.split(' ');
					$scope.f_day = dt[0];    $scope.f_month = dt[1];     $scope.f_year = dt[2];
					if($scope.curr_search.service!='Flights'){
						$scope.getData[1].hcheckin= moment(selectedDate).format('YYYYMMDD');
						$scope.getData[1].hcheckinL=moment(selectedDate).format('ddd Do, MMM, YYYY');
					}
					else
					{
						$scope.getData[0].fDepDate= moment(selectedDate).format('YYYYMMDD');
						$scope.getData[0].fDepDateLong=moment(selectedDate).format('ddd Do, MMM, YYYY');
					}
					$scope.d_checkin= moment(selectedDate).format('YYYY-MM-DD');//to calculate number of days
					$num=$scope.get_days();
					$scope.getData[0].fTravelDays=$num;
					$scope.t_num_days=$num;
					$scope.$apply();
					$('#todate').focus()
				}
			});
		}
	})

app.directive('dateTo', function() {
	return function ($scope, element, attrs) {
		element.datepicker({
			dateFormat:'dd MM yy',
			changeMonth: true,
			changeYear: true,
			numberOfMonths: 3,
			onClose: function( selectedDate ) {
				$("#fromdate").datepicker( "option", "maxDate", selectedDate );
				var dt=selectedDate.split(' ');
				$scope.t_day = dt[0]; $scope.t_month = dt[1]; $scope.t_year = dt[2];
				if($scope.curr_search.service!='Flights'){
					$scope.getData[1].hcheckout= moment(selectedDate).format('YYYYMMDD');
					$scope.getData[1].hcheckoutL=moment(selectedDate).format('ddd Do, MMM, YYYY');
				}
				else{
					$scope.getData[0].fDesDate= moment(selectedDate).format('YYYYMMDD');
					$scope.getData[0].fDesDateLong=moment(selectedDate).format('ddd Do, MMM, YYYY');
				}
				$scope.d_checkout= moment(selectedDate).format('YYYY-MM-DD'); //to calculate number of days
				$num=$scope.get_days();
				$scope.getData[0].fTravelDays=$num;
				$scope.t_num_days=$num;
				$scope.$apply();
				

				
			}			
      	});
	}
})

app.directive('revealer', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
               // element.parent().children().removeClass('clicked');
                element.siblings(".hideme").toggleClass("showme");
				element.children(".minus_ic").toggleClass("showme");
				element.children(".plus_ic").toggleClass("hideme");
            })
        },
    }
});

app.directive("userDetails", ['fetchURQ', function(fetchURQ) {
  return {
    template: "<span>{{fullname}}</span>",
    scope: {
      userId: "="
    },
    link: function(scope) {
      getUser=fetchURQ.query({userNo:scope.userId}, function(res){
			scope.fullname=res[0].fname+' '+res[0].lname;
		})
	  }
  }
}]);

})
(window.angular);