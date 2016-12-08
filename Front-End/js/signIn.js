 $(document).ready(function () {
 	 $('#sign_in').on('click', function (e) {
 	 	var pass=$("#password_login").val();
 	 	var user=$("#username_login").val();
		e.stopPropagation();
		e.preventDefault();

 	 	if(user==""){
 	 		alert("username please.")
 	 	}else if(pass==""){
 	 		alert("password please.")
 	 	}else{
		$.ajax('../Back-End/login.php?action=login&user='+user+"&pass="+pass,
		       {type: 'GET',
		        //url: "../Back-End/login.php?action=login", 
		        //data: {"action":"login","user":user,"pass":pass}, 
		       	datatype: "json",
				cache: false,
	        	success: function(json){ 
	            if(json.success==1){//登陆成功
	                alert("Log in success!");
	            }else if(json.success==2){//未注册用户
	            	alert("Username not found!");
	            }
	            else{alert("Password incorrect!");}
		       }});
		}
    }); 

    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    }); 
    
    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    }); 

});