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
Ext.define('nineam.localization.delegate.LocaleDelegate', {
    requires: [
        'Ext.Ajax'
    ],

    /**
     * Success method to call when loading locale file
     *
     * @private
     */
    success: {},

    /**
     * Fault method to call when loading locale file
     * @private
     */
    failure: {},

    /**
     * Scope to execute success/failure method within
     *
     * @private
     */
    scope: '',

    /**
     * Constructor
     *
     * @param {Function} success
     * @param {Function} failure
     * @param {Object} scope
     */
    constructor: function(success, failure, scope) {
        this.callParent(arguments);

        this.success = success;
        this.failure = failure;
        this.scope = scope;
    },

    /**
     * Load locale file at specified url
     *
     * @public
     * @param {String} url - url of locale file to load
     */
    loadPropertiesFile: function(url) {
        if(!this.success || !this.scope)
            return;

        Ext.Ajax.request({
            url: url,
            success: this.ajaxSuccess,
            failure: this.ajaxFailure,
            scope: this
        });
    },

    /**
     * Ajax success handler
     *
     * @private
     * @param {String} response
     */
    ajaxSuccess: function(response) {
        this.success.call(this.scope, response.responseText);
    },

    /**
     * Ajax failure handler
     *
     * @private
     */
    ajaxFailure: function() {
        //TODO: Implement fault handling
    }
});