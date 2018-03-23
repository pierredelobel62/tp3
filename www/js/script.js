$(document).ready(function(){
	$('#menu').click(function(){
		
		if($('nav').css("display") == "block"){
			$('nav').css("display","none");
		}else{
			$('nav').css("display","block");
		}
	});
});