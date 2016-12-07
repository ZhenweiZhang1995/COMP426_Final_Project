<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

$conn = new mysqli("classroom.cs.unc.edu", 
                   "weijian", 
                   "123456", 
		   "weijiandb");

//$conn->query("drop table if exists login");

$conn->query("create table login ( " .
               "user_id int primary key not null auto_increment, " .
	       "username varchar(30), " .
	       "email tinytext, " .
	       "password int)");
?>