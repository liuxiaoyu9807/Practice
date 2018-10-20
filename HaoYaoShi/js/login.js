class Login{
	constructor(){
		this.init()
	}
	init(){
		let that = this;
		$("#login").click(function(){
				$.ajax({
					url:"http://www.liyangyf.com/ctrl/login.php",
					data:{
						user: $("#phone").val(),
						pass: $("#pass").val()
					},
					success:function(json){
						switch(json){
							case "0":
								alert("用户名密码不符");
								location.reload();
								break;
							case "1":
								alert("用户名密码为空");
								break;
							default:
								alert("登陆成功")
							location.href = "index.html";
								break;
						}
						
					}
				}) 
		})
	}
}

window.onload = function(){	
 new Login();
}