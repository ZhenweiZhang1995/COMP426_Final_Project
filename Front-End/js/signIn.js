 $(document).ready(function () {
 	 $('#login_form').on('submit', function (e) {
 	 	var pass=$("#password").val();
 	 	var user=$("#username").val();
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
	                alert("log in success");
	            }else if(json.success==2){//未注册用户
	            	alert("register first");
	            }
	            else{alert("fuck off");}
		       }});
		}
    }); 
	$('#register_form').on('submit',function(e){
		alert("hahah");
	});

    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    }); 
    
    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    }); 

});