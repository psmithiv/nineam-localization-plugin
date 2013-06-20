/**
 * Store containing a list of LocaleModel objects.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.reader.Json'
    ],

    //handled by storeConfig preprocessor
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