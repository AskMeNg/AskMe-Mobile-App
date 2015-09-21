<?php 
	require_once 'JSON.php';
	require_once 'fun_connect2.php';
	session_start();
	$user=$_SESSION['user'];
	$sql="Select * FROM Registered_user WHERE userId='$user'";
	$rs = mysql_query($sql);
	$row = mysql_fetch_array($rs);
	
	$rooms=json_decode($_GET["Rooms"], true);
	$references=json_decode($_GET["References"], true);
	$to=$row["userEmail"];
	$subject = "Getcentre Hotel Reservation";
	$message="<b>Dear ".$row["userTitle"].' '.$row["userFirstName"].' '. $row["userLastName"].",</b><br><br>";
	$message.= 'Your Hotel Reservation was Successful<br><br>';	
	$message.= "<b>Hotel Name:</b>".$_GET["hotelname"]."<br>";
	$message.= "<b>Hotel Address:</b> ".$_GET["hotelAddress"]."<br>";
	$message.= "<b>Check-In Date: </b>".$_GET["hcheckin"]."<br>";
	$message.= "<b>Check-Out Date:</b> ".$_GET["hcheckout"]."<br>";
	if($_GET["totalRoom"]>1){
		for($i=0; $i<count($rooms); $i++){
			$message.= "<b>Room ".($i+1).":</b>".$rooms[$i][HotelRoom][RoomType]['$']."(".$rooms[$i][HotelRoom][Board]['$'].')| Adults('.$rooms[$i][HotelOccupancy][Occupancy][AdultCount].') Children('.$rooms[$i][HotelOccupancy][Occupancy][ChildCount].")<br>";
			}
	}
	else{
		$message.= "<b>Room 1:</b>".$rooms[HotelRoom][RoomType]['$']."(".$rooms[HotelRoom][Board]['$'].')| Adults('.$rooms[HotelOccupancy][Occupancy][AdultCount].') Children('.$rooms[HotelOccupancy][Occupancy][ChildCount].")<br>";
	}
	$message.= "<b>Total Nights: </b>".$_GET["totalNight"]."<br>";
	$message.= "<b>Total Rooms Booked:</b> ".$_GET["totalRoom"]."<br>";
	$message.= "<b>Total Adult:</b> ".$_GET["totalAdult"]."<br>";
	$message.= "<b>Total Children: </b>".$_GET["totalChild"]."<br>";
	/*$message.= "<b>Cancelation Policies:</b> ".$_GET["can_rule"]."<br>";
	$message.= "<b>Reservation Policies:</b> ".$_GET["r_rule"]."<br>";*/
	$message.= "<b>Total Amount:</b> ".$_GET["totalAmount"]."<br>";
	$message.= "<b>Booking Reference:</b>".$references[FileNumber].'|'.$references[IncomingOffice]['@code']."<br>";
	$message.= "Best Regards,<br> The GetCentre Team.<br>";    
	$headers = "MIME-Version: 1.0"."\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= "From:Getcentre.com\r\n";
	//$message = nl2br($message);
	$a = mail($to, $subject, $message, $headers);
	$json = json_encode($row);
	echo $json;                
	

?>