<?php
	header("Content-Type: text/html;charset=utf-8");
	
//	登录mysql
	$link = @mysql_connect("localhost:3306","root","159357");
	if(!$link){
		echo mysql_error();
	}
//	选择mysql中的数据库
	$db = @mysql_select_db("test1808");
	if(!$db){
		echo mysql_error();
	}
//	设置选择到的数据库的字符编码
	$utf = @mysql_query("set names utf8");
	if(!$utf){
		echo mysql_error();
	}
?>