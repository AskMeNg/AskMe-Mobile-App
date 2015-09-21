// JavaScript Document

var review =  angular.module('review', []);
review.controller('review', ['$scope','reviewUploadRQ', 'searchData','serviceFetchRQ','fetchPRQ','postRQ', 'create_serviceRQ', function($scope, reviewUploadRQ, searchData, serviceFetchRQ,fetchPRQ,postRQ, create_serviceRQ) {
	$scope.Sdata=searchData.data();
	$scope.reviewForm={};
	$scope.formreveal='a';
	$scope.post=[]; //stores current post
	$scope.recentR=[]; // stores recent reveiws
	$scope.action='st';
	$scope.Categories=[];
	//$scope.Sdata[0].service_id=0;
	$scope.reviewForm.State='Lagos';
	$scope.reviewForm.Local_government='Ikeja';
	$scope.stateList=[{name:'Lagos', value:'Lagos'},{name:'Ogun', value:'Ogun'},{name:'Oyo', value:'oyo'},{name:'Anambra', value:'anambra'},{name:'Abuja', value:'Abuja'},{name:'Kaduna', value:'Kaduna'},{name:'Imo', value:'Imo'},{name:'Kwara', value:'Kwara'}];
	$scope.localList=[{name:'Ikeja', value:'Ikeja'},{name:'Surulere', value:'Surulere'},{name:'Mushin', value:'Mushin'},{name:'Yaba', value:'Yaba'}];
	$scope.Industry=[{name:'Fast Food', value:'Fast Food'},{name:'Restaurant and Bars', value:'Restaurant and Bars'},{name:'Tourism and Travels', value:'Tourism and Travels'},{name:'Hotels', value:'Hotels'}];
	$scope.sendReview=function(id){
		$scope.sendRp= reviewUploadRQ.get({review:$scope.reviewForm, userId:id}, function(response){
			console.log(response)
		})
	}
	jQuery("#service_finder").autocomplete({
		source: 'server/service_autocomplete.php',
		minLength: 3,
		select: function(event, ui) {
			var url = ui.item.id; var pla=ui.item.value; var lab=ui.item.label
			$scope.formreveal=0;
			$scope.Sdata[0].service_id=url;  //set the search term
			//$scope.$apply();
			console.log(ui)
			if(url > 0) {
				$scope.formreveal=url;
				$scope.Categories=[];
				$scope.action='st';
				$scope.Sdata[0].service_desc=lab;  //setting the destination description from global search data in app.js
				$scope.Sdata[0].service_name=ui.item.n;  //setting the name of the service
				$scope.Sdata[0].service_ind=ui.item.i;  //setting the name of the indutry
				$scope.Sdata[0].service_address=ui.item.a;  //setting the destination description from global search data in app.js
				$scope.Sdata[0].service_localg=ui.item.a2;  //setting the destination description from global search data in app.js
				$scope.Sdata[0].service_state=ui.item.a3;  //setting the destination description from global search data in app.js
				$scope.reviewForm.Name=pla;
				$scope.$apply();
				$scope.get_servicetypes();
			}
			else{
				$scope.Categories=[];
				$scope.action='s';
				$scope.$apply();
			}
		},
	
		html: true, // optional (jquery.ui.autocomplete.html.js required)
	
	  // optional (if other layers overlap autocomplete list)
		open: function(event, ui) {
			jQuery(".ui-autocomplete").css("z-index", 1000);
		}
		
	});
	$scope.get_servicetypes=function(){
		console.log('here');
		$scope.fetchST= serviceFetchRQ.query({service_no:$scope.Sdata[0].service_id}, function(res){
			$scope.Categories=res;
			console.log($scope.Categories)
		})	
	}
	$scope.get_post=function(pnum, ptype, ind){
		$scope.fetchP= fetchPRQ.query({parent_no:pnum, p_type:ptype}, function(res){
			//console.log(res);
			$scope.post.push([]);
			for($i=0; $i<res.length; $i++){
				var total_rate=0;
				var t_rater=0;
				$scope.Categories[ind].post=[];
				for(property in res){//loop through the room_avail to get all room occupancies for this room
				  if(res.hasOwnProperty(property)){
					  var properti=res[property];
					  var ptype=properti.p_ctype;
					  if(ptype=='.c.'){ 
						$scope.Categories[ind].post.push([properti]);
						console.log($scope.Categories)
					  }
					  if(ptype=='.r.'){
						  total_rate+=parseInt(properti.p_cont);
						  t_rater++;
						}
					}
				}
			}
			$scope.Categories[ind].rate=parseInt(total_rate/t_rater);
			$scope.Categories[ind].t_rate=t_rater;
			var rev={}
			rev.newp='N';
			rev.parent=pnum;
			rev.ptype=ptype;
			$scope.post[ind]=rev;
			newr=['N', pnum, ptype]; 
			$scope.Categories[ind].newrr=newr;
		})	
	}
	$scope.postReview=function(user, type){
		//console.log(user)
		if(type=='st'){
			var post=$scope.post;
			var s_no=$scope.formreveal;
			$scope.postRQ= postRQ.get({user:user, post:JSON.stringify(post), type:type, serv_no:s_no}, function(res){
				console.log(res);		
			})	
		}
		else{
			var serv=$scope.reviewForm;
			$scope.create_serviceRQ= create_serviceRQ.get({user:user, post:JSON.stringify(serv), type:type}, function(res){
				console.log(res);		
			})	
		}
	}
	
}]);
