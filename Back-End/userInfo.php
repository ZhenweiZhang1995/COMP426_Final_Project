<?php
ini_set('display_errors',1);
date_default_timezone_set('America/New_York');

require_once('orm/UserInfo.php');

if (isset($_SERVER['PATH_INFO'])) {
	$path_components = explode('/', $_SERVER['PATH_INFO']);
}else{
	$path_components=null;
}


//$resource_type = $path_components[1]; // e.g. "UserInfo"

if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if (count($path_components) == 0) {
		$id = $_GET['userID'];
		$UserInfo = UserInfo::getUserInfoByID($id);
		if ($UserInfo == null) {
				// UserInfo not found
				header("Content-type: application/json");
				print(json_encode(array("found"=>false)));
				exit();
			}
			header("Content-type: application/json");
			print($UserInfo->getJSON());
			exit();
	} else {
		$resource_type = $path_components[1]; // e.g. "UserInfo"
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