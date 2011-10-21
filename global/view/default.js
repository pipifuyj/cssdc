Ext.app.Filters;
Ext.app.filter=function(key,value,auto){
	if(key=='subject'){
		Ext.app.Filters.update();
		return Ext.app.search({subject:value});
	}
	var template=new Ext.Template("<li Field='{key}'>",
		"<div class='rc1'>{key}: {value}</div>",
		"<div class='rc2'><a href='javascript:void(0)'>Remove</a></div>",
	"</li>");
	if(key=='keywords'){
		Ext.app.store.lastParams['keywords[]'].push(value);
		template.append(Ext.app.Filters,{key:key,value:value},true).set({keywords:value});
	}else{
		if(Ext.app.store.lastParams[key]){
			Ext.app.Filters.child("li[Field="+key+"] .rc1").update(key+": "+value);
		}else{
			template.append(Ext.app.Filters,{key:key,value:value});
		}
		Ext.app.store.lastParams[key]=value;
	}
	if(!Ext.isDefined(auto))auto=true;
	if(auto)Ext.app.search();
}
Ext.app.search=function(params){
	params=Ext.apply(params||{},{start: 0});
	if(params.subject){
		Ext.app.store.lastParams={'keywords[]':[]};
		Ext.app.data.lastParams={};
	}else delete Ext.app.store.lastParams.subject;
	Ext.app.store.load({
		params: params
	});
}

Ext.onReady(function(){
Ext.app.Filters=Ext.get("FilterUl");
Ext.app.Filters.on("click",function(e,t){
	if(t.nodeName.toLowerCase()!='a')return false;
	var element=Ext.get(t).parent("li");
	var key=element.getAttribute("Field");
	var keywords=element.getAttribute("keywords");
	if(keywords){
		Ext.app.store.lastParams['keywords[]'].remove(keywords);
		element.remove();
	}else if(key){
		delete Ext.app.store.lastParams[key];
		element.remove();
	}
	Ext.app.search();
});
new Ext.PagingToolbar({
	store: Ext.app.store,
	pageSize: 3,
	displayInfo: true,
	renderTo: 'PagingToolbar'
});
Ext.app.output=Ext.get("Results");
Ext.EventManager.on("Subject","click",function(e,t){
	var subject=Ext.get(t).getAttribute('subject');
	if(subject){
		Ext.app.search({subject:subject});
	}
});
var keywords=Ext.get("keywords");
var DateFrom=Ext.get("DateFrom");
new Ext.form.DateField({
	format: 'Y-m-d H:i:s',
	applyTo: DateFrom
});
var DateTo=Ext.get("DateTo");
new Ext.form.DateField({
	format: 'Y-m-d H:i:s',
	applyTo: DateTo
});
Ext.EventManager.on("keywordsButton","click",function(){
	var value=keywords.getValue();
	if(value){
		Ext.app.filter('keywords',value);
	}
});
Ext.EventManager.on("DateButton","click",function(){
	var from=DateFrom.getValue(),to=DateTo.getValue();
	if(from){
		Ext.app.filter("starttime",from,false);
	}
	if(to){
		Ext.app.filter("endtime",to,false);
	}
	Ext.app.search();
});
Ext.EventManager.on("SearchButton","click",function(){
	Ext.app.search();
});
Ext.EventManager.on("Sorts","click",function(e,t){
	var target=e.getTarget("a");
	var element=Ext.get(target);
	var sort=element.getAttribute("sort");
	var dir=element.getAttribute("dir");
	Ext.app.search({sort:sort,dir:dir});
});
Ext.EventManager.on("RmallButton","click",function(){
	Ext.app.Filters.update();
	Ext.app.store.lastParams={'keywords[]':[]};
	Ext.app.data.lastParams={};
	Ext.app.search();
});
Ext.app.search();
});
