/**
 * Model object representing the component/method to call on locale
 * change as well as the key to use to obtain the value to pass to said method.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.model.ClientModel', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.model.ClientModel-ExtJS' : 'nineam.localization.model.ClientModel-Touch'
});