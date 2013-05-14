/**
 * ExtJS version of a store containing a list of LocaleModel objects.
 */
Ext.define('nineam.localization.store.LocalesStore-ExtJS', {
    extend: 'Ext.data.Store',

    requires: [
        'nineam.localization.model.LocaleModel'
    ],

    storeId: 'localesStore',

    model: 'nineam.localization.model.LocaleModel',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: ''
        }
    }
});