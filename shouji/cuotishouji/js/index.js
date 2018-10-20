
class Insert{
	constructor(){
		this.btn = document.getElementById("web-sub");
		this.name = document.getElementById("user-name");
		this.webname = document.getElementById("web-name");
		this.weburl = document.getElementById("web-url");
		this.cont = document.getElementById("cont");
		this.url = "http://localhost/wpcs/ctrl/insert.php";
		this.res = null;
		
		this.init();
		this.load();
	}
	load(){
		let that = this;
		getAjax(this.url).then(function(res){
			if(res == 2){
				alert("数据为空")
			}else{
				that.res = JSON.parse(res);
				that.display();
			}
		})
	}
	init(){
		let that = this;
			this.btn.onclick = function(){
				console.log(that);
					getAjax(that.url,{
						name:that.name.value,
						webname:that.webname.value,
						weburl:that.weburl.value
					}).then(function(res){
						if(res == 0){
							alert("插入失败");
						}else if(res == 2){
							alert("数据为空")
						}else{
							that.res = JSON.parse(res);
							that.display();
						}
					})
				that.name.value = null;
				that.webname.value = null;
				that.weburl.value = null;
			}
	}
	display(){
		let str = "";
		for(var i=page.num*page.index;i<page.num*page.index+page.num;i++){
			if(i < this.res.length){
				str += `<tr>
							<td>${this.res[i].id}</td>
							<td>${this.res[i].name}</td>
							<td>${this.res[i].webname}</td>
							<td>${this.res[i].weburl}</td>
							<td><span class="btn btn-info">删除</span></td>
							<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">修改</button></td>
						</tr>`
			}
		}
		this.cont.innerHTML = str;
		insert.name.value = null;
		insert.webname.value = null;
		insert.weburl.value = null;
	}
}

class Change{
	constructor(){
		this.btn = document.getElementById("web-sub");
		this.name = document.getElementById("user-name");
		this.webname = document.getElementById("web-name");
		this.weburl = document.getElementById("web-url");
		this.cont = document.getElementById("cont");
		this.url = "http://localhost/wpcs/ctrl/delete.php";
		this.url2 = "http://localhost/wpcs/ctrl/change.php";
		this.init();
	}
	init(){
		let that = this;
			this.cont.onclick = function(eve){
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if (target.nodeName == "SPAN") {
					
					getAjax(that.url,{
						id:target.parentNode.parentNode.children[0].innerHTML
					}).then(function(res){
						if(res == 0){
							alert("插入失败");
						}else if(res == 2){
							alert("数据为空")
						}else{
							that.res = JSON.parse(res);
							that.display();
						}
					})
				}
				if (target.nodeName == "BUTTON") {
					that.name.value = target.parentNode.parentNode.children[1].innerHTML;
					that.webname.value = target.parentNode.parentNode.children[2].innerHTML;
					that.weburl.value = target.parentNode.parentNode.children[3].innerHTML;
					that.btn.onclick = function(){
						getAjax(that.url2,{
							id:target.parentNode.parentNode.children[0].innerHTML,
							name:insert.name.value,
							webname:insert.webname.value,
							weburl:insert.weburl.value
						}).then(function(res){
							if(res == 0){
								alert("修改失败");
							}else if(res == 2){
								alert("数据为空")
							}else{
								that.res = JSON.parse(res);
								that.display();
								insert.init();
								that.name.value = null;
								that.webname.value = null;
								that.weburl.value = null;
							}
						});
					}
					
				}
			}
	}
	display(){
		let str = "";
		for(var i=page.num*page.index;i<page.num*page.index+page.num;i++){
			if(i < this.res.length){
				str += `<tr>
							<td>${this.res[i].id}</td>
							<td>${this.res[i].name}</td>
							<td>${this.res[i].webname}</td>
							<td>${this.res[i].weburl}</td>
							<td><span class="btn btn-info">删除</span></td>
							<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">修改</button></td>
						</tr>`
			}
		}
		this.cont.innerHTML = str;
	}
}

class Page{
	constructor(options){
		this.num = options.num;
		this.cont = options.cont;
		this.page = options.page;
		this.left = options.left;
		this.right = options.right;
		this.url = options.url;
		this.index = 0;
		this.load()
		this.init()
		
	}
	load(){
		var that = this;
		getAjax(this.url).then(function(res){
			if(res == 2){
				alert("数据为空")
			}else{
				that.res = JSON.parse(res);
				that.display();
				
				that.createPage();
			}
		})
	}
	display(){
		let str = "";
		for(var i=this.num*this.index;i<this.num*this.index+this.num;i++){
			if(i < this.res.length){
				str += `<tr>
							<td>${this.res[i].id}</td>
							<td>${this.res[i].name}</td>
							<td>${this.res[i].webname}</td>
							<td>${this.res[i].weburl}</td>
							<td><span class="btn btn-info">删除</span></td>
							<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">修改</button></td>
						</tr>`
			}
		}
		this.cont.innerHTML = str;
		insert.name.value = null;
		insert.webname.value = null;
		insert.weburl.value = null;
	}
	createPage(){
		this.maxNum = Math.ceil(this.res.length / this.num);
		let str = ""
		for(var i=0;i<this.maxNum;i++){
			str += `<li>${i+1}</li>`
		}
		this.page.innerHTML = str;
		this.changeActive();
	}
	changeActive(){
		var ali = this.page.children
		for(var i=0;i<ali.length;i++){
			ali[i].className = "";
		}
		ali[this.index].className = "active";
	}
	init(){
		var that = this;
		this.right.onclick = function(){
			if(that.index == that.maxNum-1){
				that.index = 0;
			}else{
				that.index++
			}
			that.changeActive()
			that.load();
		}
		this.left.onclick = function(){
			if(that.index == 0){
				that.index = that.maxNum-1;
			}else{
				that.index--
			}
			that.changeActive()
			that.load();
		}
	}
}





var insert = new Insert();
var change = new Change();

var page =  new Page({
		num:8,
		cont:insert.cont,
		page:document.getElementById("pageWarp").children[1],
		left:document.getElementById("btnL"),
		right:document.getElementById("btnR"),
		url:"http://localhost/wpcs/ctrl/display.php"
})