// JavaScript Document
$(document).ready(function(){
	$(".listbig .listcon").each(function(){
		$(this).hide();
		});
	$(".presslist li").click(function(){
		numa=$(this).index();
		$(".listcon").eq(numa).show().siblings(".listcon").hide();
		});
	$(".listtit strong").click(function(){
		$(".listcon").hide();
		});
		
	$(".bansma span").each(function(){
		$(this).find("a img").eq(0).show().siblings("img").hide();
		$(this).mouseover(function(){
			$(this).find("a img").eq(1).show().siblings("img").hide();
			}).mouseout(function(){
				$(this).find("a img").eq(0).show().siblings("img").hide();
				});
		});
		
		
	/*导航*/
	$(".nav>li").mouseover(function(){
		names=$(this).attr("name");
		$(".topright").find("."+names).fadeIn().siblings(".subnav").hide();
		offset=$(".nav").offset();
		$("."+names).css({"top":(offset.top+22)+"px","left":(offset.left+14)+"px"});
		
	}).mouseout(function(){
		names=$(this).attr("name");
		$(".topright").find("."+names).hide();
		
		$(".topright").find("."+names).mouseover(function(){
			$(this).show();
			}).mouseout(function(){
			namess=$(".current").attr("name");
				$(this).hide();
				
			namess=$(".current").attr("name");
			$(".topright").find("."+namess).show().siblings(".subnav").hide();
			
				});
			
			namess=$(".current").attr("name");
			$(".topright").find("."+namess).show().siblings(".subnav").hide();
			
		});
	
	
		
	/*导航*/
	$(".nav>li").mouseover(function(){
		names=$(this).attr("name");
		$(".topright2").find("."+names).fadeIn().siblings(".subnav").hide();
		offset=$(".nav").offset();
		$("."+names).css({"top":(offset.top+22)+"px","left":(offset.left+14)+"px"});
	});
	
	/*导航*/
	$(".nav2>li").mouseover(function(){
		names=$(this).attr("name");
		$(".topright").find("."+names).fadeIn("slow").siblings(".subnav").hide();
		offset=$(".nav2").offset();
		$("."+names).css({"top":(offset.top+24)+"px","left":(offset.left+19)+"px"});
		
	});
		
	/*导航*/
	$(".nav2>li").mouseover(function(){
		names=$(this).attr("name");
		$(".topright2").find("."+names).fadeIn("slow").siblings(".subnav").hide();
		offset=$(".nav2").offset();
		$("."+names).css({"top":(offset.top+24)+"px","left":(offset.left+19)+"px"});
	});
	
	$(".spansa2 span").eq(0).addClass("current");
	$(".banimga img").eq(0).show().siblings("img").hide();
	$(".spansa2 span").click(function(){
		numxx=$(this).index();
		$(this).addClass("current").siblings("span").removeClass("current");
		$(".banimga img").eq(numxx).fadeIn("slow").siblings("img").fadeOut("slow");
		});
		
		setInterval(function(){
		var a=$(".spansa2 .current").index();
		var b=$(".spansa2 span:last").index();
		if(a==b){
			$(".spansa2 span").eq(0).trigger("click");
			}
			$(".spansa2 span").eq(a+1).trigger("click");
	},6000);
	
	
});


