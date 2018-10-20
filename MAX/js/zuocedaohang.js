/*$(".toolbar>.heard_img>.tool-img").mouseenter(function(){
	console.log(1000);
	var a=$(this).index()
	$(".tool-tip").eq(a).css("display","block")
	console.log(a)
},function(){
	var a=$(this).index()
	/*$(".tool-tip").eq(a).css("display","none")*/
//})



$(function(){
        $(".toolbar>.heard_img>.tool-img").on({
          mouseover:function(){
            $(".tool-tip").css("display","block") ;
          } ,mouseout : function(){
           $(".tool-tip").css("display","none") ;	 
          } }) ; }) ;
/* $(function(){ 	
        $(".toolbar>.heard_img>.tool-img>.tool-tip").on({
          mouseout:function(){
            $(".tool-tip").css("display","none") ;
          } ,mouseout : function(){} }) ; }) ;*/