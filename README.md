qBox
====

A light-weight javascript popup that is easy to use.

Once the script is included, you can call the popup like this:
	qBox.show({ html : "my html" });
	
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
	closeHTML : "&#x2716;" // a special 'X'
}
