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
		$resource_type = $path_components[1]; // e.g. "product"
		if ($resource_type == "product") {
			if ((count($path_components) == 2) && !isset($_GET['action'])) {      // get all product ids
				header("Content-type: application/json");
				print(json_encode(product::getIDs()));
				exit();
			} else if((count($path_components) == 3)){    // get a product's json
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
			}else if($_GET['action']=='query'){
				$seller_id=$_COOKIE['user_id'];
				$product=Product::getProductBySellerID($seller_id);//array of products
				header("Content-type: application/json");
				print(getArrayJSON($product));
			}
		}
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$resource_type=$path_components[1];
	if ($resource_type=='product') {
		$img=$_POST['img'];
		$product_name=$_POST['product_name'];
		$category=$_POST['category'];
		$description=$_POST['description'];
		$price=$_POST['price'];
		$seller_id=$_COOKIE['user_id'];
		$create=Product::create($seller_id,$product_name,$price,$img,$description,$category);

		header("Content-type: application/json");
		print(json_encode($create));

	}
}

function getArrayJSON($arr){
		$res_arr=array();
		foreach ($arr as $object){
			$res_arr[]=array(
			  	"found"=>true,
				"seller_id"=>$object->seller_id,
				"product_name"=>$object->product_name,
				"product_id"=>$object->product_id,
				"price"=>$object->price,
				"pic_path"=>$object->pic_path,
				"description"=>$object->description,
				"category"=>$object->category
			);
		}
		return json_encode($res_arr);
	}

?>