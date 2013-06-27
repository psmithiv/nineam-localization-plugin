Ext.define('nineam-localization-plugin-ext.controls.LocalesComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.localesCombobox',

    /**
     * Custom refresh method to update locales ComboBox with localized labels
     * when user changes selected locale.
     */
    refresh: function(labels) {
        //get the index of the currently selected model
        var selectionIndex = this.store.find('label', this.getRawValue());

        //create new store from old store and update with new label values
        var store = Ext.create('nineam.localization.store.LocalesStore', {
            data: [
                this.store.getAt(0),
                this.store.getAt(1)
            ]
        })

        for(var i in labels) {
            var itemIndex = store.find('id', i);
            store.getAt(itemIndex).set('label', labels[i]);
        }

        //bind ComboBox to new store
        this.bindStore(store);

        //reset selection
        this.setValue(this.store.getAt(selectionIndex));
    }
})