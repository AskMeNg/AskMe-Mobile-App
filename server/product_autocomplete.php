<?php
// contains utility functions mb_stripos_all() and apply_highlight()
require_once 'local_utils.php';
require_once 'fun_connect2.php';

error_reporting(E_ERROR);
//error_reporting(E_ALL);
//ini_set('display_errors', 1); 
 
// prevent direct access
$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND
strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
if(!$isAjax) {
  $user_error = 'Access denied - not an AJAX request...';
  trigger_error($user_error, E_USER_ERROR);
}
 
// get what user typed in autocomplete input
$term = trim($_GET['term']);
 
$a_json = array();
$a_json_row = array();
 
$a_json_invalid = array(array("id" => "#", "value" => $term, "label" => "Only letters and digits are permitted..."));
$json_invalid = json_encode($a_json_invalid);
 
// replace multiple spaces with one
$term=str_replace(",", " ", $term);
$term = preg_replace('/\s+/', ' ', $term);
 
// SECURITY HOLE ***************************************************************
// allow space, any unicode letter and digit, underscore and dash
if(preg_match("/[^\040\pL\pN_-]/u", $term)) {
  print $json_invalid;
  exit;
}
// *****************************************************************************
 
$parts = explode(' ', $term);
$p = count($parts);
 
/**
 * Create SQL
 */
/*SELECT c.NAME, d.Name FROM country_ids AS c Join destinations As e ON c.countrycode= e.countrycode Join destination_ids As d ON e.destinationcode=d.destinationcode WHERE (d.Name like '%dub%' OR c.Name like '%dub%' ) AND c.languagecode='ENG' AND d.languagecode='ENG'*/
 
$sql = "SELECT DISTINCT pt.product_no, ptd.p_description_Name, s.service_name, s.service_industry FROM producttype As pt Join producttype_description As ptd ON pt.product_no = ptd.p_description_id JOIN `service` as s  WHERE (";
for($i = 0; $i < $p; $i++) {
  if($i != 0){$sql .= " AND ( ptd.p_description_name LIKE ". "'%" . mysql_real_escape_string($parts[$i]) . "%' OR s.service_industry LIKE ". "'%". mysql_real_escape_string($parts[$i]) . "%' OR s.service_name LIKE ". "'%" .mysql_real_escape_string($parts[$i])."%')";}
  else{
	  $sql .= "(  ptd.p_description_name LIKE ". "'%" . mysql_real_escape_string($parts[$i]) . "%' OR s.service_industry LIKE ". "'%". mysql_real_escape_string($parts[$i]) . "%' OR s.service_name LIKE ". "'%" .mysql_real_escape_string($parts[$i])."%')";
  }
}
  $sql .= " )";
//  echo($sql);
$rs = mysql_query($sql);
/*if($rs === false) {
  //$user_error = 'Wrong SQL: ' . $sql . 'Error: ' . mysql_errno . ' ' . mysql_error;
//  trigger_error($user_error, E_USER_ERROR);
} */
while($row = mysql_fetch_array($rs)) {
	
  
  if (strpos(strtolower($row[1]),strtolower($parts[0])) !== false) {
	$a_json_row["id"] = $row[0];
	$a_json_row["type"] = 'P';
    $a_json_row["value"] = $row[1];
	$a_json_row["label"] = $row[1];
	}
	
	else{
		if(strpos(strtolower($row[2]), strtolower($parts[0])) !== false){
		$a_json_row["type"] = 'S';
		$a_json_row["value"] = $row[2];
  		$a_json_row["label"] = $row[2];	
	}
  	else{
		$a_json_row["type"] = 'I';
		$a_json_row["value"] = $row[3];
  		$a_json_row["label"] = $row[3];
	}
	}
  array_push($a_json, $a_json_row);
}

/*if(count($a_json)!=0){
	$sql="SELECT a.ZONECODE, a.ZONENAME, a.DESTINATIONCODE, b.NAME, c.COUNTRYCODE  FROM ZONES AS a Join DESTINATION_IDS As b ON a.DESTINATIONCODE=b.DESTINATIONCODE Join DESTINATIONS As c ON b.DESTINATIONCODE= c.DESTINATIONCODE WHERE ( ";
	for($a = 0; $a < count($a_json); $a++) {
	   if($a != 0){$sql .= ' OR a.DESTINATIONCODE = "'.$a_json[$a]['id'].'"';}
	   else{$sql .=' a.DESTINATIONCODE = "'.$a_json[$a]['id'].'"';}	  
	}
}
else{
	$sql="SELECT `ZONECODE`, `ZONENAME`, `DESTINATIONCODE` FROM ZONES  WHERE (";
	for($a = 0; $a < $p; $a++) {
	   if($a != 0){$sql .= ' AND ( `ZONENAME` LIKE ' .'"%'.mysql_real_escape_string($parts[$a]). '%")';}
	   else{$sql .= ' ( `ZONENAME` LIKE ' .'"%'.mysql_real_escape_string($parts[$a]).'%")';}	  
	}
	
}
$sql .= " ) AND b.LANGUAGECODE='ENG'";
$rs = mysql_query($sql);
if($rs === false) {
  $user_error = 'Wrong SQL: ' . $sql . 'Error: ' . mysql_errno . ' ' . mysql_error;
  trigger_error($user_error, E_USER_ERROR);
}
while($row_zone = mysql_fetch_array($rs)) {
  $a_json_row["id"] = $row_zone[2].'_'.$row_zone[0];
  $a_json_row["value"] = $row_zone[1].", ".$row_zone[3].', '.$row_zone[4];
  $a_json_row["label"] =  $row_zone[1].", ".$row_zone[3].', '.$row_zone[4];
  array_push($a_json, $a_json_row);
}*/
// highlight search results
$a_json = apply_highlight($a_json, $parts);
 
$json = json_encode($a_json);
print $json;
?>