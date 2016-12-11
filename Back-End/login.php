<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once('orm/Login.php');
// session_start();

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
    $action=$_GET['action'];
}
else{
    $path_components =null;
}
if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if(isset($_GET['action'])){
    if ($_GET['action']=='login') {
      $username=$_GET['user'];
      $password=$_GET['pass'];
      $login=Login::findByName($username,$password);
      if ($login==null) {
        header("HTTP/1.0 404 NOT FOUND");
        // unset($_SESSION['username']);
        // unset($_SESSION['authsalt']);
        // unset($_SESSION['user_id']);

        print("Student firstname: ".$_GET['first_name']." not found!");
        exit();
      }else{//success
          header("Content-type: application/json");
          // $_SESSION['username'] = $login->getName();
          // $_SESSION['authsalt'] = time();
          // $_SESSION['user_id']= $login->getID();
          setcookie("username", $login->getName(),time()+(3600), '/Courses/comp426-f16/users','wwwp.cs.unc.edu');
          setcookie("user_id", $login->getID(),time()+(3600), '/Courses/comp426-f16/users','wwwp.cs.unc.edu');
          print($login->getJSON());
          exit();
      }
    }    
  }
  }
?>