qBox
====

A light-weight javascript popup that is easy to use.

Once the script is included, you can call the popup like this:

	qBox.show({ html : "my html" });
	
To hide, you can call:

	qBox.hide()
	
but it will also hide by default via clicking the mask, or the close button.

You can also to a global override to defaults via the setDefaults function

	qBox.setDefaults({ className : "myClass"}) // no all qboxes will have "myClass" by default

Configuration Defaults:

	{ 
		html : "",
		modal : false,		// Will clicking the mask close the popup
		showClose : true,	// Show the 'X' in the corner of the popup
		onOpen : function(){},
		onClose : function(){},
		className : "",
		closeHTML : "&#x2716;", // A special 'X'
		maskId : "qbMask",
		contentId : "qbContent",
		closeId : "qbClose",
		autoCenter : true
	}
