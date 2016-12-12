 var username;
 var user_id;
 var email;
 $(document).ready(function () {
    username=getCookie("username");
  user_id=getCookie("user_id");
  if(username!=""){
    nav_login(username);
  }
 	load_account_info();
});

var load_account_info=function(){

   $.ajax(
    {type: "GET",
      url: '../Back-End/login.php',
      data:{
        action:'login',
        user:username,
        },
      cache:false,
     dataType: "json",
     success: function(json) {
    username=json.username;
    email=json.email;
   }
  });	

   $.ajax('../Back-End/userInfo.php/UserInfo/',//currently can only get user number 1's information
    {async: true,
    type: "GET",
     dataType: "json",
     success: function(userInfo_json) {
    $('#BigUserName').append(
      username
      );
    $('#UserInfo').append(
         '<h3>Account information</h3>'+
                '<p>Username: <span style="color:blue" id="UserName">'+username+'</span></p>'+
                '<p>Email: <span style="color:blue" id="Email">'+email+'</span></p>'+
                '<p>DOB: <span style="color:blue" id="DOB">'+userInfo_json.dob+'</span></p>'+
                '<p>Gender: <span style="color:blue" id="Gender">'+userInfo_json.gender+'</span></p>'+
                '<p>Phone: <span style="color:blue" id="Phone">'+userInfo_json.phone+'</span></p>'+
                '<p>Portrait: <span style="color:blue" id="Portrait"><img src="img/portrait/'+userInfo_json.portrait+'"></span></p>'
                );
    
   }
   });

   $.ajax(
    {type: "GET",
      url: '../Back-End/product.php/product',
      data:{
        action:'query'
      },
      cache:true,
     dataType: "json",
     success: function(product_json) {
      $('#posts').append(
      '<tr>'+
                        '<th>SellerID</th>'+
                        '<th>ProductID</th>'+ 
                        '<th>ProductName</th>'+
                        '<th>Picture</th>'+
                        '<th>Category</th>'+
                        '<th>Description</th>'+
                        '<th>Price</th>'+
                    '</tr>'+
                    '<tr>'+
                       '<th id="SellerID">'+product_json.seller_id+'</th>'+
                        '<th id="ProductID">'+product_json.product_id+'</th>'+
                        '<th id="ProductName">'+product_json.product_name+'</th>'+           
                        '<th id="Picture"><img src="img/portrait/'+product_json.portrait+'"></th>'+
                        '<th id="Category">'+product_json.category+'</th>'+
                        '<th id="Description">'+product_json.description+'</th>'+
                        '<th id="Price">'+product_json.price+'</th>'+
                    '</tr>'
      );

   }
  }); 

};


