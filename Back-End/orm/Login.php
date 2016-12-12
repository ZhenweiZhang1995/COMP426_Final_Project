<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set('America/New_York');

class Login{
	private $user_id;
	private $username;
	private $email;
	private $password;
	private $success;

	public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
		      	"weijian", 
				"123456", 
		      	"weijiandb");
  }
  	private function __construct($user_id,$email,$username,$password,$success){
  		$this->user_id=$user_id;
  		$this->email=$email;
  		$this->username=$username;
  		$this->password=$password;
  		$this->success=$success;
  	}
	public static function findByName($usn,$pswd){
		$mysqli=Login::connect();
		$result= $mysqli->query("select * from Login where username='".$usn."'");
		if ($result) {
			if($result->num_rows==0){
				return new Login(null,null,$usn,$pswd,2);//didn't find username
			}
			$rst_info=$result->fetch_array();
			// $user_id=intval($rst_info['user_id']);
			// $email=$rst_info['email'];
			// $user=$rst_info['username'];
			$pass=$rst_info['password'];
			if($pass==md5($pswd)){
				return new Login(intval($rst_info['user_id']),$rst_info['email'],$rst_info['username'],$pass,1);//Both Username and Password are correct
			}
			else{
				return new Login(intval($rst_info['user_id']),$rst_info['email'],$rst_info['username'],$pass,0);//password incorrect
			}	
		}
	}
	public static function findOnlyByName($usn){
		$mysqli=Login::connect();
		$result= $mysqli->query("select * from Login where username='".$usn."'");
		$rst_info=$result->fetch_array();
		if($result->num_rows==1){
			return new Login(intval($rst_info['user_id']),$rst_info['email'],$rst_info['username'],$pass,1);
		}
	}

	public function getID(){
		return $this->user_id;
	}
	public function getName(){
		return $this->username;
	}
	public function getEmail(){
		return $this->email;
	}
	public function getJSON(){
		$json_obj = array('user_id' => $this->user_id,
			      'email' => $this->email,
			      'username' => $this->username,
			      'password' =>$this->password,
			      'success'=>$this->success
			      );
	    return json_encode($json_obj);
	}
}
?>