$(document).ready(function(){
	$.easing.def = "easeOutBounce";

	$('li.button a').click(function(e){
	
		var dropDown = $(this).parent().next();
		
		$('.dropdown').not(dropDown).slideUp('slow');
		dropDown.slideToggle('slow');
		
		e.preventDefault();
	})
	
});