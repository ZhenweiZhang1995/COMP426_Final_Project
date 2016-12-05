<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

class Login{
	private $user_id;
	private $username;
	private $email;
	private $password;

	public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
		      	"weijian", 
				"123456", 
		      	"weijiandb");
  }
  	private function __construct($user_id,$email,$username,$password){
  		$this->user_id=$user_id;
  		$this->email=$email;
  		$this->username=$username;
  		$this->password=$password;

  	}
	public static function create($email,$username,$password){
		$mysqli=Login::connect();
		$result=$mysqli->query("insert into Login values (".
				"'" . $mysqli->real_escape_string($username) . "', " .
			     "'" . $mysqli->real_escape_string($email) . "', " .
			     "'" . md5($mysqli->real_escape_string($password)) . "'"
				)
		if($result){
			$id=$mysqli->insert_id;
			return new Login($id,$email,$username,$password);
		}
	}


	public static function findByName($username){
		$mysqli=Login::connect();
		$result= $mysqli->query("select password from Login where username='".$username."'");
		if ($result) {
			if($result->num_rows==0){
				return null;
			}
			$rst_info=$mysqli->fetch_array();
			return new Student(intval($rst_info['user_id']),
				$rst_info['email'],
				$rst_info['username'],
				$rst_info['password']
				)
		}
	}
	public static function getAllIDs()
	private function update(){
		$mysqli=Login::connect();
    	$result = $mysqli->query("update Login set " .
			     "email=" .
			     "'" . $mysqli->real_escape_string($this->email) . "', " .
			     "password=" .
			     "'" . md5($mysqli->real_escape_string($this->password)) . "', " .
			     " where username='" . $this->username)."'";
    	return $result;
	}
	public function delete(){
		$mysqli = Login::connect();
    	$mysqli->query("delete from Login where usernmae = " . $this->username);
	}
	public function getJSON(){

	}
}
?>