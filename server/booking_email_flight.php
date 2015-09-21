<?php 
	require_once 'JSON.php';
	require_once 'fun_connect2.php';
	session_start();
	$user=$_SESSION['user'];
	$sql="Select * FROM Registered_user WHERE userId='$user'";
	$rs = mysql_query($sql);
	$row = mysql_fetch_array($rs);
	
	$flightDetails=json_decode($_GET["flightDetails"], true);
	$GuestDetails=json_decode($_GET["GuestDetails"], true);
	$bookingCode=$_GET["bookingCode"];
	$to=$GuestDetails[email];
	$subject = "Getcentre Flight Reservation";
	$message="<b>Dear ".$GuestDetails[title].' '.$GuestDetails[fname].' '. $GuestDetails[lname].",</b><br><br>";
	$message.= 'Your Flight Reservation was Successful<br><br>';	
	$message.= "<b>Departure Time:</b>".$flightDetails."<br>";
	$message.= "<b>Departure Date:</b> ".$flightDetails."<br>";
	$message.= "<b>Departure Airport: </b>".$flightDetails."<br>";
	$message.= "<b>Stopovers:</b> ".$flightDetails."<br>";
	$message.= "<b>Flight: </b>".$flightDetails."<br>";
	$message.= "<b>Arrival Time:</b> ".$flightDetails."<br>";
	$message.= "<b>Arrival Date:</b> ".$flightDetails."<br>";
	$message.= "<b>Arrival Airport: </b>".$flightDetails."<br>";
	$message.= "<b>Total Amount:</b> ".$flightDetails."<br>";
	$message.= "<b>Booking Code:</b>".$bookingCode."<br>";
	$message.= "Best Regards,<br> The GetCentre Team.<br>";    
	$headers = "MIME-Version: 1.0"."\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= "From:Getcentre.com\r\n";
	//$message = nl2br($message);
	$a = mail($to, $subject, $message, $headers);
	$json = json_encode($row);
	echo $json;                
	

?>