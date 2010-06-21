<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 TransitioNAl//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title><?php echo $this->title;?></title>
		<script src="global/ext-3.2.1/adapter/ext/ext-base.js"></script>
		<script src="global/ext-3.2.1/ext-all.js"></script>
		<script src="global/view/app.template.js"></script>
		<script src="global/view/app.js"></script>
		<script src="global/view/Viewmore.js"></script>
		<style>
@import url("global/ext-3.2.1/resources/css/ext-all.css");
@import url("global/view/app.template.css");
@import url("global/view/Viewmore.css");
#PagingToolbar{
	float: left;
	width: 100%
}
.tpl-title{
	padding-top:50px;
	width:800px;
}
.tpl-info{
	width:800px;
}
.tpl-data{
	width:800px;
}
.tpl-tool{
	width:800px;
}
		</style>
		<script>
		<?php
			$filters=array('dataset'=>$_GET['dataset']);
			if($_GET['starttime'])$filters['starttime']=$_GET["starttime"];
			if($_GET['endtime'])$filters['endtime']=$_GET["endtime"];
			echo "Ext.apply(Ext.app.store.lastParams,".json_encode($filters).");";
		?>
		</script>
	</head>
	<body><div id="body">
		<?php require("Header.php");?>
		<div id="main">
			<div id="PagingToolbar"></div>
			<div id="Results">
				<ul></ul>
			</div>
		</div>
		<div id="Footer"><img src="images/Footer.jpg" /></div>
	</div></body>
</html>
