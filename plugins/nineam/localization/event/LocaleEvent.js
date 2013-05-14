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