/**
 * Touch version of a model object representing a loadable locale.
 */
Ext.define('nineam.localization.model.LocaleModel-Touch', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'label', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'propertiesClass', type: 'string'}
        ]
    }
});