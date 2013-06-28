Ext.onReady(function() {
    //Simple example showing creation of locale properties class to be used for localization
    Ext.define("Ext.locales.es.Global", {
        label: 'Texto de la etiqueta -Español',

        button: {
            label: 'Botón de texto -Español',
            width: 200
        },

        panel: {
            title: 'Texto de la etiqueta -Español'
        },

        //Advanced example showing localization using custom refresh method
        localeLabels: [
            {id: 'en_us', label: 'Inglés'},
            {id: 'es_us', label: 'Español'},
            {id: 'fr_fr', label: 'Francés'}
        ]
    });

    //Advanced example showing localization using Sencha's built in localization properties + custom refresh method
    var cm = Ext.ClassManager,
        exists = Ext.Function.bind(cm.get, cm);

    if (Ext.Date) {
        Ext.Date.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Ene: 0,
            Feb: 1,
            Mar: 2,
            Abr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Ago: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dic: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

        Ext.Date.getShortDayName = function(day) {
            if (day == 3) return "Mié";
            if (day == 6) return "Sáb";
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }

    if (exists('Ext.util.Format')) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // Spanish Euro
            dateFormat: 'd/m/Y'
        });
    }

    Ext.define("Ext.locale.es.picker.Date", {
        override: "Ext.picker.Date",
        todayText: "Hoy",
        minText: "Esta fecha es anterior a la fecha mínima",
        maxText: "Esta fecha es posterior a la fecha máxima",
        disabledDaysText: "",
        disabledDatesText: "",
        monthNames: Ext.Date.monthNames,
        dayNames: Ext.Date.dayNames,
        nextText: 'Mes Siguiente (Control+Right)',
        prevText: 'Mes Anterior (Control+Left)',
        monthYearText: 'Seleccione un mes (Control+Up/Down para desplazar el año)',
        todayTip: "{0} (Barra espaciadora)",
        format: "d/m/Y",
        startDay: 1,
        ariaTitle: 'Selector de fecha: {0}'
    });

    Ext.define("Ext.locale.es.picker.Month", {
        override: "Ext.picker.Month",
        okText: "&#160;Aceptar&#160;",
        cancelText: "Cancelar"
    });

    Ext.define("Ext.locale.es.form.field.Date", {
        override: "Ext.form.field.Date",
        disabledDaysText: "Deshabilitado",
        disabledDatesText: "Deshabilitado",
        minText: "La fecha para este campo debe ser posterior a {0}",
        maxText: "La fecha para este campo debe ser anterior a {0}",
        invalidText: "{0} no es una fecha válida - debe tener el formato {1}",
        format: "d/m/Y",
        altFormats: "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
    });
});
