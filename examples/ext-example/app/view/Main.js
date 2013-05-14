Ext.define("nineam-localization-plugin-ext.view.Main", {
    extend: 'Ext.Container',

    alias: 'widget.main',

    requires: [
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.picker.Date',
        'nineam.localization.LocaleManager'
    ],

    padding: '10px 10px 10px 10px',

    items: [{
        xtype: 'combobox',
        fieldLabel: 'Locale',
        store: 'localesStore',
        displayField: 'label',
        editable: false,
        valueField: 'id',
        listeners: {
            select: function(combo, records) {
                nineam.localization.LocaleManager.setLocale(records[0].get('id'));
            },

            render: function(scope) {
                scope.setValue(nineam.localization.LocaleManager.getLocale());
            }
        }
    },{
        xtype: 'container',
        height: 10
    },{
        xtype: 'container',
        width: '100%',
        layout: {
            type: 'hbox'
        },

        items: [{
            xtype: 'label',
            width: 160,
            text: 'Label:'
        },{
            xtype: 'label',
            plugins: [
                { ptype: 'localization', method: 'setText', key: 'comp.title' }
            ]
        }]
    },{
        xtype: 'container',
        height: 10
    },{
        xtype: 'container',
        width: '100%',
        layout: {
            type: 'hbox'
        },

        items: [{
            xtype: 'label',
            width: 160,
            text: 'Calender (Custom Method):'
        },{
            xtype: 'datepicker',
            plugins: [
                { ptype: 'localization', method: 'refresh' }
            ]
        }]
    },{
        xtype: 'container',
        height: 10
    },{
        xtype: 'container',
        width: '100%',
        layout: {
            type: 'hbox'
        },

        items: [{
            xtype: 'label',
            width: 160,
            text: 'Button Text/Width:'
        },{
            xtype: 'button',
            plugins: [
                { ptype: 'localization', method: 'setWidth', key: 'btnWidth' },
                { ptype: 'localization', method: 'setText', key: 'title' }
            ]
        }]
    },{
        xtype: 'container',
        height: 10
    },{
        xtype: 'container',
        width: '100%',
        layout: {
            type: 'hbox'
        },

        items: [{
            xtype: 'label',
            width: 160,
            text: 'Panel Title:'
        },{
            xtype: 'panel',
            width: 300,
            height: 60,
            plugins: [
                { ptype: 'localization', method: 'setTitle', key: 'comp.title' }
            ]
        }]
    }]
});