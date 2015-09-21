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
 
/*
 * Create SQL
 */

 
$sql = "SELECT distinct  service_localg, service_state FROM service WHERE (";
for($i = 0; $i < $p; $i++) {
  if($i != 0){$sql .= ' AND ( service_state LIKE ' . "'%" . mysql_real_escape_string($parts[$i]) . "%' OR service_localg LIKE ". "'%". mysql_real_escape_string($parts[$i]). "%')";}
  else{
	  $sql .= '( service_state LIKE ' . "'%" . mysql_real_escape_string($parts[$i]) . "%' OR service_localg LIKE ". "'%". mysql_real_escape_string($parts[$i]). "%')";
  }
}
  $sql .= " )";
//  echo($sql);
$rs = mysql_query($sql);
while($row = mysql_fetch_array($rs)) {
  $a_json_row["id"] = $row[0];
  $a_json_row["value"] = $row[0]." ".$row[1];
  $a_json_row["label"] = $row[0]." ".$row[1];
  array_push($a_json, $a_json_row);
}

// highlight search results
$a_json = apply_highlight($a_json, $parts);
 
$json = json_encode($a_json);
print $json;
?>