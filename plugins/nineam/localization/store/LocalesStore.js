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
 * Store containing a list of LocaleModel objects.
 *
 * Note: Based on the current framework version (ext vs. touch)
 * this class instantiates the proper super class.
 */
Ext.define('nineam.localization.store.LocalesStore', {
    extend: Ext.getVersion('extjs') ? 'nineam.localization.store.LocalesStore-ExtJS' : 'nineam.localization.store.LocalesStore-Touch'
});