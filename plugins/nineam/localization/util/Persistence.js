/**
 * Util class for persisting/retrieving the last loaded locale id from a cookie
 */
Ext.define('nineam.localization.util.Persistence', {
    singleton: true,

    /**
     * Name to use for persisting locale id to cookie
     *
     * @private
     */
    LOCALE_COOKIE_ID: 'nineam.localization.util.Persistence-ExtJS.LOCALE_COOKIE_ID_1',

    /**
     * Retrieve locale Id from cookie
     *
     * @return {String} - The persisted locale Id
     */
    getLocale: function() {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + this.LOCALE_COOKIE_ID + "=");
        if (c_start == -1)
        {
            c_start = c_value.indexOf(this.LOCALE_COOKIE_ID + "=");
        }
        if (c_start == -1)
        {
            c_value = null;
        }
        else
        {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start,c_end));
        }

        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Getting persisted locale id: ' + c_value);

        return c_value;
    },

    /**
     * Persist locale Id to cookie
     *
     * @param {String} value - the id of the locale to persist
     */
    setLocale: function(value) {
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Persisting locale id: ' + value);

        var c_value = escape(value) + "; expires="+new Date(new Date().getTime()+(1000*60*60*24*365)).toUTCString();
        document.cookie = this.LOCALE_COOKIE_ID + "=" + c_value;
    }
});