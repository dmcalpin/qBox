// QuickBox
var QBox = (function(){
	
	// Private Static functions
	function extend(toObject, fromObject){
		for(o in fromObject){
			if(fromObject.hasOwnProperty(o) ){
				toObject[o] = fromObject[o];
			}
		}
		return toObject;
	}
	
	function makeElement(clazz, parentElemSelector){ // This was more usefull when IDs were used
		var parentElem = parentElemSelector ? document.querySelector("." + parentElemSelector) : document.body;
		
		elem = document.createElement("div");
		elem.className = clazz;

		parentElem.insertBefore(elem, parentElem.firstChild);
		
		return elem;
	}
	
	var maskClass = "qb-mask",
		contentClass = "qb-content",
		closeClass = "qb-close",
		blurBackgroundClass = "qb-blur-background",
		autoCenterClass = "qb-auto-center";
	
	return function(options){
		// Customizable Settings
		var settings = { 
			html : "",
			modal : false,			// Will clicking the mask close the popup
			showClose : true,		// Show the 'X' in the corner of the popup
			onOpen : function(){},	// Fires when qbox is opened
			onClose : function(){},	// Fires when qbox is closed
			className : "",			// Class name to override content styles
			closeHTML : "&times;",
			autoCenter : true,
			blurBackground : false,
			shrinkToFit : false
		}; 
		
		// Private Attributes
		var	mask,
			content, 
			closeButton;
			
		// Run when class is instantiated
		extend(settings, options);
		
		// Private Class Methods
		function createMask(){
			mask = makeElement(maskClass);

			mask.style.display = "block";
			if( settings.blurBackground ) mask.className += (" " + blurBackgroundClass);
			
		}

		function createContent(){
			content = makeElement(contentClass, maskClass);

			content.style.display = settings.shrinkToFit ? "inline-block" : "block";
			content.className += (" " + settings.className);
			
			if( settings.autoCenter ) content.className += (" " + autoCenterClass);
			
			content.innerHTML = settings.html;
		}
		
		function createCloseButton(){
			closeButton = makeElement(closeClass, contentClass);

			closeButton.onclick = function(){
				hidePopup();
			}

			closeButton.innerHTML = settings.closeHTML;
		}
	
		function showPopup(){
			createMask();

			if( !settings.modal ){
				mask.onclick = function(e){
					if( e.target === mask || e.target === closeButton ){
						hidePopup();
					}
				}
			} 

			createContent();
			
			if( settings.showClose ) createCloseButton();

			settings.onOpen(this);
		}

		function hidePopup(){
			// Hide Mask
			var maskParent = mask.parentNode;
			
			if(maskParent) maskParent.removeChild(mask);
			
			settings.onClose(this);
		}
		
		// Public Class Methods
		this.show = showPopup;
		this.hide = hidePopup;
		this.settings = function(){
			return settings;
		}
	};
	
})();