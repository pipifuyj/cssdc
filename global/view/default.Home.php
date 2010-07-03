<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 TransitioNAl//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $this->title;?></title>
<script src="global/ext-3.2.1/adapter/ext/ext-base.js"></script>
<script src="global/ext-3.2.1/ext-all.js"></script>
<script src="global/view/app.template.js"></script>
<script src="global/view/app.js"></script>
<script src="global/view/default.js"></script>
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAA2hBy59OdKe0nHApjRsj0SRQZ1gBj0Uz7zCLWNIOHLzSuXaZBlxRwQOu3E8PccL--IbNFYppaY7o64Q" type="text/javascript"></script> 
<script src="global/view/Gmap.js"></script>  
<style>
@import url("global/ext-3.2.1/resources/css/ext-all.css");
@import url("global/view/app.template.css");
@import url("global/view/default.Home.css");
</style>
</head>
<body onLoad="loadGMap()">
<div id="all"><div id="maindv" class="maindv">
<?php require("Header.php");?>
<div id="Left"><?php require("Left.php");?></div>
<div id="Right"><div id="Center">
	<div id="mapbg" class="mapbg">
		<div class="maptp"></div>
		<div class="maplft"></div>
		<div id="Map" class="map"></div>
	</div>
	<div class="dotline"></div>
	<div class="rc">
		<div class="rc1">Restriction  Container:</div>
		<div class="rc2">
			<a id='RmallButton' href="javascript:void(0)">Clear</a>
			&nbsp;
			<a id='SearchButton' href="javascript:void(0)">Search</a>
		</div>
	</div>
	<div id="Filters" class="rc"><ul id="FilterUl"></ul></div>
	<div id="Result">Search Result</div>
	<div id="Sorts">
		<a sort='dsname' dir='ASC' href="javascript:void(0)"><img src="images/asc.jpg"></a>
		&nbsp;
		<a sort='dsname' dir='DESC' href="javascript:void(0)"><img src="images/desc.jpg"></a>
	</div>
	<br />
	<div id="Results"></div>
	<br />
	<div id="PagingToolbar"></div>
</div>
<div id="right"><?php require("Right.php");?></div>
<div style="height:10px;width:50px;clear:both;"></div>
</div>
<div id="Footer"><img src="images/Footer.jpg" /></div>        
</div></div>
</body></html>
