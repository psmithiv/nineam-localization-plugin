/**
 * Model object representing a loadable locale.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.model.LocaleModel', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.model.LocaleModel-ExtJS' : 'nineam.localization.model.LocaleModel-Touch'
});