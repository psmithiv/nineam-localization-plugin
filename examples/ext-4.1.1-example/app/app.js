Ext.application({
    requires: [
        'nineam-localization-plugin-ext.controls.Date',
        'Ext.form.Label'
    ],

    name: 'nineam-localization-plugin-ext',

    views: ["Main"],

    autoCreateViewport: true,

    init: function() {
        //Configure localization manager
        var lm = nineam.localization.LocaleManager;
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, this.localesChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALE_LOADING, this.localeLoadingEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, this.localeChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);

        var locales = Ext.create('nineam.localization.store.LocalesStore', {
            data: [
                {id: 'en_us', label: 'English', url: 'locale/ext-lang-en.js', propertiesClass: 'Ext.locales.en.Global'},
                {id: 'es_us', label: 'Spanish', url: 'locale/ext-lang-es.js', propertiesClass: 'Ext.locales.es.Global'},
                {id: 'fr_FR', label: 'French', url: 'locale/ext-lang-fr.js', propertiesClass: 'Ext.locales.fr.Global'}
            ]
        });

        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        lm.setLocale(locale);
    },

    localesChangedEventHandler: function(event) {
        console.log('STATUS EVENT: LocaleManager - LOCALES_CHANGED');
    },

    localeLoadingEventHandler: function(event) {
        console.log('STATUS EVENT: LocaleManager - LOCALE_LOADING');
    },

    localeChangedEventHandler: function(event) {
        console.log('STATUS EVENT: LocaleManager - LOCALE_CHANGED');
    },

    localeManagerInitializedEventHandler: function(event) {
        console.log('STATUS EVENT: LocaleManager - INITIALIZED');
    }
});

