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
Ext.define('nineam.localization.delegate.FrameworkLocaleDelegate', {
    requires: [
        'Ext.Ajax'
    ],

    constructor: function(success, failure, scope) {
        this.callParent(arguments);

        //private
        var _success = success;
        var _failure = failure;
        var _scope = scope;

        /**
         * @private
         * @param {String} response
         */
        function ajaxSuccess(response) {
            _success.call(_scope, response.responseText);
        }

        /**
         * @private
         */
        function ajaxFailure() {
            //TODO
        }

        /**
         * @public
         * @param {String} url - url of framework resource bundle to load
         */
        this.loadFrameworkPropertiesFile = function(url) {
            if(!_success || !_scope)
                return;

            var req = Ext.Ajax.request({
                url: url,
                success: ajaxSuccess,
                failure: ajaxFailure
            })
        }
    }
});