Ext.define('9am-localization-plugin-touch.view.Main', {
    extend: 'Ext.Container',

    requires: [
        'Ext.dataview.List',
        'Ext.TitleBar',
        'Ext.Label'
    ],

    stores: [
        'nineam.localization.store.LocalesStore'
    ],

    config: {


        layout: {
            type: 'vbox'
        },

        items: [{
            xtype: 'titlebar',
            width: '100%',
            title: '9am-localization-plugin'
        },{
            xtype: 'container',
            width: '100%',
            flex: 1,

            layout: {
                type: 'hbox'
            },

            items: [{
                xtype: 'list',
                width: 300,
                itemTpl: '{label}',
                store: 'localesStore',

                listeners: {
                    select: function(scope, record) {
                        nineam.localization.LocaleManager.setLocale(record.get('id'));
                    },

                    refresh: function(scope) {
                        var lm = nineam.localization.LocaleManager;
                        var selectedLocale = lm.getLocales().find('id', lm.getLocale())
                        scope.select(selectedLocale, false, true);
                    }
                }
            },{
                xtype: 'label',
                html: 'hello',
                width: 500,
                plugins: [
                    { type: 'localization', method: 'setHtml', key: 'title' }
                ]
            }]
        }]
    }
});
