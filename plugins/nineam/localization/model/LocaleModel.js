/**
 * Model object representing a loadable locale.
 */
Ext.define('nineam.localization.model.LocaleModel', {
    extend: 'Ext.data.Model',

    /**
     * Model configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the modelConfig preprocessor.
     *
     * @private
     */
    modelConfig: [
        {name: 'id', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'propertiesClass', type: 'string'}
    ]
});
