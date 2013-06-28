/*!
LocaleManager Plugin 0.1.0

Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/**
 * Class preprocessor to rectify different base class's in ExtJS 4+ and ST2 when using the plugin architecture.
 * If ExtJS, extend extendConfig.extjs
 * If ST2, extend extendConfig.st
 */
Ext.Class.registerPreprocessor('extendConfig', function(cls, data, hooks, fn) {
    if(Ext.getVersion('extjs')) {
        data.extend = data.extendConfig.extjs;
    } else {
        data.extend = data.extendConfig.st;
    }
}, false, 'before', 'extend');

/**
 * Class preprocessor to rectify differences between ExtJS 4+ and ST2 when defining models
 * If ExtJS, write modelConfig to class
 * If ST2, write modelConfig to class.config
 */
Ext.Class.registerPreprocessor('modelConfig', function(cls, data, hooks, fn) {
    var target;
    if(Ext.getVersion('extjs')) {
        target = data;
    } else {
        if(!data.config)
            data.config = {};

        target = data.config;
    }

    target.fields = data.modelConfig;
}, false, 'before', 'extend');

/**
 * Class preprocessor to rectify differences between ExtJS 4+ and ST2 when defining stores
 * If ExtJS, write storeConfig to class
 * If ST2, write storeConfig to class.config
 */
Ext.Class.registerPreprocessor('storeConfig', function(cls, data, hooks, fn) {
    var target;
    if(Ext.getVersion('extjs')) {
        target = data;
    } else {
        if(!data.config)
            data.config = {};

        target = data.config;
    }

    for(var i in data.storeConfig) {
        target[i] = data.storeConfig[i];
    }

    // Exclude LocaleModel from being handled by Ext.Loader since we
    // know for sure that it exists. (removes 404 warning at startup)
    if(Ext.getVersion('extjs'))
        Ext.exclude(data.model).require('*');
}, false, 'before', 'extend');
/**
 * Model object representing a loadable locale.
 */
Ext.define('nineam.localization.model.LocaleModel', {
    extend: 'Ext.data.Model',

    /**
     * Model configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the modelConfig preprocessor.
     *
     * @private
     */
    modelConfig: [
        {name: 'id', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'propertiesClass', type: 'string'}
    ]
});
/**
 * Store containing a list of LocaleModel objects.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.reader.Json'
    ],

    /**
     * Store configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the storeConfig preprocessor.
     *
     * @private
     */
    storeConfig: {
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
});
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
    LOCALE_COOKIE_ID: 'nineam.localization.util.Persistence-ExtJS.LOCALE_COOKIE_ID_2',

    /**
     * Retrieve locale Id from cookie
     *
     * @return {String} - The persisted locale Id
     */
    getLocale: function() {
        var regex = new RegExp('(?:^|;)\\s?' + this.LOCALE_COOKIE_ID + '=(.*?)(?:;|$)','i');
        var match = document.cookie.match(regex);
        var value = match ? unescape(match[1]) : null;;

        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Getting persisted locale id: ' + value);

        return value;
    },

    /**
     * Persist locale Id to cookie
     *
     * @param {String} value - the id of the locale to persist
     */
    setLocale: function(value) {
        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Persisting locale id: ' + value);

        document.cookie = this.LOCALE_COOKIE_ID + "=" + escape(value) + "; expires="+new Date(new Date().getTime()+(1000*60*60*24*365)).toUTCString();
    }
});
/**
 * Model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 */
Ext.define('nineam.localization.model.ClientModel', {
    extend: 'Ext.data.Model',

    /**
     * Model configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the modelConfig preprocessor.
     *
     * @private
     */
    modelConfig: [
        {name: 'client', type: 'object'},
        {name: 'method', type: 'object'},
        {name: 'key', type: 'string'}
    ]
});
/**
 * Locale event object w/ event names
 */
