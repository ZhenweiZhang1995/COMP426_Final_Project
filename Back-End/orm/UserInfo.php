<?php
date_default_timezone_set('America/New_York');

class UserInfo
{
	private $gender;
	private $user_id;
	private $dob;
	private $portrait;
	private $phone;

	public static function connect() {
		return new mysqli("classroom.cs.unc.edu",
											"weijian",
											"123456",
											"weijiandb"
											);
	}

	public static function getIDs() {
		$mysqli = UserInfo::connect();

		$res = $mysqli->query("select user_id from UserInfo");
		

		$id_array = array();

		if ($res) {
			while ($next_row = $res->fetch_array()) {
				$id_array[] = intval($next_row['user_id']);
			}
		}
		
		return $id_array;
	}

	// public static function getUserInfoByphone($phone) {
	// 	$mysqli = UserInfo::connect();

 //    	$result = $mysqli->query('select * from UserInfo where phone like "%'.$phone.'%"');
 //    	if ($result) {
 //    	if ($result->num_rows == 0) {
 //    		return null;
 //    	}

	// 	$UserInfo_info = $result->fetch_array();
    	
 //    	$gender = $UserInfo_info['gender'];
 //    	$user_id = $UserInfo_info['user_id'];
 //    	$dob = $UserInfo_info['dob'];
 //    	$portrait = $UserInfo_info['portrait'];
 //    	$phone = $UserInfo_info['phone'];
 //    	haha = $UserInfo_info['profile_path'];
 //    	haha = $UserInfo_info['Website'];
 //    	haha= $UserInfo_info['preview'];

 //    	return new UserInfo($gender,$user_id,$dob,$portrait,$phone,haha,haha,haha);
 //    	}
	// }

	public static function getUserInfoByID($id) {
		$mysqli = UserInfo::connect();

    	$result = $mysqli->query("select * from UserInfo where user_id = " . $id);
    	if ($result) {
    		if ($result->num_rows == 0) {
    			return null;
    		}

    	$UserInfo_info = $result->fetch_array();
    	
    	$gender = $UserInfo_info['gender'];
    	$user_id = $UserInfo_info['user_id'];
    	$dob = $UserInfo_info['dob'];
    	$portrait = $UserInfo_info['portrait'];
    	$phone = $UserInfo_info['phone'];
 
    	return new UserInfo($gender,$user_id,$dob,$portrait,$phone);
    	}
	}
	public static function update($id,$dob,$gender,$phone){
		$mysqli = UserInfo::connect();
    	$result = $mysqli->query("update UserInfo set dob='".$dob."',gender='".$gender."',phone='".$phone."' where user_id =".$id);
    	if($result){
    		return "1";
    	}else{
    		return "0";
    	}
	}
	public static function create($name){
		$mysqli = UserInfo::connect();
    	$result = $mysqli->query("insert into UserInfo (dob,gender,phone,portrait,user_id) values('0000-00-00','','','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi7KWKXXrylyExzMj7TxaYyDrlO4W4-f4Blaf9y42R3r48Jp05',(select user_id from Login where username ='".$name."'))");
    	if($result){
    		return "1";
    	}else{
    		return "0";
    	}
	}
	public function getJSON() {
		$json = array(
				"gender"=>$this->gender,
				"user_id"=>$this->user_id,
				"dob"=>$this->dob,
				"portrait"=>$this->portrait, 
				"phone"=>$this->phone
			);
		 return json_encode($json);
	}

	private function __construct
	($gender,$user_id,$dob,$portrait,$phone) 
	{
		$this->gender = $gender;
		$this->user_id = $user_id;
		$this->dob = $dob;
		$this->portrait = $portrait;
		$this->phone = $phone;
	}

}
?>