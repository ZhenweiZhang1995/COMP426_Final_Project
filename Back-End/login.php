<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once('orm/Login.php');

$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /Login.php/<id>

  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    // Interpret <id> as integer
    $login_username = intval($path_components[1]);

    // Look up object via ORM
    $login = Login::findByName($login_username);

    if ($login == null) {
      // Login not found.
      header("HTTP/1.0 404 Not Found");
      print("Login username: " . $login_username . " not found.");
      exit();
    }

    // Check to see if deleting
    if (isset($_REQUEST['delete'])) {
      $login->delete();
      header("Content-type: application/json");
      print(json_encode(true));
      exit();
    } 

    // Normal lookup.
    // Generate JSON encoding as response
    header("Content-type: application/json");
    print($login->getJSON());
    exit();

  }

  // ID not specified, then must be asking for index
  header("Content-type: application/json");
  print(json_encode(Login::getAllIDs()));
  exit();

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

  // Either creating or updating

  // Following matches /Login.php/<id> form
  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    //Interpret <id> as integer and look up via ORM
    $Login_name = $path_components[1];
    $Login = Login::findByName($Login_name);

    if ($Login == null) {
      // Login not found.
      header("HTTP/1.0 404 Not Found");
      print("Login name: " . $Login_name . " not found while attempting update.");
      exit();
    }
//username,email,password
    // Validate values
    $new_username = false;
    if (isset($_REQUEST['username'])) {
      $new_username = trim($_REQUEST['username']);
      if ($new_username == "") {
	header("HTTP/1.0 400 Bad Request");
	print("Bad title");
	exit();
      }
    }

    $new_email = false;
    if (isset($_REQUEST['email'])) {
      $new_email = trim($_REQUEST['email']);
    }

    $new_password = false;
    if (isset($_REQUEST['password'])) {
      $new_password = trim($_REQUEST['password']);
    }

    // Update via ORM
    if ($new_username) {
      $Login->setUserName($new_username);
    }
    if ($new_email != false) {
      $Login->setEmail($new_email);
    }
    if ($new_password != false) {
      $Login->setPassword($new_password);
    }
 

    // Return JSON encoding of updated Login
    header("Content-type: application/json");
    print($Login->getJSON());
    exit();
  } else {

    // Creating a new Login item

    // Validate values
    if (!isset($_REQUEST['username'])) {
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }
    
    $username = trim($_REQUEST['username']);
    if ($username == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Bad usernmae");
      exit();
    }

    $email = "";
    if (isset($_REQUEST['email'])) {
      $email = trim($_REQUEST['email']);
    }

    $password = "";
    if (isset($_REQUEST['password'])) {
      $password = trim($_REQUEST['password']);
    }

    // Create new Login via ORM
    $new_Login = Login::create($username, $email, $password);

    // Report if failed
    if ($new_Login == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new Login.");
      exit();
    }
    
    //Generate JSON encoding of new Login
    header("Content-type: application/json");
    print($new_Login->getJSON());
    exit();
  }
}

// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.

header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");

?>