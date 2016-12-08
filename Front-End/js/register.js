 $(document).ready(function () {
 	 $('#register').on('click', function (e) {

 	 	var pass=$("#password_reg").val();
 	 	var user=$("#username_reg").val();
 	 	var email=$('#email_reg').val();
 	 	var pass2=$('#password2_reg').val();

		e.stopPropagation();
		e.preventDefault();

 	 	if(user==""){
 	 		alert("username please.");
 	 	}else if(pass==""){
 	 		alert("password please.");
 	 	}else if(pass!=pass2){
 	 		alert("consistency please");
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