<script src="Scripts/tooltips.js"></script>
<link href="Scripts/dtree/dtree.css" rel="stylesheet" type="text/css" />
<script src="Scripts/dtree/dtree.js" type="text/javascript"></script>
<script>
Ext.onReady(function(){
	Ext.select(".clickmenu").on("click",function(e,t){
		var element=Ext.get(t).parent().down(".submenu");
		element.setStyle("display",element.isDisplayed()?"none":"block");
		Ext.select(".submenu").removeElement(element).setStyle("display","none");
	});
	Ext.select(".clicksubmenu").on("click",function(e,t){
		var element=Ext.get(t).parent().down(".submenu");
		element.setStyle("display",element.isDisplayed()?"none":"block");
		Ext.select(".submenu .submenu").removeElement(element).setStyle("display","none");
	});
    Ext.select(".clickmenu").item(0).fireEvent("click");
	Ext.select(".clicksubmenu").item(0).fireEvent("click");	
});
</script>
<!--ToopTip 开始-->
<style>
.tooltip {
    position:absolute; 
    width:350px; 
    color:#000; 
    visibility:hidden; 
    text-align:left; 
    vertical-align:top;
    z-index:3;
}
.tooltip table {
    background:#fff; 
    border:1px solid #666;
    padding:0px;
}
.tooltipHeader {
    border-bottom:1px solid #666;
    background:url('/images/tooltip/tooltip-bg.gif') repeat-x;
    padding-left:3px;
}
.textleft{text-align:left;font-size:12px;}
.textright{text-align:right;}
.textcontent{font-size:12px;text-align:left;padding:5px;}
.icon{display:inline; vertical-align:middle; border:0px;}
</style>
<div id="tooltipDiv" class="tooltip">
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th class="tooltipHeader textleft"><label id="tooltipTitle" style="font-weight:bold">Title</label></th>
            <th class="tooltipHeader textright"><a href="#" onMouseDown="return hideTooltip(true)"><img src="images/tooltip/close-icon.gif" class="icon"/></a></th>
        </tr>
        <tr><td colspan="2" class="textcontent"><label id="tooltipText">Text</label></td></tr>
    </table>
</div>
        <div id="tooltipHoverDiv" class="tooltip">
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th class="tooltipHeader textleft"><label id="tooltipHoverTitle" style="font-weight:bold">Title</label></th>
        </tr>
        <tr><td class="textcontent"><label id="tooltipHoverText">Text</label></td></tr>
    </table>
</div>
<!--ToopTip 结束-->
<style>@import url('/global/view/Left.css');</style>
<div id="userPanel" class="panel">
	<img src="images/hp_07.gif" class='title'>
<!--	<form action="" method="post">
	Username&nbsp;<input type="text" class="input"><br>
	Password&nbsp;<input type="password" class="input"><br>
	<input type="submit" value="Login" class="button"/>
	</form>--->
	<div class="line"></div>
	<div>
		<?php echo '<a href="http://auth.csdb.cn/login?service='.urlencode("http://www.cssdc.com/?default=Index").'" target="_self">Login</a>';?>
		<a href="http://auth.csdb.cn/reg01.jsp" target="_blank">Registration</a>
		<a href="#" target="_blank">Forgot your password ?</a> 
	</div>
</div>
<div id="keywordsPanel" class="panel">
	<img src="images/hp_18.gif" class='title'>
	<div>
		<input id="keywords" type="text" class="input" />
		<div><input id="keywordsButton" type="button" class="button" value="Add" /></div>
	</div>
</div>
<div id="DatePanel" class="panel">
	<img src="images/hp_20.gif" class='title'>
	<div>
		<label>From:</label><input id="DateFrom" type="text" class="input" />
		<label>To:</label><input id="DateTo" type="text" class="input" />
		<div><input id="DateButton" type="button" class="button" value="Add" /></div>
	</div>
