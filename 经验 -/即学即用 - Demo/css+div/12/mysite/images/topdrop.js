(function(){
	var doc = document;
	
	var $id = function(id){ return doc.getElementById(id);};
	
	var acc = $id('account'), mcc = $id('myaccount');
	var bb = $id('baibao'), mbb = $id('mybaibao');
	
	var boxModel = (function(){
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";
		document.body.appendChild(div);
		var boxModel = div.offsetWidth === 2;
		document.body.removeChild(div).style.display = "none";
		div = null;
		return boxModel;
	})();	
	
	var getoffset = function(el){
		if(!el || !el.ownerDocument){return null;}
		var pos = {
			left : 0,
			top : 0
		};
		var box = el.getBoundingClientRect(),
			root = el.ownerDocument,
			body = root.body,
			docelem = root.documentElement,
			clTop = docelem.clientTop || body.clientTop || 0,
			clLeft = docelem.clientLeft || body.clientLeft || 0;
			pos.left = box.left +(self.pageXOffset || boxModel && docelem.scrollLeft || body.scrollLeft) - clLeft;
			pos.top = box.top + (self.pageYOffset || boxModel && docelem.scrollTop || body.scrollTop) -clTop;
		return pos;
	};
	
	acc.onmouseover = function(){
		this.className = 'account addrop';
		var pos = getoffset(this);
		mcc.style.left = pos.left + 'px';
		mcc.style.display = 'block';
	};	
	
	acc.onmouseout = function(){
		this.className = 'account';
		mcc.style.display = 'none';
	};
			
	bb.onmouseover = function(){
		this.className = 'baibao addrop';
		var pos = getoffset(this);
		mbb.style.left = pos.left + 'px';
		mbb.style.display = 'block';
	};	
	
	bb.onmouseout = function(){
		this.className = 'baibao';
		mbb.style.display = 'none';
	};		
	
	
})();