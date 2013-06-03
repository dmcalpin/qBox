qBox
====

A light-weight javascript popup that is easy to use.

Once the script is included, you can call the popup like this:

	var qBox = new QBox({ html : "my html" });
	qBox.show();
	
To hide, you can call:

	qBox.hide()
	
but it will also hide by default via clicking the mask, or the close button.

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
		closeId : "qbClose"
	}