</div>
<div class="menu1">
	<img src="images/hp_26.gif" class="clickmenu">
	<br />
	<div class="submenu">
		<div class="menu2">
			<img src="images/instrument.gif" class="clicksubmenu">
			<br>
			<div class="submenu leftmenutext">
				<ul id="EquipTree" field="equip">
				<?php
				foreach($this->equipDic as $index=>$equip){
					$name=$equip->name;
					echo "<li><img src='images/trans_icon.gif' alt='icon' class='icon'><a href=\"javascript:Ext.app.filter('equip','$name')\">$name</a>";
					$intro=str_replace("\r\n","",$equip->intro);
					if($intro)echo "<a href=\"#\" onclick=\"return keepTooltip('Equip_$index', 'Introduction', '$intro', event)\"><img src=\"images/tooltip/info-gray.gif\" class=\"icon\"/></a></li>";
				}
				?>
				</ul>
				<div style="height:8px; width:100px; float:left; overflow:hidden"></div>
			</div>
		</div>
		<div class="menu2">
			<img src="images/area.gif" class="clicksubmenu">
			<br>
			<div class="submenu">
				<script type="text/javascript">
				dDataTree1 = new dTree("dDataTree1","dtree_DataTree1","简介","dtreeStyle","-1");
				dDataTree1.config.inOrder = false;
				dDataTree1.config.useCheckBox = false;
				dDataTree1.config.useRelationParent = false;
				dDataTree1.add("0","-1","Area","javascript:void(0)","0");
				<?php
				foreach($this->areatree['title'] as $index=>$title){
				$name=$this->areatree['name'][$index];
				$intro=$this->areatree['intro'][$index];
				$id=$this->areatree['id'][$index];
				$pid=$this->areatree['pid'][$index];
				if($intro)echo "dDataTree1.add('$id','$pid','$title',\"javascript:Ext.app.filter('area','$name')\",'$id','Area_$id','Introduction','$intro');";
				else echo "dDataTree1.add('$id','$pid','$title',\"javascript:Ext.app.filter('area','$name')\",'$id','','','');";
				}
				?>
				document.write(dDataTree1);
				</script>
				<div style="height:8px; width:100px; float:left; overflow:hidden"></div>
			</div>
		</div>
		<div class="menu2">
			<img src="images/element.gif" class="clicksubmenu">
			<br>
			<div class="submenu leftmenutext">
				<ul id="ElemTree" field="element">
				<?php
				foreach($this->elemDic as $index=>$elem){
					$name=$elem->name;
					echo "<li><img src='images/trans_icon.gif' alt='icon' class='icon'><a href=\"javascript:Ext.app.filter('element','$name')\">$name</a>";
					$intro=str_replace("\n\r","",$elem->intro);
					if($intro)echo "<a href=\"#\" onclick=\"return keepTooltip('Element_$index', 'Introduction', '$intro', event)\"><img src=\"images/tooltip/info-gray.gif\" class=\"icon\"/></a></li></li>";
				}
				?>
				</ul>
				<div style="height:8px; width:100px; float:left; overflow:hidden"></div>
			</div>
		</div>
		<div class="menu2">
			<img src="images/satellite.gif" class="clicksubmenu">
			<br>
			<div class="submenu leftmenutext">
				<ul id="SaltTree" field="satellite">
				<?php
				foreach($this->satelliteDic as $index=>$satellite){
					$name=$satellite->shortname;
					echo "<li><img src='images/trans_icon.gif' alt='icon' class='icon'><a href=\"javascript:Ext.app.filter('satellite','$name')\">$name</a>";
					$intro=str_replace("\r\n","",$satellite->intro);
					if($intro)echo "<a href=\"#\" onclick=\"return keepTooltip('Satellite_$index', 'Introduction', '$intro', event)\"><img src=\"images/tooltip/info-gray.gif\" class=\"icon\"/></a></li></li>";
				}
				?>
				</ul>
				<div style="height:8px; width:100px; float:left; overflow:hidden"></div>
			</div>
		</div>
		<div class="menu2">
			<img src="images/station.gif" class="clicksubmenu">
			<br>
			<div class="submenu leftmenutext">
				<ul id="StationTree" field="station">
				<?php
				foreach($this->stationDic as $index=>$station){
					$shortname=$station->shortname;
					$fullname=$station->name;
					echo "<li><img src='images/trans_icon.gif' alt='icon' class='icon'><a href=\"javascript:Ext.app.filter('station','$shortname')\">$shortname</a>";
					$intro=str_replace("\r\n","",$station->intro);
					if($intro)echo "<a href=\"#\" onclick=\"return keepTooltip('Station_$index', 'Introduction', '$intro', event)\"><img src=\"images/tooltip/info-gray.gif\" class=\"icon\"/></a></li></li>";
				}
				?>
				</ul>
				<div style="height:8px; width:100px; float:left; overflow:hidden"></div>
			</div>
		</div>
	</div>
</div>
<div id="Subject" class="menu1">
	<img src="images/hp_33.gif" class="clickmenu">
	<br>
	<div class="submenu">
<script type="text/javascript">
dDataTree2 = new dTree("dDataTree2","dtree_DataTree2","简介","dtreeStyle","0");
dDataTree2.config.inOrder = false;
dDataTree2.config.useCheckBox = false;
dDataTree2.config.useRelationParent = false;
<?php
foreach($this->subtree['title'] as $index=>$title){
	$id=$this->subtree['id'][$index];
	$pid=$this->subtree['pid'][$index];
	if($pid=="1"){
		echo "dDataTree2.add('$id','$pid','$title',\"javascript:Ext.app.filter('subject','$id')\",'$id','','','','true');";	
	}else{
		echo "dDataTree2.add('$id','$pid','$title',\"javascript:Ext.app.filter('subject','$id')\",'$id','','','');";
	}
}
?>
document.write(dDataTree2);
</script>
		<div style="height:8px; width:100px; float:left; overflow:hidden"></div>
	</div>
</div>
<div class="menu4"><img src="images/hp_43.gif"></div>
<div class="menu5">
<a href="http://www.us-vo.org/">National Virtual Observatory</a>
<a href="http://vspo.gsfc.nasa.gov/websearch/dispatcher">Virtual Space Physics Observatory</a>
<a href="http://vmo.nasa.gov/">Virtual Magnetospheric Observatory</a>
<a href="http://vho.nasa.gov/">Virtual Heliospheric Observatory</a>
<a href="http://umbra.nascom.nasa.gov/vso/">Virtual Solar Observatory</a>
<a href="http://eu-datagrid.web.cern.ch/eu-datagrid/">Euro Data Grid</a>
<a href="http://www.nasaproracing.com/hpde/">HPDE</a>
<a href="http://ccmc.gsfc.nasa.gov/">CCMC</a>
<a href="http://cdaweb.gsfc.nasa.gov/cdaweb/">CDAWeb</a>
</div>
