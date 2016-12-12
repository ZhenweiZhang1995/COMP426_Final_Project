<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

class Product
{
	public $seller_id;
	public $product_name;
	public $product_id;
	public $price;
	public $pic_path;
	public $description;
	public $category;
	
	public static function connect() {
		return new mysqli("classroom.cs.unc.edu",
											"weijian",
											"123456",
											"weijiandb"
											);
	}

	public static function create($seller_id,$product_name,$price,$pic_path,$description,$category){
		$mysqli=Product::connect();
		$ss="insert into Product (seller_id,product_name,price,pic_path,description,category) values (".$seller_id.",'".$mysqli->real_escape_string($product_name)."',".$price.",'".$mysqli->real_escape_string($pic_path)."','".$mysqli->real_escape_string($description)."','".$mysqli->real_escape_string($category)."')";
		
		$res=$mysqli->query($ss);
		if($res){
			$product_id=$mysqli->insert_id;
			return '1';//seccessfully created
		}else{
			return '0';
		}
	}

	public static function getIDs() {
		$mysqli = Product::connect();
		$res = $mysqli->query("select product_id from Product");
		$id_array = array();
		if ($res) {
			while ($next_row = $res->fetch_array()) {
				$id_array[] = intval($next_row['product_id']);
			}
		}
		return $id_array;
	}

	public static function getProductByName($name) {
		$mysqli = Product::connect();

    	$result = $mysqli->query('select * from Product where product_name like "%'.$name.'%"');
    	if ($result) {
    	if ($result->num_rows == 0) {
    		return null;}

		$product_info = $result->fetch_array();
    	
		$seller_id=$product_info['seller_id'];
		$product_name=$product_info['product_name'];
		$product_id=$product_info['product_id'];
		$price=$product_info['price'];
		$pic_path=$product_info['pic_path'];
		$description=$product_info['description'];
		$category=$product_info['category'];

    	return new Product($seller_id,$product_name,
    		$product_id,$price,$pic_path,$description,$category);
    	}
	}

	public static function getProductByID($id) {
		$mysqli = Product::connect();
    	$result = $mysqli->query("select * from Product where product_id = " . $id);
    if ($result) {
    	if ($result->num_rows == 0) {
    		return null;
    		
    	}

    	$product_info = $result->fetch_array();
    	$seller_id=$product_info['seller_id'];
		$product_name=$product_info['product_name'];
		$product_id=$product_info['product_id'];
		$price=$product_info['price'];
		$pic_path=$product_info['pic_path'];
		$description=$product_info['description'];
		$category=$product_info['category'];
 
    	return new Product($seller_id,$product_name,
    		$product_id,$price,$pic_path,$description,$category);
    	}
	}
	
	public static function getProductBySellerID($id) {
		$product_arr=array();
		$mysqli = Product::connect();
    	$result = $mysqli->query("select * from Product where seller_id = " . $id);
	    if ($result) {
	    	if ($result->num_rows == 0) {
	    		return null;
	    	}
		}
		for($i=0;$i<$result->num_rows;$i++){
			$product_info = $result->fetch_array();
	    	$seller_id=$product_info['seller_id'];
			$product_name=$product_info['product_name'];
			$product_id=$product_info['product_id'];
			$price=$product_info['price'];
			$pic_path=$product_info['pic_path'];
			$description=$product_info['description'];
			$category=$product_info['category'];
			
     		$product_arr[]= new Product($seller_id,$product_name,$product_id,$price,$pic_path,$description,$category);
    	}
    	// print($result->num_rows);
    	return $product_arr;
    }


	public function getJSON() {
		$json = array(
			  	"found"=>true,
				"seller_id"=>$this->seller_id,
				"product_name"=>$this->product_name,
				"product_id"=>$this->product_id,
				"price"=>$this->price,
				"pic_path"=>$this->pic_path,
				"description"=>$this->description,
				"category"=>$this->category
			);
		 return json_encode($json);
	}
	private function __construct
	($seller_id,$product_name,$product_id,$price,$pic_path,$description,$category) 
	{
			$this->seller_id=$seller_id;
			$this->product_name=$product_name;
			$this->product_id=$product_id;
			$this->price=$price;
			$this->pic_path=$pic_path;
			$this->description=$description;
			$this->category=$category;
	}

}
?>