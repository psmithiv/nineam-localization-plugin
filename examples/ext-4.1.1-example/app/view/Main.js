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
        fieldLabel: 'Locale (Custom Class Method)',
        labelWidth: 175,
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

        //Advanced Example: Custom method on component using class extension
        plugins: [
            { ptype: 'localization', method: 'refresh', key: 'localeLabels' }
        ]
    },{
        xtype: 'container',
        width: '100%',
        height: 1,
        margin: '5px 0px 0px 0px',
        style: 'border-style: solid none none none; border-color: #000000; border-width: 1px;'
    },{
        xtype: 'container',
        height: 30
    },{
        xtype: 'label',
        text: 'Basic Examples:'
    },{
        xtype: 'container',
        width: '100%',
        height: 1,
        margin: '5px 0px 10px 0px',
        style: 'border-style: solid none none none; border-color: #000000; border-width: 1px;'
    },{
        xtype: 'container',
        width: '100%',
        layout: {
            type: 'hbox'
        },

        items: [{
            xtype: 'label',
            width: 180,
            text: 'Label (setText):'
        },{
            xtype: 'label',
            //Basic Example
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
            width: 180,
            padding: '3px 0px 0px 0px',
            text: 'Button (setWidth/setText):'
        },{
            xtype: 'button',
            //Basic Example
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
            width: 180,
            padding: '5px 0px 0px 0px',
            text: 'Panel (setTitle):'
        },{
            xtype: 'panel',
            width: 300,
            height: 60,
            //Basic Example
            plugins: [
                { ptype: 'localization', method: 'setTitle', key: 'panel.title' }
            ]
        }]
    },{
        xtype: 'container',
        height: 30
    },{
        xtype: 'label',
        text: 'Advanced Examples:'
    },{
        xtype: 'container',
        width: '100%',
        height: 1,
        margin: '5px 0px 10px 0px',
        style: 'border-style: solid none none none; border-color: #000000; border-width: 1px;'
    },{
        xtype: 'container',
        width: '100%',
        layout: {
            type: 'hbox'
        },

        items: [{
            xtype: 'label',
            width: 180,
            text: 'CSS Class (Custom Inline Method):'
        },{
            xtype: 'container',
            width: 100,
            height: 40,
            //Advanced Example: Inline custom method
            plugins: [
                { ptype: 'localization', method: function(newCls) {
                    this.removeCls(this.oldCls);
                    this.addCls(newCls);
                    this.oldCls = newCls;
                }, key: 'cssCls' }
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
            width: 180,
            padding: '6px 0px 0px 0px',
            text: 'Calender (Sencha Locale Properties + Custom Class Method):'
        },{
            xtype: 'datepicker',
            //Advanced Example: Custom method on component using override
            plugins: [
                { ptype: 'localization', method: 'refresh' }
            ]
        }]
    }]
});