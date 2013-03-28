/*
 Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)

 9am-localization-plugin is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 9am-localization-plugin is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with 9am-localization-plugin.  If not, see <http://www.gnu.org/licenses/>.
*/
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        nineam: '/plugins/nineam'
    }
});

Ext.application({
    requires: [
        'nineam.localization.LocaleManager',
        'nineam.localization.LocalePlugin',
        'nineam.localization.model.ClientModel',
        'nineam.localization.store.LocalesStore'
    ],

    name: '9am-localization-plugin-ext',

    views: ["Main"],

    stores: [
        'nineam.localization.store.LocalesStore'
    ],
    autoCreateViewport: true,

    init: function() {
        //Configure localization manager
        var lm = nineam.localization.LocaleManager;
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, this.localesChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, this.localeChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);

        var locales = Ext.create('nineam.localization.store.LocalesStore', {
            data: [
                {id: 'en_us', label: 'English', url: '/touch/locales/en_us.json'},
                {id: 'es_us', label: 'Spanish', url: '/touch/locales/es_us.json'}
            ]
        });

        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        locale = locale ? locale : 'en_us';
        lm.setLocale(locale);
    },

    localesChangedEventHandler: function(event) {
        console.log('STATUS: LocaleManager - LOCALES_CHANGED');
    },

    localeChangedEventHandler: function(event) {
        console.log('STATUS: LocaleManager - LOCALE_CHANGED');
    },

    localeManagerInitializedEventHandler: function(event) {
        console.log('STATUS: LocaleManager - INITIALIZED')
    }
});
