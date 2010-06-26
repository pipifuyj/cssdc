var ge,max,min;

google.load('earth','1');
addMark=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var desp = "经度:"+lon+"<br>纬度:"+lat+"<br>海拔高度:"+alt+"<br>大气密度:"+val; 
	var step = 5.0;

	var mid =  min+(max-min)/3; 
	if(val < mid) var mycolor=gex.util.blendColors('aqua', 'yellow', (val-min)/(mid-min));
	else  var mycolor=gex.util.blendColors('yellow', 'red', (val-mid)/(max-mid));
	
	var lat1,lat2,lon1,lon2;
	lat1=lat-step/2;
	lat2=lat+step/2;
	lon1=lon-step/2;
	lon2=lon+step/2;
	if(lat==180.0) lat2=360-lat2;
	if(lat==-180.0) lat1=360+lat1;

	var mark=ge.createPlacemark('');
	var polygon = ge.createPolygon('');
	mark.setGeometry(polygon);
	var outer = ge.createLinearRing('');
	polygon.setOuterBoundary(outer);
	var coords = outer.getCoordinates();
	coords.pushLatLngAlt(lat1, lon1, alt);
	coords.pushLatLngAlt(lat1, lon2, alt);
	coords.pushLatLngAlt(lat2, lon2, alt);
	coords.pushLatLngAlt(lat2, lon1, alt);
	mark.setName("大气密度分布");
	mark.setDescription(desp);

	if (!mark.getStyleSelector()) {
		mark.setStyleSelector(ge.createStyle(''));
	}
	mark.getStyleSelector().getPolyStyle().getColor().set(mycolor);
	mark.getStyleSelector().getLineStyle().setWidth(0);
	ge.getFeatures().appendChild(mark);
}
Ext.app.earthStore=new Ext.data.XmlStore({
	proxy: new Ext.data.HttpProxy({url: 'test7.xml'}),
	record: 'result',
	id: 'id',
	fields:[{name:'id',type:'int'},{name:'lat',type:'double'},{name:'long',type:'double'},{name:'alt',type:'double'},{name:'value',type:'double'}],
	totalProperty: 'count',
	listeners: {
		load: function(store,records,options){
			gex.dom.clearFeatures();
			store.sort('value', 'DESC');
			max=parseFloat(store.getAt(0).get('value'));
			min=parseFloat(store.getAt(store.getTotalCount()-1).get('value'));
			Ext.each(records,addMark);
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
