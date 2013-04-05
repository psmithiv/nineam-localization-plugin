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