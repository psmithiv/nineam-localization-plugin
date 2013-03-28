/*
 Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)

 9am-localization-plugin is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 9am-localization-plugin is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with 9am-localization-plugin.  If not, see <http://www.gnu.org/licenses/>.
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
         * {String} method - Setter method to call on client component when changing locales
         */
        method: "",

        /**
         * {String} key - The key in the locale properties file that maps to the label value.
         */
        key: ""
    },

    /**
     * @override
     */
    init: function(client) {
        var cm = Ext.create('nineam.localization.model.ClientModel', {
            client: client, method: this.getMethod(), key: this.getKey()
        });
        nineam.localization.LocaleManager.registerClient(cm);
    }
});