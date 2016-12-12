 $(document).ready(function () {
 	if(getCookie("username")!=""){
 		nav_login(getCookie("username"));
 		$('#modal_trigger').remove();
 	}
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
	                nav_login(getCookie("username"));
	                location.reload(true);

	            }else if(json.success==2){//未注册用户
	            	alert("Username not found!");
	            }
	            else{alert("Password incorrect!");}
		       }});
		}
    }); 
 	 //next part doesnt work
 	 $('#logout_button').on('click',function(e){
 	 	e.stopPropagation();
		e.preventDefault();
 	 	deleteCookie();
 	 });
});




// $(document).keypress(function(e) {
//     if(e.which == 13) {
//         $("#sign_in").click();
//         document.getElementById("username_login").value= "";
//         document.getElementById("password_login").value= "";
//     }
// });
