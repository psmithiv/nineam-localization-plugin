/*!
LocaleManager Plugin 0.1.0

Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/**
 * Touch version of a model object representing a loadable locale.
 */
Ext.define('nineam.localization.model.LocaleModel-Touch', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'label', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'propertiesClass', type: 'string'}
        ]
    }
});/**
 * ExtJS version of a model object representing a loadable locale.
 */
Ext.define('nineam.localization.model.LocaleModel-ExtJS', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'frameworkUrl', type: 'string'},
        {name: 'propertiesClass', type: 'object'}
    ]
});/**
 * Model object representing a loadable locale.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.model.LocaleModel', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.model.LocaleModel-ExtJS' : 'nineam.localization.model.LocaleModel-Touch'
});/**
 * Touch version of a model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 */
Ext.define('nineam.localization.model.ClientModel-Touch', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'client', type: 'object'},
            {name: 'method', type: 'string'},
            {name: 'key', type: 'string'}
        ]
    }
});/**
 * ExtJS version of a model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 */
Ext.define('nineam.localization.model.ClientModel-ExtJS', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'client', type: 'object'},
        {name: 'method', type: 'string'},
        {name: 'key', type: 'string'}
    ]
});/**
 * Model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.model.ClientModel', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.model.ClientModel-ExtJS' : 'nineam.localization.model.ClientModel-Touch'
});/**
 * Touch version of a store containing a list of LocaleModel objects.
 */
Ext.define('nineam.localization.store.LocalesStore-Touch', {
    extend: 'Ext.data.Store',

    requires: [
        'nineam.localization.model.LocaleModel'
    ],

    config: {
        storeId: 'localesStore',

        model: 'nineam.localization.model.LocaleModel',

        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: ''
            }
        }
    }
});/**
 * ExtJS version of a store containing a list of LocaleModel objects.
 */
Ext.define('nineam.localization.store.LocalesStore-ExtJS', {
    extend: 'Ext.data.Store',

    requires: [
        'nineam.localization.model.LocaleModel'
    ],

    storeId: 'localesStore',

    model: 'nineam.localization.model.LocaleModel',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: ''
        }
    }
});Ext.define('nineam.localization.util.Persistence-ExtJS', {
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
});Ext.define('nineam.localization.util.Persistence', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.util.Persistence-ExtJS' : 'nineam.localization.util.Persistence-Touch',
    singleton: true
});/**
 * Store containing a list of LocaleModel objects.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.store.LocalesStore-ExtJS' : 'nineam.localization.store.LocalesStore-Touch'
});/**
 * Locale event object w/ event names
 */
Ext.define('nineam.localization.event.LocaleEvent', {
    statics: {
        /**
         * The LocaleManager has loaded it's first locale file and is now initialized.
         *
         * @event
         */
        INITIALIZED: 'nineam.localization.event.LocaleEvent.INITIALIZED',

        /**
         * The current list of available locales has changed.
         *
         * @event
         */
        LOCALES_CHANGED: 'nineam.localization.event.LocaleEvent.LOCALES_CHANGED',

        /**
         * The currently selected locale has changed.
         *
         * @event
         */
        LOCALE_CHANGED: 'nineam.localization.event.LocaleEvent.LOCALE_CHANGED'
    }
});/**
 * Delegate class responsable for loading locale property file.
 */
Ext.define('nineam.localization.delegate.LocaleDelegate', {
    requires: [
        'Ext.Ajax'
    ],

    /**
     * Success method to call when loading locale file
     *
     * @private
     */
    success: {},

    /**
     * Fault method to call when loading locale file
     * @private
     */
    failure: {},

    /**
     * Scope to execute success/failure method within
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
});/**
 * Manager class to handle loading of locale properties
 * files/switching locales/updating registered components.
 *
 *
 * Configuring the plugin:
 *     init(ExtJS)/launch(Touch): function() {
 *          var lm = nineam.localization.LocaleManager;
 *          lm.addListener(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, this.localesChangedEventHandler, this);
 *          lm.addListener(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, this.localeChangedEventHandler, this);
 *          lm.addListener(nineam.localization.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);
 *
 *          var locales = Ext.create('nineam.localization.store.LocalesStore', {
 *              data: [
 *                  {id: 'en_us', label: 'English', url: 'locale/ext-lang-en.js', propertiesClass: 'Ext.locales.en.Global'},
 *                  {id: 'es_us', label: 'Spanish', url: 'locale/ext-lang-es.js', propertiesClass: 'Ext.locales.es.Global'}
 *              ]
 *          });
 *
 *          lm.setLocales(locales);
 *
 *          var locale = lm.getPersistedLocale();
 *          lm.setLocale(locale);
 *     }
 *
 * Localizing a component:
 *      {
 *          xtype: 'label',
 *          plugins: [
 *              { ptype: 'localization', method: 'setText', key: 'title' }
 *          ]
 *      }
 */
Ext.define('nineam.localization.LocaleManager', {
    singleton: true,

    requires: [
        'nineam.localization.event.LocaleEvent',
        'nineam.localization.delegate.LocaleDelegate',
        'nineam.localization.util.Persistence'
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
     * Get value from locale file
     *
     * @param {String}  key - Key to use to look up value in locale file
     * @return {Object}
     */
    getProperty: function(key) {
        return eval('this.properties.' + key);;
    },

    /**
     * Get id of last loaded locale. If locale is not found in locales, first locale in
     * locales is returned.
     *
     * @return {String} - Defaults to first id in locales collection
     */
    getPersistedLocale: function() {
        var locale = nineam.localization.util.Persistence.getLocale();
        return this.locales.find('id', locale) ? locale : this.locales.getAt(0).get('id');
    },

    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function(config) {
        //TODO: This needs to be a more robust solution
        //Fix discrepancies between ExtJS and ST2 logging
        if(typeof(Ext.log) != 'function') {
            Ext.log = function(config, message) { console.log(message) }
        }

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

        //TODO: Fix Me - It seems that ST2 contains a delay before the onReady method on the locale file is fired.
        var me = this;
        setTimeout(function() {
            //instantiate properties class
            var rec = me.locales.findRecord('id', me.locale);
            me.properties = Ext.create(rec.get('propertiesClass'));

            me.updateClients();

            nineam.localization.util.Persistence.setLocale(me.locale);

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
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Updating Clients');
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
     * @param {nineam.localization.model.ClientModel} clientModel - Model object representing the component to be updated
     */
    updateClient: function(clientModel) {
        var client = clientModel.get('client');
        var method = clientModel.get('method');
        var key = clientModel.get('key');

        //first look to locale properties for value.
        //if key does not exist on locale properties for for key on component.
        //otherwise, pass entire properties object
        try {
            var prop;
            if(key) {
                var global = this.getProperty(key);
                prop = global ? global : eval('client.' + key);
            } else {
                prop = this.properties;
            }
            client[method].call(client, prop);
        } catch(e) {
            Ext.log({level: 'error'}, 'ERROR: LocaleManager - Error updating client [client: ' + client.getId() + ', method: ' + method + ', key: ' + key + '] - error: ' + e);
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
});/**
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