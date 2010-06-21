var ge;
google.load('earth','1');
addMark=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var mark=ge.createPlacemark('');
	var polygon = ge.createPolygon('');
	mark.setGeometry(polygon);
	var outer = ge.createLinearRing('');
	polygon.setOuterBoundary(outer);
	var coords = outer.getCoordinates();
	coords.pushLatLngAlt(lat - 2.5, lon - 2.5, alt);
	coords.pushLatLngAlt(lat - 2.5, lon + 2.5, alt);
	coords.pushLatLngAlt(lat + 2.5, lon + 2.5, alt);
	coords.pushLatLngAlt(lat + 2.5, lon - 2.5, alt);
	mark.setName("Lat:"+lat+"Long:"+lon+"alt:"+alt);
	mark.setDescription('value:'+val);
	if (!mark.getStyleSelector()) {
		mark.setStyleSelector(ge.createStyle(''));
	}
	var color = Math.round((val-0)*256*256*256/(1000-0)).toString(16);
	while(color.length<6) color = "0"+color;
	color="FF"+color;
	mark.getStyleSelector().getPolyStyle().getColor().set(color);
	ge.getFeatures().appendChild(mark);
}
Ext.app.earthStore=new Ext.data.XmlStore({
	proxy: new Ext.data.HttpProxy({url: 'test.xml'}),
	record: 'result',
	id: 'id',
	fields:[{name:'id',type:'int'},{name:'lat',type:'double'},{name:'long',type:'double'},{name:'alt',type:'double'},{name:'value',type:'double'}],
	totalProperty: 'count',
	listeners: {
		load: function(store,records,options){
			var features = ge.getFeatures();
			while (features.getFirstChild()) features.removeChild(features.getFirstChild());
			Ext.each(records,addMark);
	    }
	}
});
Ext.onReady(function(){
	google.earth.createInstance('map3d',function(instance){
		ge=instance;
		ge.getWindow().setVisibility(true);
		ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
	},function(code){
	});
	Ext.EventManager.on("submit","click",function(e,t,o){
		Ext.app.earthStore.load();
		e.stopEvent();
	});
});
