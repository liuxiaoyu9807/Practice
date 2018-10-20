//get方式请求和发送，数据是可选，自带时间戳

//getAjax(url,{
//	此处写要传的参数，为键值对的格式
//}).then(function(res){
//	请求成功之后，数据被此函数带出
//})

function getAjax(url,data){
	var p = new Promise(function(success){
		var d = new Date()
		var str = ""
		for(var i in data){
			str = str + i + "=" + data[i] +"&"
		}
		url = url + "?" + str + "_t="+d.getTime();
		var ajax = new XMLHttpRequest();
		ajax.open("GET",url,true)
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}
		}
		ajax.send(null);
	})
	return p;
}
//post方式请求和发送，数据是可选，自带时间戳

//postAjax(url,{
//	此处写要传的参数，为键值对的格式
//}).then(function(res){
//	请求成功之后，数据被此函数带出
//})

function postAjax(url,data){
	var p = new Promise(function(callback){
		if(data){
			var str = ""
			for(var i in data){
				str = str + i + "=" + data[i] + "&"
			}
			data = str.slice(0,str.length-1);
		}else{
			data = null;
		}
		
		var d = new Date()
		url = url + "?_t="+d.getTime();
		
		var ajax = new XMLHttpRequest();
		ajax.open("POST",url)
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				callback(ajax.responseText)
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	})
	return p;
}

//jsonp方式请求和发送，数据是可选，自带时间戳

//jsonp(url,{
//	此处写要传的参数，为键值对的格式，有两个必传参数：如下
//		后台接收的字段名：随意的字符,
//		_fnName：后台接收的字段名
//}).then(function(res){
//	请求成功之后，数据被此函数带出
//})
function jsonp(url,data){
	var p = new Promise(function(callback){
		var str = ""
		for(var i in data){
			str = str + i + "=" + data[i] + "&"
		}
		url = url + "?" + str;
		
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
		
		window[data[data._fnName]] = function(res){
			callback(res);
		}
	})
	return p;
}