msg = function(title, msg){
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK	
        });
    };

MyDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
	},
	getModules : function(){
		return [
			new MyDesktop.TranslationWindow()
		];
	},
    // config for the start menu
    getStartConfig : function(){
        return {
            title: 'CSSAR Virtual Lab',
            iconCls: 'user',
            toolItems: [{
                text:'Settings',
                iconCls:'settings',
                scope:this
            },'-',{
                text:'Logout',
                iconCls:'logout',
                scope:this
            }]
        };
    }
});

MyDesktop.TranslationWindow = Ext.extend(Ext.app.Module, {
    id:'trans-win',
    init : function(){
        this.launcher = {
            text: 'CDF Translation',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        }
    },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('trans-win');
        if(!win){
            win = desktop.createWindow({
                id: 'trans-win',
                title:'CDF Translation',
                width:400,
                height:200,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
	            items: new Ext.FormPanel({
						id:'upload',
				        fileUpload: true,
				        title: 'Tranlate Your CDF and Pipeline to Another Application',
        				bodyStyle: 'padding: 10px 10px 30px 10px;',
				        labelWidth: 30,
				        defaults: {
				            anchor: '95%',
				            allowBlank: false,
				            msgTarget: 'side'
				        },
				        items: [{
					            xtype: 'fileuploadfield',
					            id: 'form-file',
					            emptyText: 'Select a CDF File',
					            fieldLabel: 'CDF',
					            name: 'file',
				    	        buttonText: '',
				        	    buttonCfg: {
				                	iconCls: 'upload-icon'
				            	}
							   },{
								xtype: 'combo',
								id: 'form-type',
								name: 'type',
								fieldLabel: 'Type',
								emptyText: 'you must choose a trans type',
								editable: true,
								allowBlank: false,
								mode: 'local',
								store: new Ext.data.SimpleStore({ 
										fields: ["type", "text"], 
										data: [['cdf-fits','cdf-fits'],['cdf-netCDF','cdf-netCDF'],['netCDF-cdf','netCDF-cdf'],['cdf-txt','cdf-txt'],['hdf4-cdf','hdf4-cdf']] 
								}),
								valueField: 'type',
								displayField: 'text'
							}],
				        buttons: [{
				            text: 'Translate',
				            handler: function(){
				                if(Ext.getCmp('upload').getForm().isValid()){
					                Ext.getCmp('upload').getForm().submit({
				                    	url: '?Virtuallab=Upload',
		            			        waitMsg: 'Translating your CDF...',
					                    success: function(form, action){
            								var url="<a href='upload/"+action.result.file+"'>Download</a>";
	    	    			                msg('Success', url);
					                    },
										failure: function(form,action){
											msg("Failure",action.result.msg);
										}
	        		        		});
		                		}
        		    		}	
				        },{
				            text: 'Reset',
				            handler: function(){
			                	Ext.getCmp('upload').getForm().reset();
			            	}
				        }]
			    	})
			});
        }
        win.show();
    }
});
