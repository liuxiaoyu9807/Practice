<?php
	include "mysql.php";
	
	$id = @$_REQUEST["id"];
	$name = @$_REQUEST["name"];
	$webname = @$_REQUEST["webname"];
	$weburl = @$_REQUEST["weburl"];
	
	
	if($id && $name && $webname && $weburl){
//		如果发了，表示，现在是在添加数据
		
		$q = mysql_query("UPDATE project SET name='$name',webname='$webname',weburl='$weburl' WHERE id=".$id);
		if($q){
//			如果设置数据成功，就再获取所有数据，准备返回给前端
			echo load();
		}else{
//			失败为0
			echo 0;
		}
	}else{
//		如果没发，表示，现在只是请求数据（刷新页面，或第一次打开）
		echo load();
	}
	
	function load(){
//		开关用来判断是否有数据，如果数据库为空，那么开关不会被打开
		$onOff = false;
		$data = "";
		$s = mysql_query("SELECT * FROM project");
//		如果数据库中有数据，while循环会执行
//		数据处理
		while($arr = mysql_fetch_assoc($s)){
			$data = $data.json_encode($arr).",";
//			有数据，将开关打开
			$onOff = true;
		}
//		判断开关状态
		if($onOff){
//			处理成前端的json格式
			$data = "[".substr($data,0,-1)."]";
			return $data;
		}else{
//			如果没有数据，返回2
			return 2;
		}
	}
?>