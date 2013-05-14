/**
 * Touch version of a store containing a list of LocaleModel objects.
 */
Ext.define('nineam.localization.store.LocalesStore-Touch', {
    extend: 'Ext.data.Store',

    requires: [
        'nineam.localization.model.LocaleModel'
    ],

    config: {
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