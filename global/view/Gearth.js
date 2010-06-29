var ge,max,min,pallete,para={},form;
getColor=function(val){
	var h=Math.round((val-min)*255/(max-min));
	var color=new HSV(h,100,100);
	return 'FF'+color.toHEX();
}
google.load('earth','1');
addMark=function(record){
	var lat = parseFloat(record.get('lat'));
	var lon = parseFloat(record.get('long'));
	var alt = parseFloat(record.get('alt'));
	var val = parseFloat(record.get('value'));
	var desp = "Longitude:"+lon+"°<br>Latitude:"+lat+"°<br>Altitude:"+alt+"KM<br>"+form.getValues().data+":"+Number(val).toExponential(2); 
	var step = 5.0;
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
	mark.setName("Global "+form.getValues().data+" Distribution");
	mark.setDescription(desp);
	if (!mark.getStyleSelector()) {
		mark.setStyleSelector(ge.createStyle(''));
	}
	mark.getStyleSelector().getPolyStyle().getColor().set(getColor(val));
	mark.getStyleSelector().getLineStyle().setWidth(0);
	ge.getFeatures().appendChild(mark);
}
addPallete=function(){
	pallete.update();
	var color,h=0,s=100,v=100,e;
	e=document.createElement('div');
	e.style.width='10px';
	e.innerHTML="Max:"+Number(max).toExponential(2);
	pallete.appendChild(e);
	for(var h=0;h<256;h++){
		color=new HSV(h,s,v);
		e=document.createElement('div');
		e.title='HSV:'+color;
		e.style.float='left';
		e.style.width='10px';
		e.style.height='0.8px';
		e.style.background='#'+color.toHEX();
		pallete.appendChild(e);
	}
	e=document.createElement('div');
	e.style.width='10px';
	e.innerHTML="Min:"+Number(min).toExponential(2);
	pallete.appendChild(e);
}
Ext.app.earthStore=new Ext.data.XmlStore({
	proxy: new Ext.data.HttpProxy({url: '?Ssdg=XML'}),
	record: 'result',
	id: 'id',
	fields:[{name:'id',type:'int'},{name:'lat',type:'double'},{name:'long',type:'double'},{name:'alt',type:'double'},{name:'value',type:'double'}],
	totalProperty: 'count',
	listeners: {
		load: function(store,records,options){
			var features = ge.getFeatures();
			while (features.getFirstChild()) features.removeChild(features.getFirstChild());
			store.sort('value', 'DESC');
			max=parseFloat(store.getAt(0).get('value'));
			min=parseFloat(store.getAt(store.getTotalCount()-1).get('value'));
			addPallete();
			Ext.each(records,addMark);
	    }
	}
});
Ext.onReady(function(){
	pallete=Ext.get("colors");
	google.earth.createInstance('map3d',function(instance){
		ge=instance;
		ge.getWindow().setVisibility(true);
		ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
		ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
		ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
		ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, false);
	},function(code){
	});
	form=new Ext.form.BasicForm("params");
	Ext.EventManager.on("submit","click",function(e,t,o){
		Ext.app.earthStore.load({
			params:form.getValues()
		});
		e.stopEvent();
	});
});
