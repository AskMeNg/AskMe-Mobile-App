<!DOCTYPE html>
<html ng-app='GetCentre'>
<head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GetCentre :: Landing</title>
    <link rel="stylesheet" href="css/index.css" type="text/css" />
    <script src="app/bower_components/jquery/dist/jquery.js"></script>
    
    <script type="text/javascript" src="script/moment.js"></script>
    
    <!-- Optional: Incorporate the Bootstrap JavaScript plugins -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
       
</head>

<body>
	<script src="script/getcentreFBapp.js"></script>
	<div class="container">
    	<div class="row">
            <div class="col-sm-18" style="min-height:20px !important; text-align:center; font-weight:100; font-size:36px; margin-top:100px">
                Welcome To GetCentre
            </div>
            <div class="col-sm-18" style="min-height:20px !important; text-align:center;">
                What Can We Get for you?
            </div>
            <div class="col-sm-18" style="min-height:220px !important; margin-top:40px; text-align:center;">
                <div class="col-xs-3 col-xs-offset-3">
                	<div class="col-xs-18">
                    	<img src="images/l_flight.png" class="img-responsive" height="154" width="154"/>
                    </div>
                    <div class="col-xs-18 landing-label" >Get Flights</div>
                </div>
                <div class="col-xs-3">
                	<div class="col-xs-18">
                    	<img src="images/l_hotel.png" class="img-responsive" height="154" width="154"/>
                    </div>
                    <div class="col-xs-18 landing-label" >Get Hotels</div>
                </div>
                <div class="col-xs-3">
                	<div class="col-xs-18">
                    	<img src="images/l_tour.png" class="img-responsive" height="154" width="154"/>
                    </div>
                    <div class="col-xs-18 landing-label" >Get Tours</div>
                </div>
                <div class="col-xs-3">
                	<div class="col-xs-18">
                    	<img src="images/l_visa.png" class="img-responsive" height="154" width="155"/>
                    </div>
                    <div class="col-xs-18 landing-label" >Get Visas</div>
                </div>
            </div>
            <div class="col-sm-18" style="min-height:80px !important; text-align:center;">
                <div class="col-sm-4 col-sm-offset-4">
                    <div class="landing-border">
                    	
                        <div class="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>                   
                    </div>
                </div>
                <div class="col-sm-2" style="margin-top:1em; font-weight:700; min-height:20px !important">OR</div>
                <div class="col-sm-4">
                    <div class="landing-border">Get an Account</div>
                </div>
            </div>
            <div class="col-sm-18" style="min-height:60px !important; text-align:center;">
                Already Registered? <span>Sign</span> in Now
            </div>
        </div>
    </div>
    <div class="container footer">
    	<div class="container">
        	<div class="row foot">
            	<div class="col-sm-4 col-sm-offset-3">
                    <div class="col-xs-9 landing-menu">
                        About
                    </div>
                    <div class="col-xs-9 landing-menu">
                        Privacy
                    </div>
                </div>
                <div class="col-sm-4 ">
                    <div class="col-xs-9 landing-menu">
                        Terms
                    </div>
                    <div class="col-xs-9 landing-menu">
                        Partners
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="col-xs-9 landing-menu">
                        Cookies
                    </div>
                    <div class="col-xs-9 landing-menu">
                        Contact
                    </div>
                </div>
        	</div>
        </div>
    </div>
</body>
</html>