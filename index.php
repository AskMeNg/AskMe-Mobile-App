<!DOCTYPE html>
<html ng-app='AskMe'>
<head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AskMe :: Home</title>
    <link rel="stylesheet" href="css/index.css" type="text/css" />
    <link rel="stylesheet" href="css/icon.css" type="text/css" />
    <link type="text/css"  rel="stylesheet" href="css/autocomplete.css">
	<link type="text/css"  rel="stylesheet" href="app/bower_components/getcentre/jquery-ui.css">
    <!--<link rel="stylesheet" href="css/jquery.jscrollpane.css" type="text/css" />-->
    <script src="app/bower_components/jquery/dist/jquery.js"></script>
    <script src="app/bower_components/getcentre/jquery-ui.js"></script>
    <script src="app/bower_components/jquery.ui.autocomplete.html.js"></script>   
    <script src="app/bower_components/angular/angular.js"></script>
    <!--sanitises html-->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-sanitize.js"></script>
    <!--required module to enable animation support in AngularJS -->
    <script src="app/bower_components/angular-animate/angular-animate.js"></script>
    <script src="app/bower_components/angular-route/angular-route.js"></script>
    <script src="app/bower_components/angular-resource/angular-resource.js"></script>
     <script src="app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <!--<script src="app/bower_components/angular-ui/build/angular-ui.min.js"></script>-->
    <script src="app/bower_components/angular-filter/dist/angular-filter.min.js"></script>
    <script src="app/bower_components/angular-facebook-utils/src/facebookUtils.min.js"></script>
    <script src="app/bower_components/angular-directive.g-signin/google-plus-signin.js"></script>
    <script src="script/app.js"></script>
    <script src="script/profile.js"></script>
    <script src="script/review.js"></script>
    <script src="script/services.js"></script>
    <script src="script/jquery.jscrollpane.min.js"></script>
    <script type="text/javascript" src="script/moment.js"></script>
   
</head>

<body>
	<div class="web_back"  ng-controller="AskMe">
    	<div class="container">
            <div class="col-xs-18 top_container">
                <!--<div class="col-lg-3 col-md-2 col-sm-6 col-xs-18 navbar-header logo nopadding">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navmenus">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="navbar-brand nopadding"><img src="images/logo_color.png" width="155" height="80"/></div>
                </div>-->
                <div class="col-lg-18 nopadding nopadding menu_signin collapse navbar-collapse"  id="navmenus">
                   	 <ul class="nav col-md-18 navbar-nav nopadding" >
                        <li ng-class="{ active:page.isSet(5)}" ng-controller="AskMe">
                        	<div class="col-md-18 nopadding"  ng-switch on="getUdata[0].status">
                                <a ng-click="page.setPage(5)" ng-switch-when="Register">
                                   <div class="account">Account</div>
                                   <div class="user-add" ng-click="openRegister()"> <span class="icon-user-plus"></span></div>
                                </a>
                                <a ng-click="page.setPage(5)" ng-switch-when="Logged_in" href="#/profile">
                                   <div class="account">{{getUdata[1].fname| limitTo:10}}</div>
                                   <div class="user-add" ng-click="openRegister()"> <span class="icon-user-plus"></span></div>
                                </a>
                             </div>
                        </li>
                        <li ng-class="{ active:page.isSet(4)}"><a ng-click="page.setPage(4)" href="#/tours">Contact</a></li>
                        <li ng-class="{ active:page.isSet(2)}"><a ng-click="page.setPage(2)" href="#/review">Review</a></li>
                        <li ng-class="{ active:page.isSet(1)}"><a ng-click="page.setPage(1)" href="#/home"><i class=""></i>Home</a></li>
                     </ul>
                </div>
            </div>
            <div class="viewanimate" ng-view></div>
        </div>
    </div>
</body>
           
</html>