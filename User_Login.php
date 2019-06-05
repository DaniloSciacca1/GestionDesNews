<?php

include 'DBConfig.php';
 
// Create connection
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);
	
	$Mail = $obj['Mail'];
	
	$MotDePasse = $obj['MotDePasse'];
	
	if($obj['Mail']!=""){	
	
	$result= $conn->query("SELECT * FROM users where Mail='$Mail' and MotDePasse='$MotDePasse'");
	
		if($result->num_rows==0){
			echo json_encode('Wrong Details');				
		}
		else{		
		echo json_encode('ok');				
		}
	}	
	else{
	  echo json_encode('try again');
	}
?>