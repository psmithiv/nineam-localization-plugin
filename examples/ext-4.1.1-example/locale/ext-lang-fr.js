Ext.onReady(function() {
    //Simple example showing creation of locale properties class to be used for localization
    Ext.define("Ext.locales.fr.Global", {
        label: 'L\'étiquette de texte -Français',

        button: {
            label: 'Texte du bouton -Français',
            width: 300
        },

        panel: {
            title: 'Panneau titre -Français'
        },

        cssCls: 'styleFR',

        //Advanced example showing localization using custom refresh method
        localeLabels: [
            {id: 'en_us', label: 'English (Anglais)'},
            {id: 'es_us', label: 'Español (Espagnol)'},
            {id: 'fr_fr', label: 'Français'}
        ]
    });

    //Advanced example showing localization using Sencha's built in localization properties
    var cm = Ext.ClassManager,
        exists = Ext.Function.bind(cm.get, cm);

    if (Ext.Date) {
        Ext.Date.shortMonthNames = ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.shortMonthNames[month];
        };

        Ext.Date.monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        Ext.Date.monthNumbers = {
            "Janvier": 0,
            "Janv": 0,
            "Février": 1,
            "Févr": 1,
            "Mars": 2,
            "Mars": 2,
            "Avril": 3,
            "Avr": 3,
            "Mai": 4,
            "Juin": 5,
            "Juillet": 6,
            "Août": 7,
            "Septembre": 8,
            "Sept": 8,
            "Octobre": 9,
            "Oct": 9,
            "Novembre": 10,
            "Nov": 10,
            "Décembre": 11,
            "Déc": 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[Ext.util.Format.capitalize(name)];
        };

        Ext.Date.dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:er)";

        Ext.override(Date, {
            getSuffix: function() {
                return (this.getDate() == 1) ? "er" : "";
            }
        });
    }

    if (Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // French Euro
            dateFormat: 'd/m/Y'
        });
    }

    Ext.define("Ext.locale.fr.picker.Date", {
        override: "Ext.picker.Date",
        todayText: "Aujourd'hui",
        minText: "Cette date est antérieure à la date minimum",
        maxText: "Cette date est postérieure à la date maximum",
        disabledDaysText: "",
        disabledDatesText: "",
        monthNames: Ext.Date.monthNames,
        dayNames: Ext.Date.dayNames,
        nextText: 'Mois suivant (CTRL+Flèche droite)',
        prevText: "Mois précédent (CTRL+Flèche gauche)",
        monthYearText: "Choisissez un mois (CTRL+Flèche haut ou bas pour changer d'année.)",
        todayTip: "{0} (Barre d'espace)",
        format: "d/m/y",
        startDay: 1
    });

    Ext.define("Ext.locale.fr.picker.Month", {
        override: "Ext.picker.Month",
        okText: "&#160;OK&#160;",
        cancelText: "Annuler"
    });

    Ext.define("Ext.locale.fr.form.field.Date", {
        override: "Ext.form.field.Date",
        disabledDaysText: "Désactivé",
        disabledDatesText: "Désactivé",
        minText: "La date de ce champ ne peut être antérieure au {0}",
        maxText: "La date de ce champ ne peut être postérieure au {0}",
        invalidText: "{0} n'est pas une date valide - elle doit être au format suivant: {1}",
        format: "d/m/y",
        altFormats: "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
    });
});
