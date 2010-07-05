var Ext.user,Ext.userpanel;
Ext.onReady(function(){
	Ext.user=Ext.util.Cookies.get("user");	
	Ext.userpanel=Ext.get("userstatus");
	if(Ext.user==null) Ext.userpanel.update('<a href="http://ssdg.cssar.ac.cn:8080/login.jsp" target="_self">Login</a><a href="http://auth.csdb.cn/reg01.jsp" target="_blank">Registration</a>');
	else Ext.userpanel.update('Welcome, Dear '+Ext.user);
});
