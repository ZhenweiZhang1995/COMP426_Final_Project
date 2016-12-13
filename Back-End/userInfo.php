<?php
ini_set('display_errors',1);
date_default_timezone_set('America/New_York');

require_once('orm/UserInfo.php');
require_once('orm/Login.php');


if (isset($_SERVER['PATH_INFO'])) {
	$path_components = explode('/', $_SERVER['PATH_INFO']);
}else{
	$path_components=null;
}


//$resource_type = $path_components[1]; // e.g. "UserInfo"

if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if(isset($_GET['action'])){
			if($_GET['action']=='query'){
				$UserInfo_name = $_COOKIE['username'];
				$UserInfo=Login::findOnlyByName($UserInfo_name);
				if ($UserInfo == null) {
						// UserInfo not found
						header("HTTP/1.0 404 Not Found");
						exit();
					}
					header("Content-type: application/json");
					print($UserInfo->getJSON());
					exit();
			}
			else if($_GET['action']=='update'){//update info
				$id = $_COOKIE['user_id'];
				$dob=$_GET['dob'];
				$gender=$_GET['gender'];
				$phone=$_GET['phone'];
				$update=UserInfo::update($id,$dob,$gender,$phone);
				print(json_encode($update));
			}
		}
		else{
		$resource_type = $path_components[1]; // e.g. 
		if ($resource_type == "UserInfo") {
   // get a UserInfo's json
				$UserInfo_id = $_COOKIE['user_id'];

		$UserInfo = UserInfo::getUserInfoByID($UserInfo_id);
				if ($UserInfo == null) {
					// UserInfo not found
					header("HTTP/1.0 404 Not Found");
					exit();
				}
				header("Content-type: application/json");
				print($UserInfo->getJSON());
				exit();
			
		}
	}
	
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
	/* Post tickets 
	 
	if ($resource_type == "games") {
		if (count($path_components) == 3) {
			$game_id = intval($path_components[2]);
			$game = Game::getGameByID($game_id);
			if ($game == null) {
				// game not found
				header("HTTP/1.0 404 Not Found");
				exit();
			}

		}
	}
	*/
}



?>