Ext.define('nineam.localization.util.Persistence-ExtJS', {
    extend: 'nineam.localization.util.AbstractPersistence',

    requires: [
        'Ext.util.Cookies'
    ],

    LOCALE_COOKIE_ID: 'nineam.localization.util.Persistence-ExtJS.LOCALE_COOKIE_ID',

    getLocale: function() {
        var value = Ext.util.Cookies.get(this.LOCALE_COOKIE_ID);
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Getting persisted locale id: ' + value);
        return value;
    },

    setLocale: function(value) {
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Persisting locale id: ' + value);
        Ext.util.Cookies.set(this.LOCALE_COOKIE_ID,
            value, new Date(new Date().getTime()+(1000*60*60*24*365)));
    }
});