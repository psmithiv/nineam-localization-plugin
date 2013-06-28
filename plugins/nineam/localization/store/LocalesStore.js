/**
 * Store containing a list of LocaleModel objects.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.reader.Json'
    ],

    /**
     * Store configuration object for managing differences between ExtJS and ST2.
     *
     * This object is handled by the storeConfig preprocessor.
     *
     * @private
     */
    storeConfig: {
        storeId: 'localesStore',

        model: 'nineam.localization.model.LocaleModel',

        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: ''
            }
        }
    }
});
