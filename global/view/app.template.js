Ext.app.xtemplate=new Ext.XTemplate('<tpl for=".">',
"<div class='tpl-title'>{dsname}</div>",
"<div class='tpl-info'>",
"Subject: {subject}<br>",
"Area: {area}<br>",
"Element: {element}<br>",
"Service Node: {institution}<br>",
"Equipment: {equip}<br> ",
"Platform: {platform}<br>",
"<a href='{meta}' target='_blank'>Metadata</a>",
"&nbsp;&nbsp;&nbsp;&nbsp;",
"<a href='{doc}' target='_blank'>Document</a>",
"</div>",
"<div class='tpl-data Items'></div>",
"<div class='tpl-tool Item'>",
'<tpl if="this.match(area)">',
"<a href='{addr}{id}' target='_self'>More</a>",
"</tpl>",
'<tpl if="!this.match(area)">',
"<a href='?Viewmore&dataset={id}&starttime={starttime}&endtime={endtime}' target='_blank'>More</a>",
"</tpl>",
"<a click='Toggle' href='javascript:void(0)'>Toggle</a>",
"<a click='Previews' href='javascript:void(0)'>Previews</a>",
"<a click='Downloads' href='javascript:void(0)'>Downloads</a>",
"</div>",
"<div class='tpl-clear'></div>",
'</tpl>',
{
	compiled: true,
	match:function(str){
		if(str.indexOf("Moon")!=-1) return true;
		if(str.indexOf("Mars")!=-1) return true;
		return false;
	}
}
);
Ext.app.template={};
Ext.app.template.cdf=new Ext.Template(
"<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr data={id}>",
"<td width='17' align='left' valign='top'><input type='checkbox' name='checkbox'></td>",
"<td align='left' valign='top'>{name}</td>",
"<td width='83' align='left' valign='top'>",
"<a href='{addr}{path}{name}' target='_self'>Get</a>",
"&nbsp;&nbsp;",
"<a href='http://159.226.22.205:8080/tran/translator?url={addr}{path}/{name}&but=export' target='_blank'>Read</a>",
"&nbsp;&nbsp;",
"<a href='http://159.226.22.205:8080/tran/translator?url={addr}{path}/{name}&but=translation' target='_blank'>Translate</a>",
"</td>",
"</tr></table>",
"");
Ext.app.template.fits=new Ext.Template(
"<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr data={id}>",
"<td width='17' align='left' valign='top'><input type='checkbox' name='checkbox'></td>",
"<td align='left' valign='top'>{name}</td>",
"<td width='83' align='left' valign='top'>",
"<a href='{addr}{path}{name}' target='_self'>Get</a>",
"&nbsp;&nbsp;",
"<a href='javascript:Ext.app.show(\"{name}\",\"{thumb}\",\"{addr}{path}/\");' target='_self'>Show</a>",
"</td>",
"</tr></table>",
"");
Ext.app.template.img=new Ext.Template(
"<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr data={id}>",
"<td width='17' align='left' valign='top'><input type='checkbox' name='checkbox'></td>",
"<td align='left' valign='top'>{name}</td>",
"<td width='83' align='left' valign='top'>",
"<a href='?Download&url={addr}{path}{name}&name={name}' target='_self'>Get</a>",
"&nbsp;&nbsp;",
"<a href='javascript:Ext.app.show(\"{name}\",\"{name}\",\"{addr}{path}/\")' target='_self'>Show</a>",
"</td>",
"</tr></table>",
"");
Ext.app.template.txt=new Ext.XTemplate(
"<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr data={id}>",
"<td width='17' align='left' valign='top'><input type='checkbox' name='checkbox'></td>",
"<td align='left' valign='top'>{name}</td>",
"<td width='83' align='left' valign='top'>",
"<a href='?Download&url={addr}{path}{name}&name={name}' target='_self'>Get</a>",
"&nbsp;&nbsp;",
"<a href='{addr}{path}{name}' target='_blank'>Read</a>",
"&nbsp;&nbsp;",
'<tpl if="thumb && thumb !=\'\'">',
"<a href='javascript:Ext.app.show(\"{name}\",\"{thumb}\",\"{addr}{path}/\");' target='_self'>Show</a>",
'</tpl>',
"</tr></table>",
"");
