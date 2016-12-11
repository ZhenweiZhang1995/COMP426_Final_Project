 $(document).ready(function () {
 	if(getCookie("username")!=""){
 		nav_login(getCookie("username"));
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
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/Courses/comp426-f16/users;domain=wwwp.cs.unc.edu";
		document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/Courses/comp426-f16/users;domain=wwwp.cs.unc.edu";
		location.reload(true);
 	 });
});

var nav_login=function(username){
	$('#user_nav').empty();
	$('#user_nav').append(
		'<li><a href="account.html">Hi, '+username+'</a></li>'+
		'<li><a href="post.html">Post My Skill</a></li>'+
		'<li><a href="cart.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Shopping Cart</a></li>'+
		'<li id="logout_button"><a href="index.html">Sign out</a></li>'
		);
	$('#login_close').click();
};

var nav_logout=function(){
	$('#user_nav').empty();
	$('#user_nav').append(
		'<li><a href="cart.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Shopping Cart</a></li>'+
		'<li><a id="nav_register_button" href="#modal">Sign in</a></li>'
		);
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}



// $(document).keypress(function(e) {
//     if(e.which == 13) {
//         $("#sign_in").click();
//         document.getElementById("username_login").value= "";
//         document.getElementById("password_login").value= "";
//     }
// });
