<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once('orm/Login.php');
session_start();

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
    $action=$_GET['action'];
    //print($action);
}
else{
    $path_components =null;
}

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {



  }else if(isset($_GET['action'])){
    if ($_GET['action']=='login') {
      $username=$_GET['user'];
      $password=$_GET['pass'];
      $login=Login::findByName($username,$password);
      if ($login==null) {
        header("HTTP/1.0 404 NOT FOUND");
        print("Student firstname: ".$_GET['first_name']." not found!");
        exit();
      }
      else{
          header("Content-type: application/json");
          print($login->getJSON());
          exit();
      }
    }
  }
}
?>