Ext.data.JsonP.nineam_localization_delegate_LocaleDelegate({"tagname":"class","files":[{"filename":"LocaleDelegate.js","href":"LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate"}],"aliases":{},"alternateClassNames":[],"members":[{"name":"failure","tagname":"property","owner":"nineam.localization.delegate.LocaleDelegate","id":"property-failure","meta":{"private":true}},{"name":"scope","tagname":"property","owner":"nineam.localization.delegate.LocaleDelegate","id":"property-scope","meta":{"private":true}},{"name":"success","tagname":"property","owner":"nineam.localization.delegate.LocaleDelegate","id":"property-success","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"nineam.localization.delegate.LocaleDelegate","id":"method-constructor","meta":{}},{"name":"ajaxFailure","tagname":"method","owner":"nineam.localization.delegate.LocaleDelegate","id":"method-ajaxFailure","meta":{"private":true}},{"name":"ajaxSuccess","tagname":"method","owner":"nineam.localization.delegate.LocaleDelegate","id":"method-ajaxSuccess","meta":{"private":true}},{"name":"loadPropertiesFile","tagname":"method","owner":"nineam.localization.delegate.LocaleDelegate","id":"method-loadPropertiesFile","meta":{}}],"extends":"Ext.Base","name":"nineam.localization.delegate.LocaleDelegate","mixins":[],"requires":["Ext.Ajax"],"uses":[],"code_type":"ext_define","id":"class-nineam.localization.delegate.LocaleDelegate","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>nineam.localization.delegate.LocaleDelegate</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.Ajax</div><h4>Files</h4><div class='dependency'><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate' target='_blank'>LocaleDelegate.js</a></div></pre><div class='doc-contents'><p>Delegate class responsable for loading locale property file.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-failure' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-property-failure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/nineam.localization.delegate.LocaleDelegate-property-failure' class='name expandable'>failure</a><span> : Object</span><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Fault method to call when loading locale file. ...</div><div class='long'><p>Fault method to call when loading locale file.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-scope' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-property-scope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/nineam.localization.delegate.LocaleDelegate-property-scope' class='name expandable'>scope</a><span> : String</span><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Scope to execute success/failure method within. ...</div><div class='long'><p>Scope to execute success/failure method within.</p>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-success' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-property-success' target='_blank' class='view-source'>view source</a></div><a href='#!/api/nineam.localization.delegate.LocaleDelegate-property-success' class='name expandable'>success</a><span> : Object</span><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Success method to call when loading locale file. ...</div><div class='long'><p>Success method to call when loading locale file.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/nineam.localization.delegate.LocaleDelegate-method-constructor' class='name expandable'>nineam.localization.delegate.LocaleDelegate</a>( <span class='pre'>success, failure, scope</span> ) : <a href=\"#!/api/nineam.localization.delegate.LocaleDelegate\" rel=\"nineam.localization.delegate.LocaleDelegate\" class=\"docClass\">nineam.localization.delegate.LocaleDelegate</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Constructor ...</div><div class='long'><p>Constructor</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>success</span> : Function<div class='sub-desc'>\n</div></li><li><span class='pre'>failure</span> : Function<div class='sub-desc'>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/nineam.localization.delegate.LocaleDelegate\" rel=\"nineam.localization.delegate.LocaleDelegate\" class=\"docClass\">nineam.localization.delegate.LocaleDelegate</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-ajaxFailure' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-method-ajaxFailure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/nineam.localization.delegate.LocaleDelegate-method-ajaxFailure' class='name expandable'>ajaxFailure</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Ajax failure handler ...</div><div class='long'><p>Ajax failure handler</p>\n</div></div></div><div id='method-ajaxSuccess' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-method-ajaxSuccess' target='_blank' class='view-source'>view source</a></div><a href='#!/api/nineam.localization.delegate.LocaleDelegate-method-ajaxSuccess' class='name expandable'>ajaxSuccess</a>( <span class='pre'>response</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Ajax success handler ...</div><div class='long'><p>Ajax success handler</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>response</span> : String<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-loadPropertiesFile' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='nineam.localization.delegate.LocaleDelegate'>nineam.localization.delegate.LocaleDelegate</span><br/><a href='source/LocaleDelegate.html#nineam-localization-delegate-LocaleDelegate-method-loadPropertiesFile' target='_blank' class='view-source'>view source</a></div><a href='#!/api/nineam.localization.delegate.LocaleDelegate-method-loadPropertiesFile' class='name expandable'>loadPropertiesFile</a>( <span class='pre'>url</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Load locale file at specified url ...</div><div class='long'><p>Load locale file at specified url</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>url</span> : String<div class='sub-desc'><ul>\n<li>url of locale file to load</li>\n</ul>\n\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});