// QuickBox
var qBox = (function(){
	var settings = {}, 
	 	mask, 
		content, 
		closeButton, 
		queue = [],
		active = false,
		defaults = { 
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
		return toObject;
	}
	
	function centerContent(){
		content.style.left = "50%";
		content.style.marginLeft = "-" + content.offsetWidth / 2 + "px";
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
		window.onresize = null;
		content.style.left = "auto";
		content.style.marginLeft = "auto";
		content.style.display = "none";
	}
	
	function showModal(options){
		extend(settings, defaults);
		extend(settings, options);
		
		if(!active){
			active = true;
			
			settings = queue.shift() || settings;
			
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
		} else {
			queue.push( extend({}, settings) );
		}
	}
	
	function hideModal(){
		hideMask();
		hideContent();
		
		settings.onClose();
		
		active = false;
		
		if(queue.length > 0){
			showModal();
		} 
	}
	
	return {
		show : showModal,
		hide : hideModal,
		center : centerContent
	};
	
})();