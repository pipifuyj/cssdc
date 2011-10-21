Ext.app.template.cdf=new Ext.Template(
"<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr data={id}>",
"<td width='20'><input type='checkbox' /></td>",
"<td align='left'>{name}</td>",
"<td width='150' align='center'>{starttime}</td>",
"<td width='150' align='center'>{endtime}</td>",
"<td width='80'>",
"<a href='{addr}{path}{name}' target='_blank'>Get</a>",
"&nbsp;&nbsp;",
"<a href='http://159.226.22.205:8080/tran/translator?url={addr}{path}/{name}&but=export' target='_blank'>Read</a>",
"&nbsp;&nbsp;",
"<a href='http://159.226.22.205:8080/tran/translator?url={addr}{path}/{name}&but=translation' target='_blank'>Translate</a>",
"</td>",
"</tr></table>",
"");
Ext.app.template.fits=new Ext.Template(
"<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr data={id}>",
"<td width='20'><input type='checkbox' /></td>",
"<td align='left'>{name}</td>",
"<td width='150' align='center'>{starttime}</td>",
"<td width='150' align='center'>{endtime}</td>",
"<td width='60'>",
"<a href='{addr}{path}{name}' target='_blank'>Get</a>",
"&nbsp;&nbsp;",
"<a href='javascript:Ext.app.show(\"{name}\",\"{thumb}\",\"{addr}{path}/\");'>Show</a>",
"</td>",
"</tr></table>",
"");
Ext.app.template.img=new Ext.Template(
"<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr data={id}>",
"<td width='20'><input type='checkbox' /></td>",
"<td align='left'>{name}</td>",
"<td width='150' align='center'>{starttime}</td>",
"<td width='150' align='center'>{endtime}</td>",
"<td width='60'>",
"<a href='?Download&url={addr}{path}{name}&name={name}' target='_blank'>Get</a>",
"&nbsp;&nbsp;",
"<a href='javascript:Ext.app.show(\"{name}\",\"{name}\",\"{addr}{path}/\")'>Show</a>",
"</td>",
"</tr></table>",
"");
Ext.app.template.txt=new Ext.Template(
"<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr data={id}>",
"<td width='20'><input type='checkbox' /></td>",
"<td align='left'>{name}</td>",
"<td width='150' align='center'>{starttime}</td>",
"<td width='150' align='center'>{endtime}</td>",
"<td width='60'>",
"<a href='?Download&url={addr}{path}{name}&name={name}' target='_blank'>Get</a>",
"&nbsp;&nbsp;",
"<a href='{addr}{path}{name}' target='_blank'>Read</a>",
"</td>",
"</tr></table>",
"");
Ext.app.data.LastOptions.add=false;
Ext.onReady(function(){
new Ext.PagingToolbar({
	store: Ext.app.data,
	pageSize: 30,
	displayInfo: true,
	renderTo: 'PagingToolbar'
});
Ext.app.output=Ext.get("Results");
Ext.app.store.load();
});

