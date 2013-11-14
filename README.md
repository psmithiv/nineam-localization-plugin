# Localization Plugin

A plugin to enable runtime localization in Sencha ExtJS & Sencha Touch applications.

## Highlights

* Provides plugin for UI components that enables runtime locale changes.
* Works with Sencha ExtJS version 4.x and up, Sencha Touch version 2.x+ and up.
* Build versions for debugging and production.
* JSDuck documentation.
* [MIT License](https://github.com/psmithiv/nineam-localization-plugin/blob/master/MIT-LICENSE.txt) compatible with both
ExtJS and Touch licenses.

## Getting Started

Simply add the debug or minified production JS file to your html file:

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>nineam-localization-plugin-ext</title>
    <link rel="stylesheet" href="resources/css/default/app.css">
    <!-- <x-compile> -->
        <!-- <x-bootstrap> -->
            <script src="ext/ext-dev.js"></script>
            <script src="bootstrap.js"></script>
        <!-- </x-bootstrap> -->
        <script src="libs/locale-manager-debug.js"></script>
        <script src="app/app.js"></script>
    <!-- </x-compile> -->
</head>
<body></body>
</html>
```

Create some localization properties by locating the default ExtJS or Touch locale file for English: ext-lang-en.js. 
Add some properties to it at the bottom of the file by creating a new properties class:

```js
Ext.define("Ext.locales.en.Global", {
    title: 'en.title',
    btnWidth: 300,
    comp: {
        title: 'en.comp.title'
    }
});
```

Notice that we can add both string values for labels and numeric values for setting (for example) the width of a button.
The properties can contain much, much more than just content for labels. If you wanted to create the same properties 
for Spanish you'd simply locate the file 'ext-lang-es.js' and add a new class 'Ext.locales.es.Global' with the 
same properties but different values.

Next, create a LocalesStore object setting the locale information as the store's data property in the application's
init() method:

```js
Ext.application({
    init: function() {
        var locales = Ext.create('nineam.localization.store.LocalesStore', {
            data: [
                {id: 'en_us', label: 'English', url: 'locale/ext-lang-en.js', propertiesClass: 'Ext.locales.en.Global'},
                {id: 'es_us', label: 'Spanish', url: 'locale/ext-lang-es.js', propertiesClass: 'Ext.locales.es.Global'}
            ]
        });
    }
});
```

In the same init method, we need to actually set the locale:

```js
Ext.application({
    init: function() {
        var locales = Ext.create('nineam.localization.store.LocalesStore', {
            data: [
                {id: 'en_us', label: 'English', url: 'locale/ext-lang-en.js', propertiesClass: 'Ext.locales.en.Global'},
                {id: 'es_us', label: 'Spanish', url: 'locale/ext-lang-es.js', propertiesClass: 'Ext.locales.es.Global'}
            ]
        });
        
        var lm = nineam.localization.LocaleManager;
        lm.setLocales(locales);

        var locale = lm.getPersistedLocale();
        lm.setLocale(locale);
    }
});
```

Finally, we need  to use the LocaleManager as both a plugin to UI components and as a singleton with access to 
properties. Let's start by taking a simple label component and adding the plugin:

```js
{
    itemId: "myLabel",
    xtype: 'label',
    plugins: [
        { ptype: 'localization', method: 'setText', key: 'comp.title' }
    ]
}
```

Here we're setting the plugin to the type 'localization' which hooks the UI component to our LocaleManager plugin.
Here's how it works: when a locale is changed on the LocaleManager at runtime, it updates any UI components using 
it as a plugin by calling the 'method' property specified by the plugin and using the value of the 'key' as the
parameter to that method. In our example, the key 'comp.title' resolves to 'en.comp.title' as defined above in 
Ext.locales.en.Global.

You can also access properties of the LocaleManger via code:

```js
myLabel.setText(nineam.locale.LocaleManager.getProperty("comp.title"));
```

## Examples

* [ExtJS](https://github.com/psmithiv/nineam-localization-plugin/tree/master/examples/ext-4.1.1-example)
A simple example ExtJS application demonstrating runtime localization capabilities.
* [Touch](https://github.com/psmithiv/nineam-localization-plugin/tree/master/examples/touch-2.2.1-example)
A simple example Touch application demonstrating runtime localization capabilities.
* [Cafe Townsend Demo Project](https://github.com/WebAppSolutionInc/sencha-cafe-townsend) - A HTML5 implementation 
using Sencha ExtJS, Sencha Touch, DeftJS, FlowMVC, & Localization Plugin.

## Roadmap

* Unit Tests

## Developers

* [Paul Smith IV](mailto: paul.smith.iv@ninthavenuemedia.com) (Creator)
* [Brian Riley](https://github.com/brianmriley) 
