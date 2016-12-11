<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

require_once('orm/Product.php');

if (isset($_SERVER['PATH_INFO'])) {
	$path_components = explode('/', $_SERVER['PATH_INFO']);
}else{
	$path_components=null;
}


if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if (count($path_components) == 0) {
		$name = $_GET['search'];
		$product = Product::getProductByName($name);
		if ($product == null) {
				// product not found
				header("Content-type: application/json");
				print(json_encode(array("found"=>false)));
				exit();
			}
			header("Content-type: application/json");
			print($product->getJSON());
			exit();
	} else {
		$resource_type = $path_components[1]; // e.g. "product"
		if ($resource_type == "product") {

			if ((count($path_components) == 2)) {      // get all product ids
				header("Content-type: application/json");
				print(json_encode(product::getIDs()));
				exit();
			} else {    // get a product's json
				$product_id = intval($path_components[2]);
				$product = Product::getProductByID($product_id);
				if ($product == null) {
					// product not found
					header("HTTP/1.0 404 Not Found");
					exit();
				}
				header("Content-type: application/json");
				print($product->getJSON());
				exit();
			}
		}
	}
	
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$resource_type=$path_components[1];
	if ($resource_type=='product') {
		$img=$_POST['img'];
		$product_name=$_POST['product_name'];
		$category=$_POST['category'];
		$seller_id=$_POST['seller_id'];
		$description=$_POST['description'];
		$price=$_POST['price'];
		
		$create=Product::create($seller_id,$product_name,$price,$img,$description,$category);

		header("Content-type: application/json");
		print(json_encode($create));

	}
}



?>