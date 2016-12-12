var username;
 var user_id;
 var email;
 $(document).ready(function () {
      username=getCookie("username");
      user_id=getCookie("user_id");
  if(username!=""){
    nav_login(username);
  }
 	edit_account_info();
  $('#save').on('click',function(){
    update_info();
  });
     $('#logout_button').on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    deleteCookie();
   });
});

var edit_account_info=function(){
   $.ajax(
    {type: "GET",
      url: '../Back-End/userInfo.php',
      data:{
        action:'query',
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
                '<p style="color:black">Username: <span style="color:blue" id="UserName">'+username+'</span></p>'+
                '<p style="color:black">Email: <span style="color:blue" id="Email">'+email+'</span></p>'+
                '<p style="color:black">DOB: '+'<input id="dob" type="text" name="fname" style="color:black" value="'+ userInfo_json.dob +'">' +
                '<p style="color:black">Gender: ' + '<input id="gender" type="text" name="fname" style="color:black" value="'+ userInfo_json.gender +'">' +
                '<p style="color:black">Phone: ' + '<input id="phone" type="text" name="fname" style="color:black" value="'+ userInfo_json.phone +'">' +
                '<p style="color:black">Portrait: <span style="color:blue" id="Portrait"><img src="'+userInfo_json.portrait+'"></span></p>'
                );
    
   }});
 }

var update_info=function(){
      var dob=$('#dob').val();
      var gender=$('#gender').val();
      var phone=$('#phone').val();
      $.ajax({
        url: '../Back-End/userInfo.php',
        type:"GET",
        data:{
          action:'update',
          dob:dob,
          gender:gender,
          phone:phone
        },
        dataType:"json",
        
        success:function(json){
            if(json==1){
              window.location.href = "account.html";
            }else{
              alert('oops');
            }
          }
      });


   };

  //  $.ajax(
  //   {type: "GET",
  //     url: '../Back-End/product.php/product',
  //     data:{
  //       action:'query'
  //     },
  //     cache:true,
  //    dataType: "json",
  //    success: function(product_json) {
  //     $('#posts').append(
  //                   '<tr>'+
  //                       '<th>SellerID</th>'+
  //                       '<th>ProductID</th>'+ 
  //                       '<th>ProductName</th>'+
  //                       '<th>Picture</th>'+
  //                       '<th>Category</th>'+
  //                       '<th>Description</th>'+
  //                       '<th>Price</th>'+
  //                   '</tr>'+
  //                   '<tr>'+
  //                      '<th id="SellerID">'+product_json.seller_id+'</th>'+
  //                       '<th id="ProductID">'+product_json.product_id+'</th>'+
  //                       '<th id="ProductName">'+product_json.product_name+'</th>'+           
  //                       '<th id="Picture"><img src="img/portrait/'+product_json.portrait+'"></th>'+
  //                       '<th id="Category">'+product_json.category+'</th>'+
  //                       '<th id="Description">'+product_json.description+'</th>'+
  //                       '<th id="Price">'+product_json.price+'</th>'+
  //                   '</tr>'
  //     );

  //  }
  // }); 


