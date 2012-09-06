// QuickBox
var qBox = (function(){
	var settings = {}, 
	 	defaults = {}, 
		mask, 
		content, 
		closeButton, 
		queue = [], 
		active = false,
		initialDefaults = { 
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
		};
	
	function extend(toObject, fromObject){
		for(o in fromObject){
			if(fromObject.hasOwnProperty(o) ){
				toObject[o] = fromObject[o];
			}
		}
	}
	
	function setDefaults(options){ // Set global defaults, passing nothing resets the defaults
		if(options){
			extend(defaults, options);
		} else {
			extend(defaults, initialDefaults);
		}
	}
	
	function centerContent(){
		var browserCenterX = window.innerWidth / 2;
		var browserCenterY = window.innerHeight / 2;

		var contentCenterX = content.offsetWidth / 2;
		var contentCenterY = content.offsetHeight / 2;

		content.style.left = browserCenterX - contentCenterX + "px";
		content.style.top = browserCenterY - contentCenterY + "px";
	}
	
	function getOrCreateElementById(id, parentElemId){
		var parentElem = parentElemId ? document.getElementById(parentElemId) : document.body;
		var elem = document.getElementById(id);
		
		if(elem == null){
			elem = document.createElement("div");
			elem.id = id;
			
			parentElem.appendChild(elem);
		}
		
		return elem;
	}
	
	function showMask(){
		mask = getOrCreateElementById(settings.maskId);
		
		mask.style.display = "block";
	}
	
	function showContent(){
		content = getOrCreateElementById(settings.contentId);
		
		content.style.display = "block";
		content.className = settings.className;
		content.innerHTML = settings.html;
		
		if(settings.showClose == true){
			closeButton = getOrCreateElementById(settings.closeId, content.id);
			
			closeButton.onclick = function(){
				hideModal();
			}
			
			closeButton.innerHTML = settings.closeHTML;
		}
	}
	
	function hideMask(){
		mask.style.display = "none";
		mask.onclick = null;
	}
	
	function hideContent(){
		content.style.display = "none";
	}
	
	function showModal(options){
		queue.push(function(){
			extend(settings, defaults);
		
			extend(settings, options);
			
			showMask();
		
			if(settings.modal == false){
				mask.onclick = function(){
					hideModal();
				}
			} 
		
			showContent();
	
			if(settings.autoCenter){
				centerContent();
				window.onresize = function(){
					setTimeout(centerContent, 25);
				};
			}
		
			settings.onOpen();
		});
		
		if(!active && queue.length > 0){
			queue.shift()();
			active = true;
		}
	}
	
	function hideModal(){
		hideMask();
		hideContent();
		
		window.onresize = null;
		content.style.top = "auto";
		content.style.left = "auto";
		
		settings.onClose();
		
		if(queue.length > 0){
			queue.shift()();
			active = true;
		} else {
			active = false;
		}
	}
	
	extend(defaults, initialDefaults); // init the default settings
	
	return {
		show : showModal,
		hide : hideModal,
		setDefaults : setDefaults,
		center : centerContent
	};
	
})();