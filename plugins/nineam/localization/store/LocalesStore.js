/**
 * Store containing a list of LocaleModel objects.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.store.LocalesStore-ExtJS' : 'nineam.localization.store.LocalesStore-Touch'
});