/*
LocaleManager Plugin 0.1.0

Copyright (c) 2013 [ninth avenue media, LLC] (mailto: paul.smith.iv@ninthavenuemedia.com)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/
Ext.Class.registerPreprocessor("extendConfig",function(b,d,a,c){if(Ext.getVersion("extjs")){d.extend=d.extendConfig.extjs}else{d.extend=d.extendConfig.st}},false,"before","extend");Ext.Class.registerPreprocessor("modelConfig",function(b,d,a,c){var e;if(Ext.getVersion("extjs")){e=d}else{if(!d.config){d.config={}}e=d.config}e.fields=d.modelConfig},false,"before","extend");Ext.Class.registerPreprocessor("storeConfig",function(b,e,a,d){var f;if(Ext.getVersion("extjs")){f=e}else{if(!e.config){e.config={}}f=e.config}for(var c in e.storeConfig){f[c]=e.storeConfig[c]}if(Ext.getVersion("extjs")){Ext.exclude(e.model).require("*")}},false,"before","extend");Ext.define("nineam.localization.model.LocaleModel",{extend:"Ext.data.Model",modelConfig:[{name:"id",type:"string"},{name:"label",type:"string"},{name:"url",type:"string"},{name:"propertiesClass",type:"string"}]});Ext.define("nineam.localization.store.LocalesStore",{extend:"Ext.data.Store",requires:["Ext.data.reader.Json"],storeConfig:{storeId:"localesStore",model:"nineam.localization.model.LocaleModel",proxy:{type:"memory",reader:{type:"json",root:""}}}});Ext.define("nineam.localization.util.Persistence",{singleton:true,LOCALE_COOKIE_ID:"nineam.localization.util.Persistence-ExtJS.LOCALE_COOKIE_ID_1",getLocale:function(){var b=document.cookie;var c=b.indexOf(" "+this.LOCALE_COOKIE_ID+"=");if(c==-1){c=b.indexOf(this.LOCALE_COOKIE_ID+"=")}if(c==-1){b=null}else{c=b.indexOf("=",c)+1;var a=b.indexOf(";",c);if(a==-1){a=b.length}b=unescape(b.substring(c,a))}Ext.log({level:"log"},"DEBUG: LocaleManager - Getting persisted locale id: "+b);return b},setLocale:function(b){Ext.log({level:"log"},"DEBUG: LocaleManager - Persisting locale id: "+b);var a=escape(b)+"; expires="+new Date(new Date().getTime()+(1000*60*60*24*365)).toUTCString();document.cookie=this.LOCALE_COOKIE_ID+"="+a}});Ext.define("nineam.localization.model.ClientModel",{extend:"Ext.data.Model",modelConfig:[{name:"client",type:"object"},{name:"method",type:"string"},{name:"key",type:"string"}]});Ext.define("nineam.localization.event.LocaleEvent",{statics:{INITIALIZED:"nineam.localization.event.LocaleEvent.INITIALIZED",LOCALES_CHANGED:"nineam.localization.event.LocaleEvent.LOCALES_CHANGED",LOCALE_CHANGED:"nineam.localization.event.LocaleEvent.LOCALE_CHANGED"}});Ext.define("nineam.localization.delegate.LocaleDelegate",{requires:["Ext.Ajax"],success:function(){},failure:function(){},scope:"",constructor:function(c,a,b){this.callParent(arguments);this.success=c;this.failure=a;this.scope=b},loadPropertiesFile:function(a){if(!this.success||!this.scope){return}Ext.Ajax.request({url:a,success:this.ajaxSuccess,failure:this.ajaxFailure,scope:this})},ajaxSuccess:function(a){this.success.call(this.scope,a.responseText)},ajaxFailure:function(){}});Ext.define("nineam.localization.LocaleManager",{singleton:true,mixins:{observable:"Ext.util.Observable"},initialized:false,clients:[],locales:null,getLocales:function(){return this.locales},setLocales:function(a){this.locales=a;this.fireEvent(nineam.localization.event.LocaleEvent.LOCALES_CHANGED,{})},locale:"",getLocale:function(){return this.locale},setLocale:function(a){this.locale=a;this.loadPropertiesFile()},properties:null,getProperty:function(key){return eval("this.properties."+key)},getPersistedLocale:function(){var a=nineam.localization.util.Persistence.getLocale();return this.locales.find("id",a)!=-1?a:this.locales.getAt(0).get("id")},constructor:function(a){if(typeof(Ext.log)!="function"){Ext.log=function(b,c){console.log(c)}}Ext.log({level:"log"},"DEBUG: Constructing LocaleManager");this.callParent(arguments);this.mixins.observable.constructor.call(this,a)},loadPropertiesFile:function(){var c=this.locales.findRecord("id",this.locale);var b=Ext.create("nineam.localization.delegate.LocaleDelegate",this.loadPropertiesFileResultHandler,this.loadPropertiesFileFaultHandler,this);var a=c.get("url");Ext.log({level:"log"},"DEBUG: LocaleManager - Loading properties file: "+a);b.loadPropertiesFile(a)},loadPropertiesFileResultHandler:function(a){Ext.log({level:"log"},"DEBUG: LocaleManager - Properties file loaded: "+this.locales.findRecord("id",this.locale).get("url"));var c=document.getElementsByTagName("head")[0];var b=document.createElement("script");b.type="text/javascript";b.innerHTML=a;c.appendChild(b);var d=this;setTimeout(function(){var e=d.locales.findRecord("id",d.locale);d.properties=Ext.create(e.get("propertiesClass"));d.updateClients();nineam.localization.util.Persistence.setLocale(d.locale);d.fireEvent(nineam.localization.event.LocaleEvent.LOCALE_CHANGED,{});if(!d.initialized){Ext.log({level:"log"},"DEBUG: LocaleManager - Locale Manager Initialized");d.initialized=true;d.fireEvent(nineam.localization.event.LocaleEvent.INITIALIZED,{})}},100)},loadPropertiesFileFaultHandler:function(){Ext.log({level:"error"},"ERROR: LocaleManager - Failure loading properties file")},updateClients:function(){Ext.log({level:"log"},"DEBUG: LocaleManager - Updating Clients");var a=this.clients.length-1;for(var b=a;b>-1;b--){this.updateClient(this.clients[b])}},updateClient:function(clientModel){var client=clientModel.get("client");var method=clientModel.get("method");var key=clientModel.get("key");try{var prop;if(key){var global=this.getProperty(key);prop=global?global:eval("client."+key)}else{prop=this.properties}client[method].call(client,prop)}catch(e){Ext.log({level:"error"},"ERROR: LocaleManager - Error updating client [client: "+client.getId()+", method: "+method+", key: "+key+"] - error: "+e)}},registerClient:function(a){Ext.log({level:"log"},"DEBUG: LocaleManager - Registering client component [client: "+a.get("client").getId()+", method: "+a.get("method")+", key: "+a.get("key")+"]");this.clients.push(a);if(this.properties){this.updateClient(a)}}});Ext.define("nineam.localization.LocalePlugin",{extendConfig:{extjs:"Ext.AbstractPlugin",st:"Ext.Component"},alias:"plugin.localization",config:{method:"",key:""},init:function(b){var a=Ext.create("nineam.localization.model.ClientModel",{client:b,method:this.getMethod(),key:this.getKey()});nineam.localization.LocaleManager.registerClient(a)}});