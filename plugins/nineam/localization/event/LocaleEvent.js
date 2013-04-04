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
 * Locale event object w/ event names
 */
Ext.define('nineam.localization.event.LocaleEvent', {
    statics: {
        /**
         * The LocaleManager has loaded it's first locale file and is now initialized.
         *
         * @event
         */
        INITIALIZED: 'nineam.localization.event.LocaleEvent.INITIALIZED',

        /**
         * The current list of available locales has changed.
         *
         * @event
         */
        LOCALES_CHANGED: 'nineam.localization.event.LocaleEvent.LOCALES_CHANGED',

        /**
         * The currently selected locale has changed.
         *
         * @event
         */
        LOCALE_CHANGED: 'nineam.localization.event.LocaleEvent.LOCALE_CHANGED'
    }
});