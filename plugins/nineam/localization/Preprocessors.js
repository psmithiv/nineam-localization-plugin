/**
 * Class preprocessor to rectify different base class's in ExtJS 4+ and ST2 when using the plugin architecture.
 * If ExtJS, extend extendConfig.extjs
 * If ST2, extend extendConfig.st
 */
Ext.Class.registerPreprocessor('extendConfig', function(cls, data, hooks, fn) {
    if(Ext.getVersion('extjs')) {
        data.extend = data.extendConfig.extjs;
    } else {
        data.extend = data.extendConfig.st;
    }
}, false, 'before', 'extend');

/**
 * Class preprocessor to rectify differences between ExtJS 4+ and ST2 when defining models
 * If ExtJS, write modelConfig to class
 * If ST2, write modelConfig to class.config
 */
Ext.Class.registerPreprocessor('modelConfig', function(cls, data, hooks, fn) {
    var target;
    if(Ext.getVersion('extjs')) {
        target = data;
    } else {
        if(!data.config)
            data.config = {};

        target = data.config;
    }

    target.fields = data.modelConfig;
}, false, 'before', 'extend');

/**
 * Class preprocessor to rectify differences between ExtJS 4+ and ST2 when defining stores
 * If ExtJS, write storeConfig to class
 * If ST2, write storeConfig to class.config
 */
Ext.Class.registerPreprocessor('storeConfig', function(cls, data, hooks, fn) {
    var target;
    if(Ext.getVersion('extjs')) {
        target = data;
    } else {
        if(!data.config)
            data.config = {};

        target = data.config;
    }

    for(var i in data.storeConfig) {
        target[i] = data.storeConfig[i];
    }

    // Exclude LocaleModel from being handled by Ext.Loader since we
    // know for sure that it exists. (removes 404 warning at startup)
    if(Ext.getVersion('extjs'))
        Ext.exclude(data.model).require('*');
}, false, 'before', 'extend');
