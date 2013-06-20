 /**
  * Patch for Ext.picker.Date to allow for updating local at runtime.
  */
Ext.define('nineam-localization-plugin-ext.controls.Date', {
    override: 'Ext.picker.Date',

    /**
     * Refresh component now that local has changed
     */
    refresh: function() {
        var today = Ext.Date.format(new Date(), this.format);

        //update buttons
        if (this.showToday) {
            this.todayBtn.setText(Ext.String.format(this.todayText, today));
            this.todayBtn.setTooltip(Ext.String.format(this.todayTip, today));
        }

        this.monthBtn.setTooltip(this.monthYearText);

        //update tooltips
        this.innerEl.dom.title = Ext.String.format(this.ariaTitle, Ext.Date.format(this.activeDate, this.ariaTitleDateFormat));
        this.prevEl.dom.title = this.prevText;
        this.nextEl.dom.title = this.nextText;

        //update days table column headers
        this.dayNames = Ext.Date.dayNames.slice(this.startDay).concat(Ext.Date.dayNames.slice(0, this.startDay));
        var cells = this.eventEl.dom.rows[0].cells;
        var len = cells.length;
        for(var i=0; i < len; i++) {
            var cell = cells[i];
            cell.innerHTML = '<span>' + Ext.picker.Date.prototype.getDayInitial(this.dayNames[i]) + '</span>';
            cell.title = this.dayNames[i];
        }

        //call update on days table to refresh
        this.update(this.activeDate, true);

        //hide month picker and set to null so it is recreated next time it is opened
        this.hideMonthPicker(true);
        this.monthPicker = null;
    }
});