 $(document).ready(function () {
 	load_account_info();
});

var load_account_info=function(){

var username;
var email;
   $.ajax(
    {type: "GET",
      url: '../Back-End/login.php',
      data:{
        action:'login',
    user:'zhengyang',
    pass:'123456'
        },
      cache:false,
     dataType: "json",
     success: function(json) {
    alert("gg");
    username=json.username;
    alert(username);
    email=json.email;
    alert(email);
   }
  });	

   $.ajax('../Back-End/userInfo.php/UserInfo/1',//currently can only get user number 1's information
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
      url: '../Back-End/product.php/product/1',
      cache:true,
     dataType: "json",
     success: function(product_json) {
          alert(product_json.seller_id);
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


