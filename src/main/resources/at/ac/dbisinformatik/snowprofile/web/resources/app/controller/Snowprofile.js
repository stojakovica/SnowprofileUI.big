Ext.define('LWD.controller.Snowprofile', {
    extend: 'Ext.app.Controller',
	stores: [
        'Snowtemperature',
	    'Schichtprofil',
	    'Snowprofile'
	],
	models: [
        'Snowprofile',
        'snowprofile.AspectPosition',
        'snowprofile.Components',
        'snowprofile.contentUomModel',
        'snowprofile.densityLayer',
        'snowprofile.densityMeasurement',
        'snowprofile.densityProfile',
        'snowprofile.depthTop',
        'snowprofile.ElevationPosition',
        'snowprofile.grainSize',
        'snowprofile.hardnessLayer',
        'snowprofile.hardnessProfile',
        'snowprofile.hIN',
        'snowprofile.hN24',
        'snowprofile.hS',
        'snowprofile.impurityMeasurement',
        'snowprofile.locRef',
        'snowprofile.lwcProfile',
        'snowprofile.MeasurementComponents',
        'snowprofile.Measurements',
        'snowprofile.MetaData',
        'snowprofile.microPenResProfile',
        'snowprofile.Obs',
        'snowprofile.ObsPoint',
        'snowprofile.Point',
        'snowprofile.pointLocation',
        'snowprofile.ProfMetaData',
        'snowprofile.SnowProfileMeasurements',
        'snowprofile.snowProfileResultsOf',
        'snowprofile.specSurfAreaProfile',
        'snowprofile.stratLayer',
        'snowprofile.stratProfile',
        'snowprofile.tempProfile',
        'snowprofile.ThinknessPosition',
        'snowprofile.TimeInstant',
        'snowprofile.TimePeriod',
        'snowprofile.validDepositionTime',
        'snowprofile.validElevation',
        'snowprofile.validThickness',
        'snowprofile.validTime',
        'snowprofile.windDir'
	],
	
	views: [
        'snowprofile.kopf',
        'snowprofile.kopfreadonly',
        'snowprofile.schichtprofil',
        'snowprofile.snowtemperature',
        'snowprofile.stabilitytest',
        'graph.Graph',
        'menuleiste.Menu'
    ],

    init: function() {
        console.log('Snowprofile loaded!');
        this.control({
	    	'toolbar #dataSave': {
				click: this.onClick
			},
			'toolbar #dataLoad': {
				click: this.onClick
			}
		});
        
        this.getSnowprofileStore().on('load', function(store, records, success, operations) {
        	//breakpoint;
        	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			var originalStratProfiles = snowProfileMeassurements.stratProfiles(); 
        			var schichtProfileStore = this.getSchichtprofilStore();
        			schichtProfileStore.getProxy().clear();
        			schichtProfileStore.add(originalStratProfiles.data.items);
        			
        			var originalTempProfiles = snowProfileMeassurements.tempProfile(); 
        			var tempProfileStore = this.getSnowtemperatureStore();
        			tempProfileStore.getProxy().clear();
        			Ext.each(originalTempProfiles.data.items, function(tempLayer, index) {
        				tempLayer.data.snowTemp = tempLayer.data.snowTemp / 10;
    				});
        			tempProfileStore.add(originalTempProfiles.data.items);
        		}, this);
        	}, this);
//        	this.getSchichtprofilStore().loadRawData(store.proxy.reader.jsonData.SnowProfile.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer);
        }, this);
        this.getSchichtprofilStore().on('datachanged', function(schichtprofileStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			var originalStratProfiles = snowProfileMeassurements.stratProfiles(); 
        			var schichtProfileStore = this.getSchichtprofilStore();
        			originalStratProfiles.removeAll(true);
        			originalStratProfiles.add(schichtProfileStore.data.items);
        			snowProfileStore.fireEvent("datachanged", snowProfileStore);
        		}, this);
        	}, this);
//        	this.getSchichtprofilStore().loadRawData(snowProfileStore.proxy.reader.jsonData.SnowProfile.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer);
        }, this);
        this.getSnowtemperatureStore().on('datachanged', function(snowtemperatureStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			var originalTempProfile = snowProfileMeassurements.tempProfile(); 
        			var snowtemperatureStore = this.getSnowtemperatureStore();
        			originalTempProfile.removeAll(true);
        			originalTempProfile.add(snowtemperatureStore.data.items);
        			snowProfileStore.fireEvent("datachanged", snowProfileStore);
        		}, this);
        	}, this);
        }, this);
    },

	onClick: function(item) {
    	var itemId = item.getItemId();
    	var store = Ext.data.StoreManager.lookup('Snowprofile');
    	var storeModel = Ext.ModelManager.getModel('LWD.model.Snowprofile');
    	if(itemId == "dataLoad") {
    		storeModel.load(123, {
    		    success: function(snowprofile) {
    				store.removeAll();
    				store.add(snowprofile);
    		    }
    		});
    		this.getSchichtprofilStore().on('datachanged', function(schichtprofileStore, eOpts) {
            	var snowProfileStore = this.getSnowprofileStore();
            	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
            		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
            			var originalStratProfiles = snowProfileMeassurements.stratProfiles(); 
            			var schichtProfileStore = this.getSchichtprofilStore();
            			originalStratProfiles.removeAll(true);
            			originalStratProfiles.add(schichtProfileStore.data.items);
            			snowProfileStore.fireEvent("datachanged", snowProfileStore);
            		}, this);
            	}, this);
//            	this.getSchichtprofilStore().loadRawData(snowProfileStore.proxy.reader.jsonData.SnowProfile.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer);
            }, this);
    	}
    }
});