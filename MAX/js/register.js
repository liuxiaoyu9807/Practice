
class Reg{
	constructor(){
		this.init()
	}
	init(){
			var aValidate = [false,false,false,false,false];
			$("#phone").blur(function(){
				var reg = 	/^[0-9]{11}$/
				if(reg.test($("#phone").val())){
					$("#phone").className = "success";
					$("#phone").next().html("");
					aValidate[0] = true;
				}else{
					$("#phone").className = "error";
					$("#phone").next().html("请输入正确的手机号格式（11位数字）");
					aValidate[0] = false;
				}
			})
			$("#name").blur(function(){
				console.log(1)
				var reg = /^[a-z0-9_\-\u4e00-\u9fa5]{4,20}$/gi;
				if(reg.test($("#name").val())){
					$("#name").className = "success";
					$("#name").next().html("");
					aValidate[1] = true;
				}else{
					$("#name").className = "error";
					$("#name").next().html("支持中文、字母、数字、“-”“_”的组合，4-20个字符");
					aValidate[1] = false;
				}
			})
			$("#pass").blur(function(){
				var reg = /^[^\\*\u4e00-\u9fa5]{6,20}$/
				if(reg.test($("#pass").val())){
					var mark = 0;
					var hasNum = /\d/g
					if(hasNum.test($("#pass").val())){
						mark++;
					}
					var hasLetter = /[a-z]/gi
					if(hasLetter.test($("#pass").val())){
						mark++;
					}
					var hasSymbol = /[!@#\$%\^\.]/g
					if(hasSymbol.test($("#pass").val())){
						mark++;
					}
					switch(mark){
						case 1:
						$("#pass").css({
							border:"2px solid #f10"
						});
						$("#pass").next().html("密码安全度低,建议使用组合密码!");
						break;
						case 2:
						$("#pass").css({
							border:"2px solid yellow"
						});
						$("#pass").next().html( "密码安全度中,建议使用组合密码!");
						break;
						case 3:
						$("#pass").css({
							border:"2px solid green"
						});
						$("#pass").next().html("密码安全度高,请小心保存密码");
		
						setTimeout(function(){
							$("#pass").next().html("");
						}, 1000);
					}
					$("#pass").className = "";
					aValidate[2] = true;
				}else{
					$("#pass").className = "error";
					$("#pass").css({
						border:"1px solid #000"
					});
					$("#pass").next().html("仅可使用数字、字母及!@#$%^等特殊符号(6~20位)");
					aValidate[2] = false;
				}
			})
		
			$("#repass").blur(function(){
		
				if($(this).value == $("#pass").value){
					//正确
					$(this).css({
						border:"1px solid #ddd"
					});
					$("#pass").css({
						border:"1px solid #ddd"
					});
		
					$("this").next().html("")
		
					aValidate[3] = true;
				}else{
					//错误;
					$(this).css({
						border:"2px solid red"
					});
					$(this).next().html("密码输入不一致");
					$("#pass").css({
						border:"2px solid red"
					});
					aValidate[3] = false;
				}
			})
			$("#conf").change(function(){
				if ($(this)[0].checked == true) {
					aValidate[4] = true;
				} else{
					aValidate[4] = false;
				}
			})
			
			
		
			$("#submit").click(function(){
				var isAllValidate = false;
				var ischeck = 0;
				for(var i = 0 ; i < aValidate.length ; i++){
					if(aValidate[i] == false){
						alert("您提交的信息有误，请重新输入并确认提交")
						break;
					}else{
						ischeck++
					}
				}
				if (ischeck == 5) {
					$.ajax({
						url:"http://www.liyangyf.com/ctrl/register.php",
						type:"GET",
						data:{
							name: $("#name").val(),
							tel: $("#phone").val(),
							pass: $("#pass").val(),
						},
						success:function(a,b,c){
//								console.log(a);
//								console.log(b);
//								console.log(c);
							
							switch(a){
								case "0":
									alert("您输入的手机号已被注册");
									location.reload();
									break;
								case "1":
									alert("注册成功");
									location.href = "land.html";
									break;
								case "2":
									alert("注册信息填写不全，请重新注册");
									break;
							}
						}
					})
				}
			})
	}
}

class Submit{
	constructor(){
		this.true = true;
		this.init()
	}
	init(){
		let that = this;
		$("#submit").click(function(){
			if ($(".error").html() == undefined && $("#phone").val()!=null && $("#name").val()!=null && $("#pass").val()!=null && $("#repass").val()!=null && $("#conf")[0].checked == true) {
				that.true = true;
				
				$.ajax({
					url:"http://www.liyangyf.com/ctrl/register.php",
					type:"GET",
					data:{
						name: $("#name").val(),
						tel: $("#phone").val(),
						pass: $("#pass").val(),
					},
					success:function(a,b,c){
						console.log(a);
						console.log(b);
						console.log(c);
						
						switch(a){
							case "0":
								alert("您输入的手机号已被注册");
								location.reload();
								break;
							case "1":
								alert("注册成功");
								location.href = "http://127.0.0.1/project-nangua/other/login.html";
								break;
							case "2":
								alert("注册信息填写不全，请重新注册");
								break;
						}
					}
				})
			} else{
				that.true = false;
				alert("注册信息输入有误，请重新注册")
			}
			if ($("#phone").val()==null || $("#name").val()==null || $("#pass").val()==null || $("#repass").val()==null) {

			}
			
		})
	}
}

window.onload = function(){	
	new Reg();
}