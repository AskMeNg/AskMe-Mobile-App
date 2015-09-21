<div class="col-xs-18 search-tool" ng-controller="AskMe">
    <div class="col-xs-18" >
        <input type="text" class="form-control input-sm get_input" id="product_finder" ng-model="searchPara.searchDesc" placeholder="Business Name OR Product">
    </div>
    <div class="col-xs-18">IN</div>
    <div class="col-xs-18">
        <input type="text" class="form-control input-sm get_input" id="place_finder" ng-model="$scope.searchPara.searchLocation" placeholder="Area">
    </div>
    <button class="col-xs-18 btn-sm btn get_button_primary" ng-click="searchSer()" style="margin:15px 0 0">Search</button>
    <div class="col-xs-18" ng-if="searchResult.length>0">
    	<div class="col-xs-18" ng-repeat="serv in searchResult">
        	<br />
            <div class="col-xs-18">{{serv.se_name}}({{serv.se_ind}})</div>
            <div class="col-xs-18">{{serv.se_product}}</div>
            <div class="col-xs-18">{{serv.se_street}} {{serv.se_localg}} {{serv.se_state}}</div>
            <div class="col-xs-18">Rated {{serv.se_rate | number:1}} from {{serv.se_totalR}} Reviews</div>
        </div>
    </div>
    <div class="col-xs-18" ng-if="searchResult.length==0">No result found Please try again...</div>
</div>
