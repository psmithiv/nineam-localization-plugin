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

        if (this.showToday) {
            this.todayBtn.setText(Ext.String.format(this.todayText, today));
            this.todayBtn.setTooltip(Ext.String.format(this.todayTip, today));
        }

        this.monthBtn.setTooltip(this.monthYearText);

        this.update(this.activeDate, true);

        // 'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
        this.innerEl.dom.title = Ext.String.format(this.ariaTitle, Ext.Date.format(this.activeDate, this.ariaTitleDateFormat));
        this.prevEl.dom.title = this.prevText;
        this.nextEl.dom.title = this.nextText;

        this.picker = null;
        this.hideMonthPicker(true);
    }
});