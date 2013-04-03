/*
 Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)

 nineam-localization-plugin is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 nineam-localization-plugin is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with nineam-localization-plugin.  If not, see <http://www.gnu.org/licenses/>.
*/
Ext.define('nineam.localization.LocaleManager', {
    singleton: true,

    requires: [
        //'Ext.util.Cookies',
        'nineam.localization.event.LocaleEvent',
        'nineam.localization.delegate.LocaleDelegate'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * {Boolean} initialized - Has the LocaleManager has it's available locales set and loaded the initial locale file
     *
     * @private
     */
    initialized: false,

    /**
     * {Array} clients - Array of components to be localized
     *
     * @private
     */
    clients: [],

    /**
     * {nineam.localization.store.LocalesStore} locales - Store of available LocaleModels
     *
     * @private
     */
    locales: null,

    /**
     * Get store of available LocaleModel's
     *
     * @public
     * @return {nineam.locale.store.LocalesStore}
     */
    getLocales: function() {
        return this.locales;
    },

    /**
     * Set store of available LocaleModel's
     *
     * @public
     * @param {nineam.localization.store.LocalesStore} value
     */
    setLocales: function(value) {
        this.locales = value;

        this.fireEvent(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, {});
    },

    /**
     * {String} locale - Id of currently selected locale
     *
     * @private
     */
    locale: null,

    /**
     * Get the id of the currently selected locale
     *
     * @public
     * @return {string}
     */
    getLocale: function() {
        return this.locale;
    },

    /**
     * Set the id of the currently locale
     *
     * @public
     * @param {String} value
     */
    setLocale: function(value) {
        this.locale = value;

        this.loadPropertiesFile();
    },

    /**
     * {Object} properties - Instance of loaded locale properties class
     *
     * @private
     */
    properties: null,

    /**
     * Get loaded locales object
     *
     * @public
     * @return {Object}
     */
    getProperties: function() {
        return this.properties;
    },

    /**
     * Get id of last loaded locale
     *
     * @public
     * @return {String}
     */
    getPersistedLocale: function() {
        //TODO: Fix me
        //Ext.util.Cookies.get('locale');

        return 'en_us';
    },

    /**
     * Constructor
     *
     * @param {Object} config
     */
    constructor: function(config) {
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this, config);
    },

    /**
     * Load properties file for localizing components
     *
     * @private
     */
    loadPropertiesFile: function() {
        //first load resource bundle
        var rec = this.locales.findRecord('id', this.locale);
        var fd = new nineam.localization.delegate.LocaleDelegate(this.loadPropertiesFileResultHandler, this.loadPropertiesFileFaultHandler, this);
        fd.loadPropertiesFile(rec.get('url'));
    },

    /**
     * @private
     * @param {String} result
     */
    loadPropertiesFileResultHandler: function(result) {
        //write locale file to dom
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = result;
        head.appendChild(script);

        var me = this;
        setTimeout(function() {
            //instantiate properties class
            var rec = me.locales.findRecord('id', me.locale);
            me.properties = Ext.create(rec.get('propertiesClass'));

            me.updateClients();

            //Ext.util.Cookies.set('locale', this.locale, new Date(new Date().getTime()+(1000*60*60*24*365)));

            me.fireEvent(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, {});

            if(!me.initialized)
            {
                me.initialized = true;
                me.fireEvent(nineam.localization.event.LocaleEvent.INITIALIZED, {});
            }
        }, 100);
    },

    /**
     * @private
     */
    loadPropertiesFileFaultHandler: function() {

    },

    /**
     * Go over and update all localized components in the application
     *
     * @private
     */
    updateClients: function() {
        var len = this.clients.length-1;
        for(var i=len; i>-1; i--) {
            this.updateClient(this.clients[i]);
        }
    },

    /**
     * Call specified method on client passing the retrieved value based on the specified key. If a
     * value can not be found on the properties class, this method will next look to the components instance.
     * If no key is specified, the entire properties class instance is passed to the methode.
     *
     * @private
     * @param {nineam.localization.model.ClientModel} clientModel
     */
    updateClient: function(clientModel) {
        var client = clientModel.get('client');
        var method = clientModel.get('method');
        var key = clientModel.get('key');

        //call method on comp with value from resource bundle (if key specified)
        try {
            var prop;
            if(key) {
                var global = eval('this.properties.' + key);
                prop = global ? global : eval('client.' + key);
            } else {
                prop = this.properties;
            }
            client[method].call(client, prop);
        } catch(e) {
            console.log('!!! error: ' + e);
        }
    },

    /**
     * Register a client component for localization
     *
     * @public
     * @param {nineam.localization.model.ClientModel} clientModel
     */
    registerClient: function(clientModel) {
        this.clients.push(clientModel);

        if(this.properties)
            this.updateClient(clientModel);
    }
});