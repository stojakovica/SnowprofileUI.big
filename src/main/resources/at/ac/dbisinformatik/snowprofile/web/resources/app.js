Ext.require([ 
    'Ext.layout.container.*'
]);

Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Snowprofile',
        'GoogleMaps',
        'Menu'
    ],
    
    launch: function() {
        Ext.create('Ext.Viewport', {
        	layout:'border',
        	defaults: {
        	    title: false
        	},
        	items: [{
        	    region: 'north',
        	    items: [
    	            {
    	            	xtype: 'menuleiste',
    	            	border: false
    	            }
        	    ]
        	},{
        	    region:'west',
        	    width: 650,
        	    border: false,
        	    items: [
    	            {
    	            	xtype: 'tabpanel',
    	            	activeTab: 0, // index or id
                    	height: 305,
                    	width: '100%',
                    	items:[
                    	    {
                        		title: 'Kopf',
                        		autoScroll: true,
                        		items: [
                    		        {
                    		        	xtype: 'kopf',
                    		        	border: false
                    		        }
                        		]
                        	},
                        	{
                        	    title: 'Karte',
                        	    items: [
                    	            {
                    	            	xtype: 'googlemaps',
                    	            	width: '100%',
                    	            	height: '100%',
                    	            	border: false
                    	            }
                   	            ]
                        	}
                    	]
    	            },
    	            {
    	            	xtype: 'panel',
    	            	layout: 'fit',
//    	            	height: 319,
    	            	autoScroll: true,
    	            	border: false,
                    	items: [
                	        {
                	        	xtype: 'tabpanel',
                	        	activeTab: 0,
                	        	border: false,
                	        	items: [
            	        	        {
            	        	        	title: 'Schichtprofil',
            	        	        	border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'schichtprofil',
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Schneetemperatur',
        	        	        		border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'snowtemperature',
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Stabilitätstests',
            	        	        	border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'stabilitytest',
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        }
                	        	]
                	        }
                    	]
    	            }
        	    ]
        	},{
        	    region:'center',
        	    items: [
    	            {
    	            	xtype: 'graph',
                    	layout: 'fit',
                    	height: "100%",
                    	autoScroll: true,
                    	border: false
    	            }
        	    ]
        	}]
        });
    }
    
});