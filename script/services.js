var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('loginUserRs', ['$resource',
  function($resource){
    return $resource('server/login.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);

  appServices.factory('registerUser', ['$resource',
  function($resource){
    return $resource('server/register_user.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('reviewUploadRQ', ['$resource',
  function($resource){
    return $resource('server/review_upload.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  
  appServices.factory('serviceFetchRQ', ['$resource',
  function($resource){
    return $resource('server/fetchSRQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('fetchPRQ', ['$resource',
  function($resource){
    return $resource('server/fetchPRQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('postRQ', ['$resource',
  function($resource){
    return $resource('server/post.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('fetchURQ', ['$resource',
  function($resource){
    return $resource('server/fetchURQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('create_serviceRQ', ['$resource',
  function($resource){
    return $resource('server/create_service.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('fetchServRQ', ['$resource',
  function($resource){
    return $resource('server/fetchServiceRQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('profileRQ', ['$resource',
  function($resource){
    return $resource('server/profileRQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('fetchUserPRQ', ['$resource',
  function($resource){
    return $resource('server/fetchUserPRQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
   appServices.factory('fetchUserRRQ', ['$resource',
  function($resource){
    return $resource('server/fetchURRQ.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  appServices.factory('updatePassRQ', ['$resource',
  function($resource){
    return $resource('server/updatePass.php', {}, {
      query: {method:'GET', 
				params:{
				},
				isArray:true
			}
    });
  }]);
  