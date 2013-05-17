/**
 * ExtJS/Touch plugin used to register component with LocaleManager.
 */
Ext.define('nineam.localization.LocalePlugin', {
    extend: Ext.getVersion('extjs') ? 'Ext.AbstractPlugin' : 'Ext.Component',
    alias: 'plugin.localization',

    requires: [
        'nineam.localization.LocaleManager',
        'nineam.localization.model.ClientModel'
    ],

    config: {
        /**
         * Method to call on component when locale chagnes.
         *
         * @cfg {String} method
         */
        method: "",

        /**
         * Key to use to lookup value on locale properties class.
         *
         * @cfg {String} key
         */
        key: ""
    },

    /**
     * Init method called by plugin framework when a component gets instantiated.
     * Responsible for registering client with LocaleManager.
     *
     * @param {Ext.Component} client - Component to register with LocaleManager for localization.
     */
    init: function(client) {
        var cm = Ext.create('nineam.localization.model.ClientModel', {
            client: client,
            method: this.getMethod(),
            key: this.getKey()
        });

        nineam.localization.LocaleManager.registerClient(cm);
    }
});