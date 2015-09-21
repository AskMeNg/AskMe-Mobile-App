<html>
	<script src="app/bower_components/jquery/dist/jquery.js"></script>
	<script src="script/sha512.js">	</script>
    <script> 
    	$(document).ready(function() {
			var ref= Math.floor(Math.random()*10000000);
			var payhash= ref+document.getElementById('p_id').value+document.getElementById('pay_id').value+document.getElementById('amt').value+'http://getcentre.com/webpay.php'+'D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F';
			var hash = CryptoJS.SHA512(payhash);	
			console.log('this is the hash:'+hash);
			var val= document.getElementById('hash_value');
			val.innerHTML=payhash;
			var hashval= document.getElementById('hash_hid');
			hashval.value=hash;
			var refval= document.getElementById('txn_ref');
			refval.value=ref;
		})
    </script>
	<body>
    	<form name="form1" action="https://stageserv.interswitchng.com/test_paydirect/pay" method="post"> 
            <input name="product_id" type="hidden" id="p_id"  value="6205" /> 
            <input name="amount" type="hidden" id="amt" value="8000000" /> 
            <input name="currency" type="hidden" value="566" /> 
            <input name="site_redirect_url" type="hidden" value="http://getcentre.com/webpay.php" /> 
            <input name="site_name" type="hidden" value="http://www.getcentre.com" /> 
            <input name="cust_id" type="hidden" value="123" />
            <input name="cust_id_desc" type="hidden" value="Agent" /> 
            <input name="cust_name" type="hidden" value="Adedolapo" /> 
            <input name="cust_name_desc" type="hidden" value="Yusuf" /> 
            <input name="txn_ref" type="hidden" id="txn_ref" value="" /> 
            <input name="pay_item_id" id="pay_id" type="hidden" value="101" /> 
            <input name="pay_item_name" type="hidden" value="Transaction|web" /> 
            <input name="local_date_time" type="hidden" value="27/04/2015" /> 
            <input name="hash" type="hidden" id="hash_hid" value="BB292DF9268F05CB9CBBC5E0C13CC1B13ACA34DC" /> 
            <div id="hash_value"></div>
            <input type="Submit" value="Submit"/>
        </form>
    </body>
</html>
