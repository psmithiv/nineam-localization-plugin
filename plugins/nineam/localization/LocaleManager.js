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

/**
 * Manager class to handle loading of locale properties
 * files/switching locales/updating registered components.
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
     * @return {nineam.localization.store.LocalesStore}
     */
    getLocales: function() {
        return this.locales;
    },

    /**
     * Set store of available LocaleModel's
     *
     * @param {nineam.localization.store.LocalesStore} value - LocalesStore used by LocaleManager
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
     * @return {string} - Id of currently selected locale
     */
    getLocale: function() {
        return this.locale;
    },

    /**
     * Set the id of the currently locale
     *
     * @param {String} value - Id of locale  to load
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
     * @return {Object}
     */
    getProperties: function() {
        return this.properties;
    },

    /**
     * Get id of last loaded locale
     *
     * @return {String}
     */
    getPersistedLocale: function() {
        //TODO: Fix me
        //Ext.util.Cookies.get('locale');

        return 'en_us';
    },

    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function(config) {
        Ext.log({level: 'log'}, 'DEBUG: Constructing LocaleManager');

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
        var url = rec.get('url');

        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Loading properties file: ' + url);

        fd.loadPropertiesFile(url);
    },

    /**
     * @private
     * @param {String} result
     */
    loadPropertiesFileResultHandler: function(result) {
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Properties file loaded: ' + this.locales.findRecord('id', this.locale).get('url'));

        //write locale file to dom
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = result;
        head.appendChild(script);

        //TODO: For some unknown reason,
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
                Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Locale Manager Initialized');
                me.initialized = true;
                me.fireEvent(nineam.localization.event.LocaleEvent.INITIALIZED, {});
            }
        }, 100);
    },

    /**
     * @private
     */
    loadPropertiesFileFaultHandler: function() {
        Ext.log({level: 'error'}, 'ERROR: LocaleManager - Failure loading properties file');
    },

    /**
     * Go over and update all localized components in the application
     *
     * @private
     */
    updateClients: function() {
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Updating Clients')
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
            Ext.log({level: 'error'}, 'ERROR: LocaleManager - Error updating client [client: ' + client.getId() + ', method: ' + method + ', key: ' + key + ']');
        }
    },

    /**
     * Register a client component for localization
     *
     * @param {nineam.localization.model.ClientModel} clientModel - Model object representing component to localize
     */
    registerClient: function(clientModel) {
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Registering client component [client: ' + clientModel.get('client').getId() + ', method: ' + clientModel.get('method') + ', key: ' + clientModel.get('key') + ']');

        this.clients.push(clientModel);

        if(this.properties)
            this.updateClient(clientModel);
    }
});