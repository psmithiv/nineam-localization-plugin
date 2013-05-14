/**
 * ExtJS version of a model object representing a loadable locale.
 */
Ext.define('nineam.localization.model.LocaleModel-ExtJS', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'frameworkUrl', type: 'string'},
        {name: 'propertiesClass', type: 'object'}
    ]
});