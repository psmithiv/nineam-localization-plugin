 /**
  * Patch for Ext.picker.Date to allow for updating local at runtime.
  */
Ext.define('nineam.localization.controls.Date', {
    override: 'Ext.picker.Date',

    /*mixin: [
        'nineam.localization.controls.ILocalization'
    ],*/
    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
        '<div role="presentation" class="{baseCls}-header">',
        '<div class="{baseCls}-prev"><a id="{id}-prevEl" href="#" role="button" title="{prevText}"></a></div>',
        '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
        '<div class="{baseCls}-next"><a id="{id}-nextEl" href="#" role="button" title="{nextText}"></a></div>',
        '</div>',
        '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
        '<thead role="presentation"><tr role="presentation">',
        '<tpl for="dayNames">',
        '<th role="columnheader" title="{.}"><span>{.:this.firstInitial}</span></th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody role="presentation"><tr role="presentation">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        '<a role="presentation" href="#" hidefocus="on" class="{parent.baseCls}-date" tabIndex="1">',
        '<em role="presentation"><span role="presentation"></span></em>',
        '</a>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    /**
     * Refresh component now that local has been
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