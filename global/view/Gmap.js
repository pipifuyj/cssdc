function loadGMap(){     
//	if(GBrowserIsCompatible()){
		map=new GMap2(document.getElementById("Map"));
		map.addControl(new GSmallMapControl());
		map.addControl(new GMapTypeControl());
		map.addControl(new GScaleControl());
		map.addControl(new GOverviewMapControl());
		map.addControl(new GNavLabelControl());
//		map.enableScrollWheelZoom();
		var center=new GLatLng(39,116);
		map.setCenter(center,3);
		addMarkers();
//	}
}
function addMarkers(){
	GDownloadUrl("?Gmap",function(data){
		var xml=GXml.parse(data);
		var markers=xml.documentElement.getElementsByTagName("marker");
		for(var i=0;i<markers.length;i++){
			var shortname=markers[i].getAttribute("shortname");
			var name=markers[i].getAttribute("name");
			var group=markers[i].getAttribute("group");
			var pic=markers[i].getAttribute("pic");
			var point=new GLatLng(parseFloat(markers[i].getAttribute("lat")),parseFloat(markers[i].getAttribute("lng")));
			var marker=createMarker(point,name,shortname,group,pic);
			map.addOverlay(marker);
		}
	});
}
function getIcon(){
	var icon=new GIcon();
	icon.image="http://labs.google.com/ridefinder/images/mm_20_red.png"; 
	icon.shadow="http://labs.google.com/ridefinder/images/mm_20_shadow.png"; 
	icon.iconSize=new GSize(15,25);
	icon.iconAnchor=new GPoint(8,10);
	icon.infoWindowAnchor=new GPoint(10,10);
	return icon;
}
function createMarker(point,name,shortname,group,pic){
	var myIcon=getIcon();
	markerOptions={icon:myIcon};
	var marker=new GMarker(point,markerOptions);
	var html=""+
		"<div class='mapinfo'>"+
		"<span>Station:</span>"+name+"<br/>"+
		"<span>ShortName:</span>"+shortname+"<br/>"+
		"<span>Coordinate:</span>"+point+"<br/>"+
	"";
	if(group)html+="<span>Group:</span>"+group+"<br/>";
	if(pic)html+="<div class='mapimg'><img src='"+pic+"' border='0'/></div>";
	html+="</div>";
	GEvent.addListener(marker,'click',function(){
		marker.openInfoWindowHtml(html);
		Ext.app.filter('station',shortname);
		Ext.app.search();
	});
	GEvent.addListener(marker,"infowindowclose",function(){});
	return marker;
}
