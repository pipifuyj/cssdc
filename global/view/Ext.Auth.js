var Ext.user,Ext.userpanel;
Ext.app.unlogtpl=new Ext.XTemplate(
	 '<a href="http://ssdg.cssar.ac.cn:8080/login.jsp" target="_self">Login</a>',
	 '<a href="http://auth.csdb.cn/reg01.jsp" target="_blank">Registration</a>',
	 ''
);
Ext.onReady(function(){
	Ext.user=Ext.util.Cookies.get("user");	
	Ext.userpanel=Ext.get("userstatus");
	if(Ext.user) Ext.userpanel.update('Welcome, Dear '+Ext.user);
	else Ext.userpanel.update('<a href="http://ssdg.cssar.ac.cn:8080/login.jsp" target="_self">Login</a><a href="http://auth.csdb.cn/reg01.jsp" target="_blank">Registration</a>');
});
