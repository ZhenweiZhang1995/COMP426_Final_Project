 $(document).ready(function () {
 	load_account_info();
});

var load_account_info=function(){

   $.ajax('../Back-End/login.php/'+1,
    {cache:false,
    type: "GET",
     dataType: "json",
     success: function(json) {
    var username=json.username;
    var email=json.email;
   }
  });	


   $.ajax('../Back-End/UserInfo.php/UserInfo/1',//currently can only get user number 1's information
    {async: true,
    type: "GET",
     dataType: "json",
     success: function(userInfo_json) {
    $('#UserInfo').append(
    	'<h3>haha</h3>'
         // '<h3>Account information</h3>'
         //        '<p>Username: <span style="color:blue" id="UserName">'+username+'</span></p>'
         //        '<p>Email: <span style="color:blue" id="Email">'+email+'</span></p>'
         //        '<p>DOB: <span style="color:blue" id="DOB">'+userInfo_json.dob+'</span></p>'
         //        '<p>Gender: <span style="color:blue" id="Gender">'+userInfo_json.gender+'</span></p>'
         //        '<p>Phone: <span style="color:blue" id="Phone">'+userInfo_json.phone+'</span></p>'
         //        '<p>Portrait: <span style="color:blue" id="Portrait">'+userInfo_json.portrait+'</span></p>'
                );
   }
   });
};


