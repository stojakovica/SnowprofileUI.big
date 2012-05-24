Ext.define('LWD.store.schneeprofil.Schichtprofile', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
	model: 'LWD.model.schneeprofil.Schichtprofil',
	proxy: {
        type: 'rest',
        url: '/lwd/snowprofile',
        reader: {
            type: 'json',
            root: 'schichtprofile'
        },
        writer: {
            type: 'json'
        }
    },
    listeners: {
        write: function(store, operation){
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action),
                verb;
        }
    },
    sorters: [{
        property: 'vonHoehe',
        direction:'DESC'
    }]
});