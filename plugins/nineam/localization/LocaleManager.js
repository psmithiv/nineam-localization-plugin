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
        'nineam.localization.delegate.LocaleDelegate',
        'nineam.localization.delegate.FrameworkLocaleDelegate'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * Constructs a new LocaleManager instance
     */
    constructor: function(config) {
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this, config);

        //private
        var initialized = false;

        var _locales = null;
        var _locale = null;
        var _properties = null;

        var clients = [];

        var filesLoaded = 0;
        /**
         * Load properties file for localizing components
         *
         * @private
         */
        function loadPropertiesFile() {
            //first load framework resource bundle
            var rec = _locales.findRecord('id', _locale);
            var fd = new nineam.localization.delegate.FrameworkLocaleDelegate(loadFrameworkPropertiesFileResultHandler, loadFrameworkPropertiesFileFaultHandler, this);
            fd.loadFrameworkPropertiesFile(rec.get('url'));
        }

        /**
         * @private
         * @param {String} result
         */
        function loadFrameworkPropertiesFileResultHandler(result) {
            //write resource bundle to dom
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = result;
            head.appendChild(script);

            var rec = _locales.findRecord('id', _locale);
            _properties = Ext.create(rec.get('propertiesClazz'));

            updateClients();

            //Ext.util.Cookies.set('locale', _locale, new Date(new Date().getTime()+(1000*60*60*24*365)));

            this.fireEvent(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, {});

            if(!initialized)
            {
                initialized = true;
                this.fireEvent(nineam.localization.event.LocaleEvent.INITIALIZED, {});
            }
        }

        /**
         * @private
         */
        function loadFrameworkPropertiesFileFaultHandler() {

        }

        /**
         * Go over and update all localized components in the application
         * @private
         */
        function updateClients() {
            var len = clients.length-1;
            for(var i=len; i>-1; i--) {
                setClient(clients[i]);
            }
        }

        /**
         * Call specif method on client object and pass value from _properties based on key
         *
         * @private
         * @param {nineam.localization.model.ClientModel} clientModel
         */
        function setClient(clientModel) {
            var client = clientModel.get('client');
            var method = clientModel.get('method');
            var key = clientModel.get('key');

            //call method on comp with value from resource bundle (if key specified)
            try {
                var prop;
                if(key) {
                    var global = eval('_properties.' + key);
                    prop = global ? global : eval('client.' + key);
                } else {
                    prop = _properties;
                }
                //var prop = key ? eval('_properties.' + key) : _properties;
                client[method].call(client, prop);
            } catch(e) {
                console.log('!!! error: ' + e);
            }
        }

        /*

         //if(!parent.dom)
         //    return;
         / *
         var toSet =  {};
         for(var i in orig) {
         if(typeof orig[i] == 'function') {
         if(i.indexOf('get') > -1) {
         try {
         toSet[i.replace('get', 'set')] = orig[i]();
         } catch(e) {}
         }
         }
         }

         //destroy original component
         orig.destroy();

         //create new comp using orig's initialConfig
         var newComp = Ext.create(className, conf);

         //repopulate new comp with orig comps properties
         for(var ii in toSet) {
         try {
         newComp[ii](toSet[ii]);
         } catch(e) {}
         }
         * /
        //call setters on new comp with values from resource bundle
        try {
            console.log('key: ' + key + ' - value: ' + eval('_properties.' + key));
            newComp[method].call(newComp, eval('_properties.' + key));
        } catch(e) {}

        / *
         //execute custom method within scope of new component
         //TODO

         //add new component to original components parent
         parent.add(newComp);
         * /

        //remove old clientModel (new clientModel was added to array when newComp was created)
        clients.splice(clients.indexOf(clientModel), 1);
        */

        /**
         * Get store of available locales
         *
         * @public
         * @return {nineam.locale.store.LocalesStore}
         */
        this.getLocales = function() {
            return _locales;
        },

        /**
         * Set store of available locales
         *
         * @public
         * @param value:nineam.localization.store.LocalesStore
         */
        this.setLocales = function(value) {
            _locales = value;

            this.fireEvent(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, {});
        },

        /**
         * Get the currently selected locale
         *
         * @public
         * @return {string}
         */
        this.getLocale = function() {
            return _locale;
        },

        /**
         * Set the current locale
         *
         * @public
         * @param value:String
         */
        this.setLocale = function(value) {
            _locale = value;

            loadPropertiesFile.call(this);
        },

        /**
         * Get loaded locales object
         *
         * @public
         * @return {{}}
         */
        this.getProperties = function() {
            return _properties;
        },

        /**
         * Get id of last loaded locale
         *
         * @public
         * @return {string}
         */
        this.getPersistedLocale = function() {
            return 'en_us'; //Ext.util.Cookies.get('locale');
        },

        /**
         * Register a client component for localization
         *
         * @public
         * @param {nineam.localization.model.ClientModel} clientModel
         */
        this.registerClient = function(clientModel) {
            clients.push(clientModel);

            if(_properties)
                setClient(clientModel);
        }
    }
});