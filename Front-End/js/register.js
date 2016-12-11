 $(document).ready(function () {
 	 $('#register').on('click', function (e) {

 	 	var pass=$("#password_reg").val();
 	 	var user=$("#username_reg").val();
 	 	var email=$('#email_reg').val();
 	 	var pass2=$('#password2_reg').val();

		e.stopPropagation();
		e.preventDefault();

 	 	if(user==""){
 	 		alert("Username cannot be blank.");
 	 	}else if(pass==""){
 	 		alert("Password cannot be blank.");
 	 	}else if(pass!=pass2){
 	 		alert("The password you typed in twice does not match.");
 	 	} else if (user.includes("&") || user.includes("=") || user.includes("<") ||
 	 			user.includes(">") || user.includes("+") || user.includes(",")){
			alert("Username has invalid character.");
 	 	} else if (pass.length < 6){
 	 		alert("Password must contain at least 6 characters.");
 	 	} else if (!(/[a-z]/).test(pass)){
 	 		alert("Password must include one character from a-z.");
 	 	} else if (!(/[0-9]/).test(pass)){
			alert("Password must include one digital number.");
 	 	} else if (!email.includes("@")){
 	 		alert("Email address is not valid.");
 	 	} else if (user.includes(" ")|| pass.includes(" ")){
 	 		alert("Username and password cannot contain white space.");
 	 	}
 	 	else{
		$.ajax('../Back-End/register.php?action=register&email='+email+
			"&user="+user+"&pass="+pass,
		       {type: 'POST',
		        //url: "../Back-End/login.php?action=login", 
		        //data: {"action":"login","user":user,"pass":pass}, 
		       	datatype: "json",
				cache: false,
	        	success: function(json){ 
	            if(json==0){//regi success
	                alert("Successfully registered");
	                 $("#backbutton").click();
	            }else if(json==1){//email redundent
	            	alert("Email Already Exists");
	            }else if(json==2){//username redundent
	            	alert("Username Already Exists");
	            }else if(json==3){//both username and email are redundent
	            	alert("Jackpot! Both Email and Username already exist");
	            }else if(json==4){//database didn't add this user for some reason
	            	alert("OOPS...Database didn't add you for some reason");
	            }else if(json==5){//database didn't add this user for some reason
	            	alert("Undefined Scenario(For development usage only, can be deleted)");
	            }else if(json=="e"){//database didn't add this user for some reason
	            	alert("path_component one is empty");
	            }
		       }});
		}
    }); 
	// $('#register_form').on('submit',function(e){
	// 	alert("hahah");
	// });

});


 
$(document).keypress(function(e) {
    if(e.which == 13) {
         $("#register").click();
         document.getElementById("username_reg").value= "";
         document.getElementById("email_reg").value= "";
         document.getElementById("password_reg").value= "";
         document.getElementById("password2_reg").value= "";
    }
});