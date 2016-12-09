<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set('America/New_York');

class Register{
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

	public static function create($email,$username,$password){
		$mysqli=Register::connect();
		$num_res1=$mysqli->query("select * from Login where username='".$username."'");
		$num_res2=$mysqli->query("select * from Login where email='".$email."'");
		if($num_res1->num_rows==0 && $num_res2->num_rows==0){
			$result=$mysqli->query("insert into Login (username,email,password) values ('".
				 $mysqli->real_escape_string($username) . "','" .
			      $mysqli->real_escape_string($email) . "','" .
			       md5($mysqli->real_escape_string($password)) . "')"
			);
			if($result){
				$id=$mysqli->insert_id;
				return 0;//successfully created
			}else{
				return 4;//database didn't add this user for some reason
			}
		}else if($num_res1->num_rows==0 && $num_res2->num_rows!=0){
			return 1;//email redundent
		}else if($num_res1->num_rows!=0 && $num_res2->num_rows==0){
			return 2;//username redundent
		}else{
			return 3;//username and email are redundent
		}	
	}
}
?>