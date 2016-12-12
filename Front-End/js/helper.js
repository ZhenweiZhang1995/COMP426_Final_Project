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

function deleteCookie(){
	 	e.stopPropagation();
		e.preventDefault();
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/Courses/comp426-f16/users;domain=wwwp.cs.unc.edu";
		document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/Courses/comp426-f16/users;domain=wwwp.cs.unc.edu";
		location.reload(true);
}