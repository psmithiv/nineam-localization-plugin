Ext.define("nineam-localization-plugin-ext.view.Main", {
    extend: 'Ext.Container',

    alias: 'widget.main',

    requires: [
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.picker.Date',
        'nineam-localization-plugin-ext.controls.LocalesComboBox'
    ],

    padding: '10px 10px 10px 10px',

    items: [{
        xtype: 'localesCombobox',
        fieldLabel: 'Locale',
        labelWidth: 155,
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
        },

        plugins: [
            { ptype: 'localization', method: 'refresh', key: 'localeLabels' }
        ]
    },{
        xtype: 'container',
        width: '100%',
        height: 1,
        margin: '10px 0px 10px 0px',
        style: 'border-style: solid none none none; border-color: #000000; border-width: 1px;'
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
                { ptype: 'localization', method: 'setText', key: 'label' }
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
            padding: '3px 0px 0px 0px',
            text: 'Button Text/Width:'
        },{
            xtype: 'button',
            plugins: [
                { ptype: 'localization', method: 'setWidth', key: 'button.width' },
                { ptype: 'localization', method: 'setText', key: 'button.label' }
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
            padding: '5px 0px 0px 0px',
            text: 'Panel Title:'
        },{
            xtype: 'panel',
            width: 300,
            height: 60,
            plugins: [
                { ptype: 'localization', method: 'setTitle', key: 'panel.title' }
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
            padding: '6px 0px 0px 0px',
            text: 'Calender (Custom Method):'
        },{
            xtype: 'datepicker',
            plugins: [
                { ptype: 'localization', method: 'refresh' }
            ]
        }]
    }]
});