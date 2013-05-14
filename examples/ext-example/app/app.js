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
        'nineam.localization.store.LocalesStore',
        'nineam.localization.controls.Date',
        'Ext.form.Label'
    ],

    name: 'nineam-localization-plugin-ext',

    views: ["Main"],

    autoCreateViewport: true,

    init: function() {
        //Configure localization manager
        var lm = nineam.localization.LocaleManager;
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, this.localesChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, this.localeChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);

        var locales = Ext.create('nineam.localization.store.LocalesStore', {
            data: [
                {id: 'en_us', label: 'English', url: 'locale/ext-lang-en.js', propertiesClass: 'Ext.locales.en.Global'},
                {id: 'es_us', label: 'Spanish', url: 'locale/ext-lang-es.js', propertiesClass: 'Ext.locales.es.Global'}
            ]
        });

        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        lm.setLocale(locale);
    },

    localesChangedEventHandler: function(event) {
        //console.log('STATUS: LocaleManager - LOCALES_CHANGED');
    },

    localeChangedEventHandler: function(event) {
        //console.log('STATUS: LocaleManager - LOCALE_CHANGED');
    },

    localeManagerInitializedEventHandler: function(event) {
        //console.log('STATUS: LocaleManager - INITIALIZED')
    }
});