/**
 * Delegate class responsable for loading locale property file.
 */
Ext.define('nineam.localization.delegate.LocaleDelegate', {
    requires: [
        'Ext.Ajax'
    ],

    /**
     * Success method to call when loading locale file.
     *
     * @private
     */
    success: function() {},

    /**
     * Fault method to call when loading locale file.
     *
     * @private
     */
    failure: function() {},

    /**
     * Scope to execute success/failure method within.
     *
     * @private
     */
    scope: '',

    /**
     * Constructor
     *
     * @param {Function} success
     * @param {Function} failure
     * @param {Object} scope
     */
    constructor: function(success, failure, scope) {
        this.callParent(arguments);

        this.success = success;
        this.failure = failure;
        this.scope = scope;
    },

    /**
     * Load locale file at specified url
     *
     * @param {String} url - url of locale file to load
     */
    loadPropertiesFile: function(url) {
        if(!this.success || !this.scope)
            return;

        Ext.Ajax.request({
            url: url,
            success: this.ajaxSuccess,
            failure: this.ajaxFailure,
            scope: this
        });
    },

    /**
     * Ajax success handler
     *
     * @private
     * @param {String} response
     */
    ajaxSuccess: function(response) {
        this.success.call(this.scope, response.responseText);
    },

    /**
     * Ajax failure handler
     *
     * @private
     */
    ajaxFailure: function() {
        //TODO: Implement fault handling
    }
});