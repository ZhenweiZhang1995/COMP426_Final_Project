//var designers = $('#brands');
$(document).ready(function (){
	load_product();
	// $("#product_button").on('click',function(e){
	// 	load_product();
	// });
});
// 	$("#search-product-btn").on('click',function(e) {
// 		var target = $('#search-product').val();
// 	$.ajax('../server-side/Designer_controller.php?search='+target,
//   		{async: false,
//   		type: "GET",
//  		  dataType: "json",
//  		  success: function(designer_json) {
//  		  	 if (designer_json.found == true) {
//  		  	 	$('#search-result').empty();
// 				$('#search-result').append('<div class="col-md-4"></div><div class="col-md-4 col-sm-6 portfolio-item">'+
//                     '<a href="#designer'+designer_json.D_id+'" class="portfolio-link" data-toggle="modal">'+
//                         '<div class="portfolio-hover">'+
// '                            <div class="portfolio-hover-content">'+
//                                 '<i class="fa fa-th" aria-hidden="true"></i>'+
//                             '</div>'+
//                         '</div>'+
//                         '<img src="img/preview/'+designer_json.preview+'" class="img-responsive" alt="">'+
//                     '</a>'+
//                     '<div class="portfolio-caption">'+
//                         '<h4>'+designer_json.Name+'</h4>'+
//                         '<p class="text-muted">'+designer_json.Birthplace+'</p>'+
//                     '</div>'+
//                 '</div><div class="col-md-4"></div>'
// 					);
// 				$('#content').append(    
// 					'<div class="portfolio-modal modal fade" id="designer'+designer_json.D_id+'" tabindex="-1" role="dialog" aria-hidden="true">'+
//         '<div class="modal-dialog"><div class="modal-content"><div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl">'+
//                        ' </div></div></div>'+
//                 '<div class="container">'+
//                     '<div class="row">'+
//                         '<div class="col-lg-8 col-lg-offset-2">'+
//                             '<div class="modal-body">'+

//                                 '<h2>'+designer_json.Name+'</h2>'+
// '<p class="item-intro text-muted">Birth Day: '+designer_json.Birthday+'</p >'+
// '<p class="item-intro text-muted">Birthplace: '+designer_json.Birthplace+'</p >'+
// '<img class="img-responsive img-centered" src="'+designer_json.profile_path+'" alt="img">'+
// '<p>'+designer_json.About+'</p >'+
// '<p class="item-intro text-muted">Website: <a target="_blank" href="'+designer_json.Website+'">'+designer_json.Name+'</a></p >'+
//                                 '<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Close </button>'+
//                             '</div></div></div></div></div></div></div>'
//                             );
//  		  	 }else{
//  		  	 	$('#search-result').empty();
//  		  	 	$('#search-result').append('<p class="item-intro text-muted">Sorry, no such designer found.</p>');
//  		  	 }				
// 			}	
//       });
// 	});
// 	$('#search-designer-btn').on('click',function(e) {

// 	});
// });

var load_product = function(){
	var products = $('#products');
	products.empty();
	$.ajax('../Back-End/product.php/product',
	      { async: false,
	      	type: "GET",
		    dataType: "json",
		      success: function(product_ids) {
		      	for (var i=0; i<product_ids.length; i++) {
			   			load_product_info(product_ids[i]);
		      	}
		      	//load_info(1);
		      } 
	      });
};

var load_product_info=function(id){
	  $.ajax('../Back-End/product.php/product/'+id,
  		{async: false,
  		type: "GET",
 		  dataType: "json",
 		  success: function(product_json) {
				$('#products').append('<div class="col-lg-4 col-sm-6">'+
                    '<a href=" " class="portfolio-box">'+
                        '<img style="width:600px;height:300px" src="img/product/'+product_json.pic_path+'" class="img-responsive" alt="img">'+
                        '<div class="portfolio-box-caption">'+
                            '<div class="portfolio-box-caption-content">'+
                                '<div class="project-category text-faded">'+
                                    product_json.product_name+
                                '</div>'+
                                '<div class="project-name">Price: $'+
                                   product_json.price+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</a >'+
                '</div>');
			}


      });
    };


