Ext.define('nineam-localization-plugin-ext.view.Viewport', {
    extend: 'Ext.container.Viewport',

    renderTo: Ext.getBody(),

    requires: [
        'nineam-localization-plugin-ext.view.Main'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'main'
    }]
});