<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);	
	require_once 'fun_connect2.php';
	session_start();
	$user="Regular";
	if(isset($_GET['agent'])){$user="Agent";} $t=time();
	$title=$_GET['title'];$fname=$_GET['fname'];$lname=$_GET['lname'];$email=$_GET['email'];
	$pass=md5($_GET['pass']);$phone=$_GET['phone'];$dob=$_GET['date_birth'];
	$con_Add=$_GET['con_add'];$city=$_GET['city'];$state=$_GET['state'];$postal_c=$_GET['postal_c'];
	$country=$_GET['country'];$national=$_GET['national'];
	$sql="INSERT INTO Registered_user VALUES (NULL, 
													'".mysql_real_escape_string($title)."', 
													'".mysql_real_escape_string($fname)."', 
													'".mysql_real_escape_string($lname)."', 
													'".mysql_real_escape_string($email)."', 
													'".mysql_real_escape_string($phone)."', 
													'".mysql_real_escape_string($dob)."', 
													'$user',
													'".mysql_real_escape_string($pass)."', 
													'".mysql_real_escape_string($postal_c)."',
													'".mysql_real_escape_string($con_Add)."', 
													'".mysql_real_escape_string($city)."', 
													'".mysql_real_escape_string($state)."',  
													'".mysql_real_escape_string($country)."', 
													'".mysql_real_escape_string($national)."', 
													'New Agent',
													$t				
	)";
	$res=mysql_query($sql)or die ("Error : could not insert values" . mysql_error());	
	$user_id = mysql_insert_id();
	/*$ne= mysql_next_result($res); 
	$de=mysql_fetch($res); */
	// store session data
	$_SESSION['user']=$user_id;
	if($res){echo "o";}
	/*if($res){
		$to=$_GET['email'];
		$subject = "Getcentre Registration";
		$message="Dear ".$_GET['title']." ".$_GET['fname']." ".$_GET['lname'].",<br><br>";
		$message.= 'Thanks for Registering at Getcentre.com<br><br>';	
		$message.= "Best Regards,<br> The GetCentre Team.<br>";    
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
		$headers .= "From:Getcentre.com\r\n";
			//$message = nl2br($message);
			$a = mail($to, $subject, $message, $headers);
			if($a){echo "o";}                 
	}
	else{echo '1';}		*/			
?>

