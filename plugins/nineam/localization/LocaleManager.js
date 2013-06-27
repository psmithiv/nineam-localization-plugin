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
     * Set the id of the current locale and load properties file.
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
     * Call specified method on client passing the retrieved value based on the specified key. If a
     * value can not be found on the properties class, this method will next look to the components instance.
     * If no key is specified, the entire properties class instance is passed to the method.
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