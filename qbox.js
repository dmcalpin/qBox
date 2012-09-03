// QuickBox
var qBox = (function(){

	var settings, mask, content, closeButton;
	
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
		mask = getOrCreateElementById("qbMask");
		
		mask.style.display = "block";
		
	}
	
	function showContent(){
		content = getOrCreateElementById("qbContent");
		
		content.style.display = "block";
		content.className = settings.className;
		content.innerHTML = settings.html;
		
		if(settings.showClose == true){
			closeButton = getOrCreateElementById("qbClose", content.id);
			
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
		settings = { 
			html : "",
			modal : false,		// Will clicking the mask close the popup
			showClose : true,	// Show the 'X' in the corner of the popup
			onOpen : function(){},
			onClose : function(){},
			className : "",
			closeHTML : "&#x2716;"
		};
		
		for(o in options){
			if(options.hasOwnProperty(o) ){
				settings[o] = options[o];
			}
		}
		
		showMask();
		
		if(settings.modal == false){
			mask.onclick = function(){
				hideModal();
			}
		} 
		
		showContent();
	
		centerContent();
		window.onresize = function(){
			setTimeout(centerContent, 25);
		};
		
		settings.onOpen();
	}
	
	function hideModal(){
		hideMask();
		hideContent();
		
		window.onresize = null;
		
		settings.onClose();
	}
	
	return {
		show : showModal,
		hide : hideModal,
		center : centerContent
	};
	
})();