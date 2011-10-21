Ext.Menu=new Ext.BoxComponent({
	autoHeight:true,
	style:{
		padding:'5px',
		background:'#4A4A4A',
		color:'white',
		position:'absolute'
	},
	tpl:['<tpl for=".">',
	'<div><a href="{href}" target="{target}" style="color:white;text-decoration:none;">{text}</a></div>',
	'</tpl>'],
	listeners:{
		afterrender:function(cmp){
			cmp.hide();
			cmp.el.on('mouseover',function(e,t,o){
				clearTimeout(cmp.defer);
			});
			cmp.el.on('mouseout',function(e,t,o){
				cmp.defer=cmp.hide.defer(500,cmp);
			});
		}
	}
});
Ext.onReady(function(){
	Ext.Menu.render(Ext.getBody());
	var as=Ext.select("A[Menu]");
	as.on('mouseover',function(e,t,o){
		clearTimeout(Ext.Menu.defer);
		var el=Ext.get(t);
		var p=el.parent();
		var o=Ext.decode(t.getAttribute('Menu'));
		Ext.Menu.setPosition(el.getX(),p.getY()+p.getHeight()).show().update(o);
	});
	as.on('mouseout',function(e,t,o){
		Ext.Menu.defer=Ext.Menu.hide.defer(1000,Ext.Menu);
	});
});
