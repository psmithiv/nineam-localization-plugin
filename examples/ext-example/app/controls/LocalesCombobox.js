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

        //copy model objects from the stores mixedCollection into an array to be used when creating a new store
        var data = [];
        var storeLen = this.store.getCount();
        for(var i=0; i<storeLen; i++) {
            data.push(this.store.getAt(i));
        }

        //create new store from old store's data
        var store = Ext.create('nineam.localization.store.LocalesStore', {
            data: data
        })

        //update new store with new label values
        var labelsLen = labels.length;
        for(var i=0; i<labelsLen; i++) {
            var label = labels[i];
            var itemIndex = store.find('id', label.id);
            store.getAt(itemIndex).set('label', label.label);
        }

        //bind ComboBox to new store
        this.bindStore(store);

        //reset selection
        this.setValue(this.store.getAt(selectionIndex));
    }
})