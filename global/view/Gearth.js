var ge;
var gex;
var max;
var min;
google.load('earth','1');
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
				color: gex.util.blendColors('green', 'red', (val-min)/(max-min))
			}
		}
	});
}
addGexPolygon=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var col = record.get('color');
	var step = 5;
	var placemark = gex.dom.addPlacemark({
		name:"",
		description:"大气密度分布:<br>经度:"+lat+"<br>纬度:"+lon+"<br>高度:"+alt+"<br>大气密度:"+val,
		point:[lat,lon],
		polygon: [
			[lat-step/2,lon-step/2],
			[lat-step/2,lon+step/2],
			[lat+step/2,lon+step/2],
			[lat+step/2,lon-step/2]
		],
		style: {
			line: { width: 0, color: '#ff0' },
			poly: { color: gex.util.blendColors('green', 'red', (val-min)/(max-min)), opacity: 0.35 }
		},
		icon:{
			stockIcon: 'paddle/wht-blank',
			color: gex.util.blendColors('green', 'red', (val-min)/(max-min))
		}
	});
}
Ext.app.earthStore=new Ext.data.XmlStore({
	proxy: new Ext.data.HttpProxy({url: 'test.xml'}),
	record: 'result',
	id: 'id',
	fields:[{name:'id',type:'int'},{name:'lat',type:'double'},{name:'long',type:'double'},{name:'alt',type:'double'},{name:'color',type:'string'},{name:'value',type:'double'}],
	totalProperty: 'count',
	listeners: {
		load: function(store,records,options){
			//var features = ge.getFeatures();
			//while (features.getFirstChild()) features.removeChild(features.getFirstChild());
			store.sort('value', 'DESC');
			max=store.getAt(0).get('value');
			min=store.getAt(store.getTotalCount()-1).get('value');
			gex.dom.clearFeatures();
			Ext.each(records,addGexPolygon);
			//Ext.each(records,addGexPoint);
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
