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
    // alert("gg");
     username=json.username;
    // alert(username);
     email=json.email;
    // alert(email);
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
                '<p style="color:black">Username: <span style="color:blue" id="UserName">'+username+'</span></p>'+
                '<p style="color:black">Email: <span style="color:blue" id="Email">'+email+'</span></p>'+
                '<p style="color:black">DOB: '+'<input id="dob" type="text" name="fname" style="color:black" value="'+ userInfo_json.dob +'">' +
                '<p style="color:black">Gender: ' + '<input id="gender" type="text" name="fname" style="color:black" value="'+ userInfo_json.gender +'">' +
                '<p style="color:black">Phone: ' + '<input id="phone" type="text" name="fname" style="color:black" value="'+ userInfo_json.phone +'">' +
                '<p style="color:black">Portrait: <span style="color:blue" id="Portrait"><img src="img/portrait/'+userInfo_json.portrait+'"></span></p>'
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


// $(document).ready(function () {
//     $('#save').on('click', function (e) {
//                   var dob = $("#dob").val();
//                   var gender = $("#gender").val();
//                   var phone = $("phone")val();
                  
//                   e.stopPropagation();
//                   e.preventDefault();
                  
//                   if (!gender.match('M') || !gender.match('F')){
//                     alert("You can only be F or M.");
//                   } else if (!(/[0-9]/).test(phone)){
//                   alert("Phone number not valid.");
//                   } else {
//                         $.ajax(
//                                {type: 'POST',
//                                url: "../Back-End/userInfo.php",
//                                data:{
//                                action: "???",
//                                dob: dob,
//                                gender: gender,
//                                phone: phone
//                                },
                               
//                                datatype: "json",
//                                success: function(json){
                               
                               
//                                }
                               
//                                });
//     });
// });

