Ext.onReady(function() {
    //Simple example showing creation of locale properties class to be used for localization
    Ext.define("Ext.locales.en.Global", {
        label: 'Label Text -English',

        button: {
            label: 'Button Text -English',
            width: 300
        },

        panel: {
            title: 'Panel Title -English'
        },

        //Advanced example showing localization using custom refresh method
        localeLabels: [
            {id: 'en_us', label: 'English'},
            {id: 'es_us', label: 'Español (Spanish)'},
            {id: 'fr_fr', label: 'Français (French)'}
        ]
    });

    //Advanced example showing localization using Sencha's built in localization properties + custom refresh method
    var cm = Ext.ClassManager,
        exists = Ext.Function.bind(cm.get, cm);

    if (exists('Ext.data.Types')) {
        Ext.data.Types.stripRe = /[\$,%]/g;
    }

    if (Ext.Date) {
        Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }

    if (exists('Ext.util.Format')) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '$',
            dateFormat: 'm/d/Y'
        });
    }

    Ext.define("Ext.locale.en.picker.Date", {
        override: "Ext.picker.Date",
        todayText: "Today",
        minText: "This date is before the minimum date",
        maxText: "This date is after the maximum date",
        disabledDaysText: "",
        disabledDatesText: "",
        monthNames: Ext.Date.monthNames,
        dayNames: Ext.Date.dayNames,
        nextText: 'Next Month (Control+Right)',
        prevText: 'Previous Month (Control+Left)',
        monthYearText: 'Choose a month (Control+Up/Down to move years)',
        todayTip: "{0} (Spacebar)",
        format: "m/d/y",
        startDay: 0,
        ariaTitle: 'Date Picker: {0}'
    });

    Ext.define("Ext.locale.en.picker.Month", {
        override: "Ext.picker.Month",
        okText: "&#160;OK&#160;",
        cancelText: "Cancel"
    });

    Ext.define("Ext.locale.en.form.field.Date", {
        override: "Ext.form.field.Date",
        disabledDaysText: "Disabled",
        disabledDatesText: "Disabled",
        minText: "The date in this field must be after {0}",
        maxText: "The date in this field must be before {0}",
        invalidText: "{0} is not a valid date - it must be in the format {1}",
        format: "m/d/y",
        altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
    });
});
