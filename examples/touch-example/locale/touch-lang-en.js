Ext.onReady(function() {
    var cm = Ext.ClassManager,
        exists = Ext.Function.bind(cm.get, cm);

    Ext.define("Touch.locales.en.Global", {
        title: 'en.title',
        btnWidth: 300,
        comp: {
            title: 'en.comp.title'
        }
    });
});
