/*
 Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)

 nineam-localization-plugin is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 nineam-localization-plugin is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with nineam-localization-plugin.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * ExtJS/Touch plugin used to register component with LocaleManager.
 */
Ext.define('nineam.localization.LocalePlugin', {
    extend: Ext.getVersion('extjs') ? 'Ext.AbstractPlugin' : 'Ext.Component',
    alias: 'plugin.localization',

    required: [
        'nineam.localization.LocaleManager',
        'nineam.localization.model.ClientModel'
    ],

    config: {
        /**
         * Method to call on component when locale chagnes.
         *
         * @cfg {String} method - Method to call on client component when changing locales
         */
        method: "",

        /**
         * Key to use to lookup value on locale properties class.
         *
         * @cfg {String} key - The key in the locale properties file that maps to the label value.
         */
        key: ""
    },

    /**
     * Init method called by plugin framework when a component gets instantiated.
     * Responsible for registering client with LocaleManager.
     *
     * @param {Ext.Component} client - Component to register with LocaleManager for localization.
     */
    init: function(client) {
        var cm = Ext.create('nineam.localization.model.ClientModel', {
            client: client, method: this.getMethod(), key: this.getKey()
        });

        nineam.localization.LocaleManager.registerClient(cm);
    }
});