Ext.define('nineam.localization.event.LocaleEvent', {
    statics: {
        /**
         * The LocaleManager has loaded it's first locale file, updated all components, and is now initialized.
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
         * Loading the locale file for the currently selected locale
         *
         * @event
         */
        LOCALE_LOADING: 'nineam.localization.event.LocaleEvent.LOCALE_LOADING',

        /**
         * The currently selected locale has changed.
         *
         * @event
         */
        LOCALE_CHANGED: 'nineam.localization.event.LocaleEvent.LOCALE_CHANGED'
    }
});
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
    success: {},

    /**
     * Fault method to call when loading locale file.
     *
     * @private
     */
    failure: {},

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
/**
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

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * Has the LocaleManager had it's available locales set and loaded the initial locale file.
     */
    initialized: false,

    /**
     * Array of {nineam.localization.model.ClientModel}'s to use for localization.
     *
     * @private
     */
    clients: [],

    /**
     * {nineam.localization.store.LocalesStore} of available LocaleModels.
     *
     * @private
     */
    locales: null,

    /**
     * Get store of available LocaleModel's.
     *
     * @return {nineam.localization.store.LocalesStore}
     */
    getLocales: function() {
        return this.locales;
    },

    /**
     * Set store of available LocaleModel's.
     *
     * @param {nineam.localization.store.LocalesStore} value - LocalesStore used by LocaleManager
     */
    setLocales: function(value) {
        this.locales = value;

        this.fireEvent(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, {});
    },

    /**
     * Id of currently selected locale.
     *
     * @private
     */
    locale: '',

    /**
     * Get the id of the currently selected locale.
     *
     * @return {String} - Id of currently selected locale
     */
    getLocale: function() {
        return this.locale;
    },

    /**
     * Set the id of the current locale, load properties file, and update components.
     *
     * @param {String} value - Id of locale to load
     */
    setLocale: function(value) {
        this.fireEvent(nineam.localization.event.LocaleEvent.LOCALE_LOADING, {});

        this.locale = value;

        this.loadPropertiesFile();
    },

    /**
     * Instance of loaded locale properties class.
     *
     * @private
     */
    properties: null,

    /**
     * Get value from locale file.
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
     * @return {String} - Defaults to first id in locales store
     */
    getPersistedLocale: function() {
        var locale = nineam.localization.util.Persistence.getLocale();
        return this.locales.find('id', locale) != -1 ? locale : this.locales.getAt(0).get('id');
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
     * Load properties file for localizing components.
     *
     * @private
     */
    loadPropertiesFile: function() {
        //first load resource bundle
        var rec = this.locales.findRecord('id', this.locale);

        var fd = Ext.create('nineam.localization.delegate.LocaleDelegate', this.loadPropertiesFileResultHandler, this.loadPropertiesFileFaultHandler, this);
        var url = rec.get('url');

        Ext.log({level: 'log'}, 'DEBUG: LocaleManager - Loading properties file: ' + url);

        fd.loadPropertiesFile(url);
    },

    /**
     * Result handler for call to load locale properties file.
     *
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
     * Fault handler for call to load locale properties file.
     *
     * @private
     */
    loadPropertiesFileFaultHandler: function() {
        Ext.log({level: 'error'}, 'ERROR: LocaleManager - Failure loading properties file');
    },

    /**
     * Go over and update all localized components in the application.
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
     * Call specified method on client passing the retrieved value based on the specified key.
     * If a value can not be found on the properties class or no key is specified,
     * the entire properties class instance is passed to the method.
     *
     * @private
     * @param {nineam.localization.model.ClientModel} clientModel - Model object representing the component to be updated
     */
    updateClient: function(clientModel) {
        var client = clientModel.get('client');
        var method = clientModel.get('method');
        var key = clientModel.get('key');

        //First look to locale properties for value.
        //If key does not exist on locale properties or is not specified,
        //pass entire properties object.
        try {
            var prop;
            if(key) {
                var global = this.getProperty(key);
                prop = global ? global : this.properties;
            } else {
                prop = this.properties;
            }

            if(typeof(method) === 'string') {
                client[method].call(client, prop);
            } else if(typeof(method) === 'function') {
                method.call(client, prop);
            }
        } catch(e) {
            Ext.log({level: 'error'}, 'ERROR: LocaleManager - Error updating client [client: ' + client.getId() + ', method: ' + method + ', key: ' + key + '] - error: ' + e);
        }
    },

    /**
     * Register a client component for localization.
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
/**
 * ExtJS/Touch plugin used to register component with LocaleManager.
 */
Ext.define('nineam.localization.LocalePlugin', {
    /**
     * Extend configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the extendConfig preprocessor.
     *
     * @private
     */
    extendConfig: {
        extjs: 'Ext.AbstractPlugin',
        st: 'Ext.Component'
    },

    alias: 'plugin.localization',

    config: {
        /**
         * Method to call on component when locale changes.
         *
         * @cfg {String} method
         */
        method: {},

        /**
         * Key to use to lookup value on locale properties class.
         *
         * @cfg {String} key
         */
        key: ''
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
