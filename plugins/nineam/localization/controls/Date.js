
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
Ext.define('nineam.localization.controls.Date', {
    override: 'Ext.picker.Date',

    /*mixin: [
        'nineam.localization.controls.ILocalization'
    ],*/

    /**
     * Refresh component now that local has been
     * @public
     */
    refresh: function() {
        console.log('Date.refresh()');

        var today = Ext.Date.format(new Date(), this.format);
        if (this.showToday) {
            this.todayBtn.setText(Ext.String.format(this.todayText, today));
            this.todayBtn.setTooltip(Ext.String.format(this.todayTip, today));
        }

        this.update(this.activeDate, true);

        /*
        var id = this.getId();
        console.log('id: ' + id);
        var prevEl = this.getCmp(id+'-prevEl');
        console.log('prevEl: ' + prevEl);
        prevEl.setToolTip('asdfasdfasdf');
        */
    }
});