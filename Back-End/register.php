<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once('orm/Register.php');

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
    //$action=$_GET['action'];

}
else{
    $path_components =null;
}
//$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {
        print(json_encode(array(
              'flag'=>"e"
              )));
        exit();
      }   
  
  else if(isset($_GET['action'])){
    if ($_GET['action']=='register') {
      $email=$_GET['email'];
      $username=$_GET['user'];
      $password=$_GET['pass'];
      $flag="";
      $register=Register::create($email,$username,$password);
      // if ($register==null) {
      //   header("HTTP/1.0 404 NOT FOUND");
      //   print("Null created");
      //   exit();
      // }else{
      //     header("Content-type: application/json");
      //     print($register->getJSON());
      //     exit();
      // }
      if ($register==0) {
      	$flag="0";
      	header("Content-type: application/json");
        //echo json_encode($username);
        //$a=array('flag'=>0);
        print(json_encode($flag));
        exit();
      }else if ($register ==1){
        $flag="1";
      	header("Content-type: application/json");
        //echo json_encode($username);
        //$a=array('flag'=>0);
        print(json_encode($flag));
        exit();
      }else if($register == 2){
        $flag="2";
      	header("Content-type: application/json");
        //echo json_encode($username);
        //$a=array('flag'=>0);
        print(json_encode($flag));
        exit();
      }else if($register == 3){
        $flag="3";
      	header("Content-type: application/json");
        //echo json_encode($username);
        //$a=array('flag'=>0);
        print(json_encode($flag));
        exit();
      }else if($register == 4){
        $flag="4";
      	header("Content-type: application/json");
        //echo json_encode($username);
        //$a=array('flag'=>0);
        print(json_encode($flag));
        exit();
      }else{
        $flag="5";
      	header("Content-type: application/json");
        //echo json_encode($username);
        //$a=array('flag'=>0);
        print(json_encode($flag));
        exit();
      }

    }
  }
}

?>