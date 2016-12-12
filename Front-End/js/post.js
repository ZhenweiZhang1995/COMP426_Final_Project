//var designers = $('#brands');
var img;
		var product_name;
		var category;
		var seller_id;
		var price;
		var description;
		var username;
$(document).ready(function (){
	username=getCookie("username");
  user_id=getCookie("user_id");
  if(username!=""){
    nav_login(username);
  }
	$('#post_button').on('click',function(e){
		img=$('#img').val();
		product_name=$('#product_name').val();
		category=$('#category').val();
		seller_id=$('#seller_id').val();
		price=$('#price').val();
		description=$('#description').val();
		e.stopPropagation();
		e.preventDefault();
		post_info();
	});
	 	 $('#logout_button').on('click',function(e){
 	 	e.stopPropagation();
		e.preventDefault();
 	 	deleteCookie();
 	 });
});
var post_info = function(){

	$.ajax(
		//'../Back-End/product.php/product
		// ?'+
		// 'img='+img+
		// '&product_name='+product_name+
		// '&category='+category+
		// '&seller_id='+seller_id+
		// '&price='+price+
		// '&description='+description,
	      {type: 'POST',
	      	url: '../Back-End/product.php/product',
	      	data:{
				img:img,
				product_name:product_name,
				category:category,
				seller_id:seller_id,
				price:price,
				description:description
	      	},
	      	cashe:false,
		    dataType: "json",
		      success: function(json) {
		      	if(json==1){
		      		alert('successfully posted');
		      		window.location.href = "account.html";
		      	}else{
		      		alert('post failed');
		      	}
		      }
	      });
};



