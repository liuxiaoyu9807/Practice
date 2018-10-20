$(".nav").children("li").click(function(){
		$("html").animate({
			scrollTop:$("b").eq($(this).index()).offset().top
})

})
var oul=document.querySelector(".nav")
function ul(e){
	var scrollFunc = function (e) {  
                e = e || window.event;  
               
                    if (e.wheelDelta < 100) {   
                       oul.style.display="block";
                   
                    }  
                } 
            
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);  
            }  
            window.onmousewheel = document.onmousewheel = scrollFunc;
}
 ul()