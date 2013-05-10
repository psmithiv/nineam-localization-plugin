/*
LocaleManager 0.1.0

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
});/*
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
});/*
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
 * Model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.model.ClientModel', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.model.ClientModel-ExtJS' : 'nineam.localization.model.ClientModel-Touch'
});/*
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
});/*
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
});/*
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
 * Model object representing a loadable locale.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.model.LocaleModel', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.model.LocaleModel-ExtJS' : 'nineam.localization.model.LocaleModel-Touch'
});/*
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
});/*
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
});/*
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
 * Store containing a list of LocaleModel objects.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.store.LocalesStore-ExtJS' : 'nineam.localization.store.LocalesStore-Touch'
}); /*
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
  * Patch for Ext.picker.Date to allow for updating local at runtime.
  */
Ext.define('nineam.localization.controls.Date', {
    override: 'Ext.picker.Date',

    /*mixin: [
        'nineam.localization.controls.ILocalization'
    ],*/
    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
        '<div role="presentation" class="{baseCls}-header">',
        '<div class="{baseCls}-prev"><a id="{id}-prevEl" href="#" role="button" title="{prevText}"></a></div>',
        '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
        '<div class="{baseCls}-next"><a id="{id}-nextEl" href="#" role="button" title="{nextText}"></a></div>',
        '</div>',
        '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
        '<thead role="presentation"><tr role="presentation">',
        '<tpl for="dayNames">',
        '<th role="columnheader" title="{.}"><span>{.:this.firstInitial}</span></th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody role="presentation"><tr role="presentation">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        '<a role="presentation" href="#" hidefocus="on" class="{parent.baseCls}-date" tabIndex="1">',
        '<em role="presentation"><span role="presentation"></span></em>',
        '</a>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    /**
     * Refresh component now that local has been
     */
    refresh: function() {
        var today = Ext.Date.format(new Date(), this.format);

        if (this.showToday) {
            this.todayBtn.setText(Ext.String.format(this.todayText, today));
            this.todayBtn.setTooltip(Ext.String.format(this.todayTip, today));
        }

        this.monthBtn.setTooltip(this.monthYearText);

        this.update(this.activeDate, true);

        // 'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
        this.innerEl.dom.title = Ext.String.format(this.ariaTitle, Ext.Date.format(this.activeDate, this.ariaTitleDateFormat));
        this.prevEl.dom.title = this.prevText;
        this.nextEl.dom.title = this.nextText;

        this.picker = null;
        this.hideMonthPicker(true);
    }
});/*
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
});/*
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
});/*
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
});/*
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
 * ExtJS/Touch plugin used to register component with LocaleManager.
 */
Ext.define('nineam.localization.LocalePlugin', {
    extend: Ext.getVersion('extjs') ? 'Ext.AbstractPlugin' : 'Ext.Component',
    alias: 'plugin.localization',

    required: [
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