Ext.define('nineam.localization.util.Persistence', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.util.Persistence-ExtJS' : 'nineam.localization.util.Persistence-Touch',
    singleton: true
})