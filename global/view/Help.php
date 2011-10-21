<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 TransitioNAl//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title><?php echo $this->title;?></title>
		<script src="global/ext-3.2.1/adapter/ext/ext-base.js"></script>
		<script src="global/ext-3.2.1/ext-all.js"></script>
		<style>
			@import url("global/ext-3.2.1/resources/css/ext-all.css");
			@import url("global/view/Viewmore.css");
		</style>
	</head>
	<body><div id="body">
		<?php require("Header.php");?>
		<div id="main">
		<!--write down your content here-->
		<H1>Introduction</H1>
		<p>SSDG Space Science Data Grid provides a way to access the solar terrestrial space physics and planetary science data products, data services from different and distributed data nodes of Chinese Academy of Sciences，including Center for Space Science and Applied Research，Institute of Geology and Geophysics，National Astronomical Observatories and University of Science and Technology of China. The products registered in SSDG include: solar images, solar index, interplanetary magnetic field, particle flux, neutron count, geomagnetic indices, etc. </p>
		<p>The Data Product Finder presents a list of accessible datasets on the middle position of the home page. This list that can be reduced by adding query restrictions until the desired products are found. The initial list consists of all available products. The simplest way to shorten the list is to use the text search field. For example, adding one restriction - "ACE", Data Finder will reduce the list to browse datasets associated with ACE. 
		<p>Clicking the “Metadata” will bring up a window with detailed data product metadata. Clicking the “Document” will bring up a window with documentation and supplementary and ancillary information to assist in understanding and using the data products.</p>
		<p>It is also can add restrictions specific to a particular metadata element (such as "instrument", "element", "space region", etc). Select one of the restriction items. Active restrictions are listed in the " Restriction Container:" panel and can be removed by hitting the appropriate "remove" button.</p>
		<p>For convenience，we provide some useful data online service function, for example, reading, visualization, download and, associated data analysis and retrieval ,etc.</p>
		<p>We value your feedback and would like you to help us improve our data grid system. Please feel free to send us your suggestion and comments to our <a href="mailto:zhengyan@cssar.ac.cn">technical support engineer</a>.</p>
		<p>If you are Chinese user, you can use our please visit our <a href="http://drs.csdb.cn/index401Action.do?&customId=00053">SSDG </a> forum.</p>
		<H1><A NAME="Plugin">Plugin</A></H1>
		<p>To Install Space Science Data Grid Download Plugin, you should do as follows:</p>
		<p>1,Download the <a href="tool/downloadplugin.rar">plugin</a>.<br>2,Make the website as a trust url in your IE explorer.<br>3,Install the plugin under the guide of README in the RAR package.</p>
		<!--stop writing-->
		</div>
		<div id="Footer"><img src="images/Footer.jpg" /></div>
	</div></body>
</html>
