/**
 * Touch version of a model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 */
Ext.define('nineam.localization.model.ClientModel-Touch', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'client', type: 'object'},
            {name: 'method', type: 'string'},
            {name: 'key', type: 'string'}
        ]
    }
});