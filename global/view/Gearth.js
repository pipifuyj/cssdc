var ge,gex,max,min;
google.load('earth','1');
/*
addPolygon=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var col = record.get('color');
	var step = 5;

	var mark=ge.createPlacemark('');
	var polygon = ge.createPolygon('');
	mark.setGeometry(polygon);
	var outer = ge.createLinearRing('');
	polygon.setOuterBoundary(outer);
	var coords = outer.getCoordinates();
	coords.pushLatLngAlt(lat - step/2, lon - step/2, alt);
	coords.pushLatLngAlt(lat - step/2, lon + step/2, alt);
	coords.pushLatLngAlt(lat + step/2, lon + step/2, alt);
	coords.pushLatLngAlt(lat + step/2, lon - step/2, alt);
	var color = Math.round((val-0)*256*256*256/(1000-0)).toString(16);
	while(color.length<6) color = "0"+color;
	color="F0"+color;
	mark.setName("Lat:"+lat+"Long:"+lon+"alt:"+alt+"col:"+color);
	mark.setDescription('value:'+val);

	if (!mark.getStyleSelector()) {
		mark.setStyleSelector(ge.createStyle(''));
	}
	mark.getStyleSelector().getPolyStyle().getColor().set(color);
	ge.getFeatures().appendChild(mark);
}
addPoint=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var col = record.get('color');
	var mark=ge.createPlacemark('');
	var point = ge.createPoint('');
	point.setLatitude(lat);
	point.setLongitude(lon);
	point.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
	point.setAltitude(alt);
	mark.setGeometry(point);
	mark.setName("Lat:"+lat+"Long:"+lon+"alt:"+alt);
	mark.setDescription('value:'+val);
	ge.getFeatures().appendChild(mark);
}
addGexPoint=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var col = record.get('color');
	gex.dom.addPointPlacemark([lat,lon,alt], {
		name: col+" "+(val-min)/(max-min),
		style:{
			icon:{
				stockIcon: 'paddle/wht-blank',
				color: gex.util.blendColors('blue', 'red', (val-min)/(max-min))
			}
		}
	});
}
*/
addGexPolygon=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var step = 5;
	var desp = "经度:"+lon+"纬度:"+lat+"海拔高度:"+alt+"大气密度:"+val; 
	//alert(desp);

	var mid =  min+(max-min)/3; 
	if(val < mid) var mycolor=gex.util.blendColors('aqua', 'yellow', (val-min)/(mid-min));
	else  var mycolor=gex.util.blendColors('yellow', 'red', (val-mid)/(max-mid));

	var lon1,lon2,lat1,lat2;
/*
	if(lon==180) {lon1=lon-step/2;lon2=lon+step/2-360;}
	else if(lon==-180) {lon1=lon-step/2+360;lon2=lon+step/2;}
	else {lon1=lon-step/2;lon2=lon+step/2;}
	if(lat==90) {lat1=lat-step/2;lat2=lat;}
	else if(lat=-90) {lat1=lat; lat2=lat+step/2;}
	else {lat1=lat-step/2;lat2=lat+step/2;}
*/
	lon1=lon-step/2;
	lon2=lon+step/2;
	lat1=lat-step/2;
	lat2=lat+step/2;
	gex.dom.addPlacemark({
		name:"大气密度分布",
		description:desp,
		polygon: [
			[lat1,lon1],
			[lat1,lon2],
			[lat2,lon2],
			[lat2,lon1]
		],
		style: {
			line: { width: 0, color: '#ff0' },
			poly: { color: mycolor, opacity: 1} 
		}
	});
}
Ext.app.earthStore=new Ext.data.XmlStore({
	proxy: new Ext.data.HttpProxy({url: 'test7.xml'}),
	record: 'result',
	id: 'id',
	fields:[
		{name:'id',type:'int'},
		{name:'lat',type:'float'},
		{name:'long',type:'float'},
		{name:'alt',type:'float'},
		{name:'color',type:'string'},
		{name:'value',type:'float'}
	],
	totalProperty: 'count',
	listeners: {
		load: function(store,records,options){
			store.sort('value', 'DESC');
			max=parseFloat(store.getAt(0).get('value'));
			min=parseFloat(store.getAt(store.getTotalCount()-1).get('value'));
			gex.dom.clearFeatures();
			Ext.each(records,addGexPolygon);
	    }
	}
});
Ext.onReady(function(){
	google.earth.createInstance('map3d',function(instance){
		ge=instance;
		ge.getWindow().setVisibility(true);
		ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
		ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
		ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
		ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, false);
		gex = new GEarthExtensions(instance);
	},function(code){
	});
	Ext.EventManager.on("submit","click",function(e,t,o){
		Ext.app.earthStore.load();
		e.stopEvent();
	});
});

