/*二级菜单*/

$(".nal").find("ul").children("li").hover(function(){
	var a=$(this).index()
	$(".dp-MX").children("div").eq(a).css("display","block")
},function(){
	var a=$(this).index()
	$(".dp-MX").children("div").eq(a).css("display","none")
})