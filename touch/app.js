//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    '9am-localization-plugin-touch': 'app',
    'nineam': '/plugins/nineam'
});
//</debug>

Ext.application({
    name: '9am-localization-plugin-touch',

    requires: [
        'nineam.localization.LocaleManager',
        'nineam.localization.LocalePlugin',
        'nineam.localization.model.ClientModel',
        'nineam.localization.store.LocalesStore'
    ],

    views: ['Main'],

    stores: [
        'nineam.localization.store.LocalesStore'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    localesChangedEventHandler: function(event) {
        console.log('STATUS: LocaleManager - LOCALES_CHANGED');
    },

    localeChangedEventHandler: function(event) {
        console.log('STATUS: LocaleManager - LOCALE_CHANGED');
    },

    localeManagerInitializedEventHandler: function(event) {
        console.log('STATUS: LocaleManager - INITIALIZED');
    },

    launch: function() {
        //Configure locale manager
        var lm = nineam.localization.LocaleManager;
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALES_CHANGED, this.localesChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.LOCALE_CHANGED, this.localeChangedEventHandler, this);
        lm.addListener(nineam.localization.event.LocaleEvent.INITIALIZED, this.localeManagerInitializedEventHandler, this);

        var locales = new nineam.localization.store.LocalesStore({
            data: [
                {id: 'en_us', label: 'English', url: '/ext/locales/en_us.json'},
                {id: 'es_us', label: 'Spanish', url: '/ext/locales/es_us.json'}
            ]
        });

        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        locale = locale ? locale : 'en_us';
        lm.setLocale(locale);

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('9am-localization-plugin-touch.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
