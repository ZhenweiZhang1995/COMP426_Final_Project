 $(document).ready(function () {
 	 $('#login_form').on('submit', function (e) {
 	 	var pass=$("#password").val();
 	 	var user=$("#username").val();
		e.stopPropagation();
		e.preventDefault();
		$.ajax('../Back-End/login.php?action=login&user='+user+"&pass="+pass,
		       {type: 'GET',
		        //url: "../Back-End/login.php?action=login", 
		        //data: {"action":"login","user":user,"pass":pass}, 
		       	datatype: "json",
				cache: false,
	        success: function(json){ 
	            if(json.success==1){ 
	                alert("log in success");
	            }else{alert("fuck off");}
		       }});


    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    }); 
    
    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    }); 
});
});