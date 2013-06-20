/**
 * Model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 */
Ext.define('nineam.localization.model.ClientModel', {
    extend: 'Ext.data.Model',

    /**
     * Model configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the modelConfig preprocessor.
     *
     * @private
     */
    modelConfig: [
        {name: 'client', type: 'object'},
        {name: 'method', type: 'string'},
        {name: 'key', type: 'string'}
    ]
});