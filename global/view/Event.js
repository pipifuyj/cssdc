Ext.app.eventid;
Ext.app.output;
Ext.app.form;
Ext.app.template=new Ext.XTemplate(
		'<tpl for=".">',
			'<H2 align="center">ESA DETECTED PROTON EVENT RECORD</H2>',
			'<div>',
			'Started:{esastarttime} UT<br>',
			'Ended:{esaendtime} UT<br>',
			'Duration:{esaduration} Hrs<br>',
			'</div>',
			'<tpl if="historyimg">',
				'<div>',
				'<H1>Event History</H1>',
				'<img src="{historyimg}"/>',
				'</div>',
			'</tpl>',
			'<tpl if="specimg">',
				'<div>',
				'<H1>Event Spectrum</H1>',
				'<img src="{specimg}"/>',
				'</div>',
			'</tpl>',
			'<tpl if="statimg">',
				'<div>',
				'<H1>Event Statistics</H1>',
				'<img src="{statimg}"/>',
				'</div>',
			'</tpl>',
		'</tpl>'
);

Ext.onReady(function(){
Ext.app.events=Ext.get("Events");
Ext.app.content=Ext.get("Content");
var Start=Ext.get("Start");
new Ext.form.DateField({
	format: 'Y-m-d H:i:s',
	applyTo: Start
});
var Max=Ext.get("Max");
new Ext.form.DateField({
	format: 'Y-m-d      ',
	applyTo: Max
});
Ext.app.EventStore=new Ext.data.XmlStore({
	url: '?Event=Search',
	remoteSort: true,
	record: 'event',
	idPath: 'id',
	fields: ['id','nasastarttime','nasamaxtime','flux','assocme','importance','regionloc','regionnum','esastarttime','esaendtime','esaduration','historyimg','specimg','statimg','alias','remark'],
	totalProperty: 'count',
	listeners:{
		load:function(store,records){
			if(Ext.app.EventStore.getTotalCount()>0) Ext.app.EventGrid.fireEvent('rowclick',Ext.app.EventGrid,0);
			else Ext.app.content.update("");
		}
	}
});
Ext.app.EventPaging=new Ext.PagingToolbar({
	store: Ext.app.EventStore,
	pageSize: 10,
	displayInfo: true
});
Ext.app.EventGrid=new Ext.grid.GridPanel({
	title: 'Proton Event',
	autoHeight: true,
	store: Ext.app.EventStore,
	cm: new Ext.grid.ColumnModel({
	defaults: {sortable: true},
	columns: [
		{header:'Start Time',dataIndex:'nasastarttime'},
		{header:'Max Time',dataIndex:'nasamaxtime'},
		{header:'Proton Flux',dataIndex:'flux'},
		{header:'Associated CME',dataIndex:'assocme'},
		{header:'Importance',dataIndex:'importance'},
		{header:'Region Location',dataIndex:'regionloc'},
		{header:'Region Number',dataIndex:'regionnum'},
		{header:'Alias',dataIndex:'alias'}
	]}),
	viewConfig: {forceFit:true},
	bbar: Ext.app.EventPaging,
	listeners: {
		rowclick: function(grid,index,e){
			Ext.app.template.overwrite(Ext.app.content,Ext.app.EventStore.getAt(index).data);
			Ext.apply(Ext.app.DataStore.baseParams,{
				type:Ext.app.EventStore.baseParams.type,
				event:Ext.app.EventStore.getAt(index).id,
				limit:20
			});
			Ext.app.DataStore.load();
		}
	},
	renderTo: 'Events'
});
var Type={
	width:80,
	allowBlank:false,
	blankText:"Not Null",
	forceSelection:true,
	xtype:"combo",
	fieldLabel: 'Type',
	name: 'type',
	labelSeparator: ':',
	store: new Ext.data.XmlStore({url: '?Event=getEventtype',record: 'type',fields: ['value']}),
	emptyTetx:'Please choose',
	editable:false,
	triggerAction: 'all',
	valueField:"value",
	displayField:'value'	
};
var StartTime={ 
	width:100,	
	xtype:"datefield",
	fieldLabel: 'Start Time',
	name: 'starttime',
	labelSeparator: ':', 
	format: 'Y-m-d H:i:s'
};
var EndTime={ 
	width:100,
	xtype:"datefield",
	fieldLabel: 'End Time',
	name: 'endtime',
	labelSeparator: ':',
	format: 'Y-m-d H:i:s'
};
var Regnum={
	width:80,
	forceSelection:true,
	xtype:"combo",
	fieldLabel: 'Region Number',
	name: 'regnum',
	labelSeparator: ':',
	store: new Ext.data.XmlStore({
		url: '?Event=getRegnum',
		record: 'regnum',
		fields: ['value']
	}),
	emptyTetx:'Please choose',
	triggerAction: 'all',
	valueField:"value",
	displayField:'value'	
};
var Regloc={
	width: 80,
	forceSelection:true,
	xtype:"combo",
	fieldLabel: 'Region Location',
	name: 'regloc',
	labelSeparator: ':',
	store: new Ext.data.XmlStore({
		url: '?Event=getRegloc',
		record: 'regloc',
		fields: ['value']
	}),
	emptyTetx:'Please choose',
	triggerAction: 'all',
	valueField:"value",
	displayField:'value'	
};
var Alias={
	width:100,
	xtype:"textfield",
	fieldLabel: 'Alias',
	name: 'alias',
	labelSeparator: ':'
};
Ext.app.SearchForm=new Ext.form.FormPanel({
	title: 'Search Your Event',
	frame: true,
	width: 984,
	items:[{
		layout:'column', 
		items:[{
			columnWidth:0.125,
			layout:'form',
			labelWidth:30,
			items:[Type]
		},{
			columnWidth:0.175,
			layout:'form',
			labelWidth:60,
			items:[StartTime]
		},{
			columnWidth:0.175,
			layout:'form',
			labelWidth:60,
			items:[EndTime]
		},{
			columnWidth:0.185,
			layout:'form',
			labelWidth:90,
			items:[Regnum]
		},{
			columnWidth:0.19,
			layout:'form',
			labelWidth:95,
			items:[Regloc]
		},{
			columnWidth:0.15,
			layout:'form',
			labelWidth:30,
			items:[Alias]
		}]
	}],
	buttons: [{
		text: "Search",
		handler: function(){
			var values=Ext.app.SearchForm.getForm().getValues();
			if(values.type){
				Ext.apply(Ext.app.EventStore.baseParams,values,{limit:10});
				Ext.app.EventStore.load();
			}else Ext.Msg.alert("Warning","You must specify a kind of space event!");
		}
	}],
	renderTo:'SearchForm' 
});
Ext.apply(Ext.app.EventStore.baseParams,{type:'proton',limit:10});
Ext.app.EventStore.load({
	callback:function(){
		Ext.app.EventGrid.fireEvent('rowclick',Ext.app.EventGrid,0);
	}
});
Ext.app.DataStore=new Ext.data.XmlStore({
	url: '?Event=Data',
	remoteSort: true,
	record: 'file',
	idPath: 'record_id',
	fields: ['record_id','filename','starttime','endtime','path'],
	totalProperty: 'count'
});
Ext.app.DataPaging=new Ext.PagingToolbar({
	store: Ext.app.DataStore,
	pageSize: 20,
	displayInfo: true
});
Ext.app.Linker=function(val){
	return "<a href='"+val+"' target='_blank'>Get</a>";
}
Ext.app.DataGrid=new Ext.grid.GridPanel({
	title: 'Event Relative Data',
	autoHeight: true,
	store: Ext.app.DataStore,
	sm: new Ext.grid.CheckboxSelectionModel(),
	cm: new Ext.grid.ColumnModel({
			defaults: {sortable: true},
			columns: [
				//new Ext.grid.CheckboxSelectionModel ({singleSelect : false}),
				{header:'Relative Dataset',dataIndex:'record_id'},
				{header:'Relative File',dataIndex:'filename'},
				{header:'Start Time',dataIndex:'starttime'},
				{header:'End Time',dataIndex:'endtime'},
				{header:'Download',dataIndex:'path',renderer:Ext.app.Linker}
		]}),
	viewConfig: {forceFit:true},
	bbar: Ext.app.DataPaging,
	listeners: {
		rowclick: function(grid,index,e){
		}
	},
	renderTo: 'Data'
});
})
