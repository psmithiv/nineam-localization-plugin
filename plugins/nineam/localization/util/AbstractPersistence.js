Ext.define('nineam.localization.util.AbstractPersistence', {
    getLocale: function() {
        Ext.log({level: 'log'}, 'ERROR: getLocale() is an abstract interface method and should be overridden.');
    },

    setLocale: function(value) {
        Ext.log({level: 'log'}, 'ERROR: setLocale() is an abstract interface method and should be overridden.');
    }
});