Ext.Element.addMethods({
	fireEvent:function(name){
		if(document.createEventObject){
			var e=document.createEventObject();
			this.dom.fireEvent('on'+name,e);
		}else{
			var e=document.createEvent('MouseEvents');
			e.initMouseEvent(name,true,true,window,0,0,0,0,0,false,false,false,false,0,null);
			this.dom.dispatchEvent(e);
		}
	}
});
Ext.app.output;
Ext.app.Toggle=function(view,index,node,e){
	Ext.get(node).prev(".Items").select("input").each(function(el,c,idx){
		el.dom.checked=el.dom.checked?false:true;
	});
}
Ext.app.Previews=function(view,index,node,e){
	var element=Ext.get(node);
	var dataset=Ext.app.store.getAt(index);
	var format=dataset.get('format');
	if(format=='cdf'){
		Ext.Msg.alert("Alert","No preview for this dataset currently.");
	}else if(format=='fits' || format== 'txt'){
		var elements=element.prev("div:has(table)").select("tr:has(input:checked)")
		var file=[];
		elements.each(function(el,c,idx){
			var id=el.getAttribute("data");
			var data=Ext.app.data.getById(id);
			if(data.get('thumb'))file.push(data.get('path')+"/"+data.get('thumb'));
		});
		if(Ext.isEmpty(file))Ext.Msg.alert("Alert","Please Check Checkboxes! Or Else, No preview for this dataset currently. ");
		else Ext.app.show(dataset.id,file,dataset.get('addr'));
	}else{
		var elements=element.prev("div:has(table)").select("tr:has(input:checked)")
		var file=[];
		elements.each(function(el,c,idx){
			var id=el.getAttribute("data");
			var data=Ext.app.data.getById(id);
			file.push(data.get('path')+"/"+data.get('name'));
		});
		if(Ext.isEmpty(file))Ext.Msg.alert("Alert","Please Check Following Checkboxes!");
		else Ext.app.show(dataset.id,file,dataset.get('addr'));
	}
}
Ext.app.Downloads=function(view,index,node,e){
	var element=Ext.get(node);
	var dataset=Ext.app.store.getAt(index);
	var elements=element.prev("div:has(table)").select("tr:has(input:checked)")
	var file=[];
	elements.each(function(el,c,idx){
		var id=el.getAttribute("data");
		var data=Ext.app.data.getById(id);
		file.push(dataset.get('addr')+data.get('path')+"/"+data.get('name'));
	});
	if(Ext.isEmpty(file))Ext.Msg.alert("Alert","Please Check Checkboxes!");
	else{
		try{
			var x=new ActiveXObject("DataGridPlug_zky.DownloadDataGrid");
			x.download(file.join("\r\n"));
		}catch(e){
			Ext.Msg.alert("Alert","If your browser support ActiveX, Please read <a href='?Help#Plugin'>Help</a>.");
		}
	}
}
Ext.app.window=new Ext.Window({
	width: 500,
	closeAction: 'hide',
	autoScroll: true,
	resizable: true,
	bbar: new Ext.Toolbar({
	buttonAlign: 'center',
	items:[{
		text: 'Previous',
		handler: function(){
			if(Ext.app.window.current==0)return;
			Ext.app.window.current--;
			Ext.app.window.setTitle(Ext.app.window.name+"("+(Ext.app.window.current+1)+"/"+Ext.app.window.file.length+")");
			Ext.app.window.update({url:Ext.app.window.url+Ext.app.window.file[Ext.app.window.current]});
		}
	},{text: 'Close', handler: function(){Ext.app.window.hide();}},{
		text: 'Next',
		handler: function(){
			if(Ext.app.window.current==Ext.app.window.file.length-1)return;
			Ext.app.window.current++;
			Ext.app.window.setTitle(Ext.app.window.name+"("+(Ext.app.window.current+1)+"/"+Ext.app.window.file.length+")");
			Ext.app.window.update({url:Ext.app.window.url+Ext.app.window.file[Ext.app.window.current]});
		}
	}]}),
tpl: "<img style='width: 486px;' src='{url}' />",
	listeners: {
		show: function(cmp){
			cmp.setHeight(1000);
			var h=cmp.body.child("img").getHeight();
			if(h>700)h=500;
			else if(h==0)h=500;
			cmp.setHeight(h+cmp.getFrameHeight());
			cmp.center();
			window.scroll(0,cmp.getPosition()[1]);
		}
	}
});
Ext.app.show=function(name,file,url){
	if(Ext.isEmpty(file))return Ext.Msg.alert("Alert","Nothing to Show");
	if(!Ext.isArray(file))file=[file];
	Ext.app.window.name=name;
	Ext.app.window.url=url;
	Ext.app.window.file=file;
	Ext.app.window.current=0;
	Ext.app.window.render(Ext.getBody());
	Ext.app.window.setTitle(Ext.app.window.name+"("+(Ext.app.window.current+1)+"/"+Ext.app.window.file.length+")");
	Ext.app.window.update({url:Ext.app.window.url+Ext.app.window.file[Ext.app.window.current]});
	Ext.app.window.show();
}
Ext.app.store=new Ext.data.XmlStore({
	proxy: new Ext.data.HttpProxy({url: '?Dataset'}),
	record: 'dataset',
	id: 'id',
	fields: ['id','dsname','addr','meta','doc','format','area','element','equip','platform','subject','institution','tablename'],
	totalProperty: 'count',
	lastParams: {'keywords[]':[]},
	listeners: {
		beforeload: function(store,options){
			store.lastParams=Ext.applyIf(options.params,store.lastParams);
		},
		load: function(store,records,options){
			if(Ext.app.view.rendered)Ext.app.view.refresh();
			else Ext.app.view.render(Ext.app.output);
			Ext.each(records,function(record,index){
				record.set("starttime",options.params.starttime);
				record.set("endtime",options.params.endtime);
				Ext.app.data.load({dataset:record,index:index});
			});
		}
	}
});
Ext.app.view=new Ext.DataView({
	store: Ext.app.store,
	tpl: Ext.app.xtemplate,
	itemSelector: '.Item',
	listeners: {
		click: function(view,index,node,e){
			var target=e.getTarget();
			var element=Ext.get(target);
			var click=element.getAttribute('click');
			if(Ext.isString(click))Ext.app[click](view,index,node,e);
		}
	}
});
Ext.app.data=new Ext.data.XmlStore({
	url: '?AutoData',
	record:'file',
	id: 'id',
	fields: ['id','name','path','thumb','size','starttime','endtime'],
	totalProperty: 'count',
	LastOptions: {add:true},
	listeners: {
		beforeload: function(store,options){
			store.LastOptions=Ext.applyIf(options,store.LastOptions);
			Ext.apply(options.params,{'dataset':options.dataset.get('tablename')});
			store.lastParams=Ext.applyIf(options.params,store.lastParams);
			if(options.dataset.get('starttime'))options.params.starttime=options.dataset.get('starttime');
			else delete store.lastParams.starttime;
			if(options.dataset.get('endtime'))options.params.endtime=options.dataset.get('endtime');
			else delete store.lastParams.endtime;
			if(Ext.app.store.lastParams.dataset)options.params.limit=30;
			else options.params.limit=6;
		},
		load: function(store,records,options){
			var dom=Ext.app.output.query(".Items")[options.index];
			var element=Ext.get(dom).update();
			var addr=options.dataset.get('addr');
			var format=options.dataset.get('format');
			var template=Ext.app.template[format]?Ext.app.template[format]:Ext.app.template['img'];
			Ext.each(records,function(record){
				record.set('addr',addr);
				template.append(element,record.data);
			});
		}
	}
});
Ext.Ajax.on("requestexception",function(conn,response){
	alert("error fetching data!\n"
		+"\nstatus: "+response.status
		+"\nheaders: "+response.getAllResponseHeaders());
});
Ext.onReady(function(){
Ext.QuickTips.init();
Ext.apply(Ext.QuickTips.getQuickTip(), {
    showDelay: 50,
    trackMouse: true
});
});
