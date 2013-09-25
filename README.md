qBox
====

A light-weight javascript popup that is easy to use.

Once the script is included, you can call the popup like this:

``` javascript
var qBox = new QBox({ html : "my html" });
qBox.show();
```

To programmatically hide, you can call:

``` javascript
qBox.hide()
```
	
but it will also hide by default via clicking the mask, or the close button.

**Configuration Defaults**

``` javascript
{ 
	html : "",
	modal : false,
	showClose : true,
	onOpen : function(){},
	onClose : function(){},
	className : "",
	closeHTML : "&times;",
	autoCenter : true,
	blurBackground : false,
	shrinkToFit : false
}
```
