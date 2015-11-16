var $id = function(id){return document.getElementById(id);};

var getbyClass = function(parent, tag, name){
		parent = parent || document;
		tag = tag || "*";
		var arr = [];
		var reg = new RegExp("(^|\\s)" +name+ "(\\s|$)");
		var ts = parent.getElementsByTagName(tag);
		for(var i=0, j=ts.length; i<j; i++){
			 if(reg.test(ts[i].className)){
				arr.push(ts[i]);
			 }
		}
		return arr;

}

var addEvent = function(obj, type, fn){
		if(obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if(obj.attachEvent){
			obj.attachEvent("on" + type, fn);
		}else{
			obj["on" + type] = fn;
		}
}

function mgtab(navid, navtag, navclass, panelid, paneltag, panelclass, ev, index, callback){
    this.navid = navid || 'nav';
	this.navtag = navtag || 'li';
	this.navclass = navclass || 'on';
	this.panelid = panelid || 'panel';
	this.paneltag = paneltag || 'div';
	this.panelclass = panelclass || 'panel';
	this.ev = ev || 'click';
	this.index = index || 0;
	this.callback = callback || null;
	this.init();
}

mgtab.prototype.init = function(){
    var nav = (typeof this.navid == "string") ? $id(this.navid) : this.navid,
	    panel = (typeof this.panelid == "string") ? $id(this.panelid) : this.panelid,
		navList = nav.getElementsByTagName(this.navtag),
		panelList = getbyClass(panel,this.paneltag, this.panelclass),
		cur = this.index,
		cls = this.navclass,
		ev = this.ev,
		callback = this.callback;
	navList[cur].className = cls;
	//alert(cls);
	for(var i=0, j=navList.length; i<j; i++){ 
		if(i!=cur) panelList[i].style.display = 'none';
		(function(){
		   var p=i;
		   addEvent(navList[p], ev, function(e){
		         navList[p].blur();
		         e = e || window.event;
				 //alert(e.type);
				 if(e.preventDefault){
				    e.preventDefault();
				 }else{
				    e.returnValue = false;
				 }
				 
				 if(p!=cur){
					 navList[p].className = cls;
					 navList[cur].className = "";
					 panelList[p].style.display = 'block';
					 panelList[cur].style.display = 'none';
					 if(callback){
					     callback(navList[p], panelList[p]);
					 }
				 }
				 cur = p;
				 return false;
		   });
		})();
	}
	
};

var hoteltab = new mgtab('scrollDiv', 'a', 'on', 'qmangolist', 'div', 'tabpanel', 'mouseover', 0);	
hoteltab = null;

var photogallery = {
	timer : null,
	ttWidth : 0,
	scWidth : 0,
	lock : false,
	setconfig : function(config){
		this.scrollid = config.scrollid || 'scrollDiv';
		this.previd = config.previd || 'prevList';
		this.nextid = config.nextid || 'nextList';
		this.nodeWidth = config.nodeWidth || 93;
	},
	init : function(){
	    this.ttWidth = $id(this.scrollid).getElementsByTagName('li').length * this.nodeWidth;
		this.scWidth = $id(this.scrollid).offsetWidth;
		//alert(this.ttWidth);
		$id(this.previd).onmousedown = function(){photogallery.prevMousedown();};
		$id(this.previd).onmouseout = function(){photogallery.prevEnd('end');};
		$id(this.previd).onmouseup = function(){photogallery.prevEnd();};
		
		$id(this.nextid).onmousedown = function(){photogallery.nextMousedown();};
		$id(this.nextid).onmouseout = function(){photogallery.nextEnd('end');};
		$id(this.nextid).onmouseup = function(){photogallery.nextEnd();};
	},
	prevMousedown : function(){
	    if(this.lock){ return;}
		this.lock = true;
		this.timer = setInterval("photogallery.moveLeft()",10);
	},
	moveLeft : function(){
	    if($id(this.scrollid).scrollLeft + 10 > this.ttWidth - this.scWidth){
		    $id(this.scrollid).scrollLeft = this.ttWidth - this.scWidth;
			this.prevEnd();
		}else{
		    $id(this.scrollid).scrollLeft += 10;
		}
	},
	prevEnd : function(param){
	    if(param == 'end'){ if(!this.lock) return;}
		clearInterval(this.timer);
		this.lock = false;
		this.move(30);
	},
	nextMousedown : function(){
	    if(this.lock){ return;}
		this.lock = true;
		this.timer = setInterval("photogallery.moveRight()",10);
	},
	moveRight : function(){
	    $id(this.scrollid).scrollLeft -= 10;
		if($id(this.scrollid).scrollLeft == 0){this.nextEnd();}
	},
	nextEnd : function(param){
	    if(param == 'end'){ if(!this.lock) return;}
		clearInterval(this.timer);
		this.lock = false;
		this.move(-30);
	},
	moveTo : function(num){
	    if(this.lock){return;};
		this.lock = true;
		
	    var distance = Math.round(this.nodeWidth*num - this.scWidth/2)-41; //var li width
		distance -= $id(this.scrollid).scrollLeft;
		
		if($id(this.scrollid).scrollLeft + distance < 0){
		    distance = -$id(this.scrollid).scrollLeft;
		}
		if($id(this.scrollid).scrollLeft + distance >= this.ttWidth - this.scWidth){
		    distance = this.ttWidth - this.scWidth - $id(this.scrollid).scrollLeft;
		}
		this.move(distance);
	},
	move : function(num){
	    var n = num/4;
		if(Math.abs(n)<1 && n!=0){
		    n = n >=0 ? 1 : -1;
		}else{
		    n = Math.round(n);
		}
		var t = $id(this.scrollid).scrollLeft + n;
		if(t<=0){$id(this.scrollid).scrollLeft = 0;this.lock = false;return;}
		if(t >= this.ttWidth - this.scWidth){$id(this.scrollid).scrollLeft = this.ttWidth - this.scWidth;this.lock = false;return;}
		$id(this.scrollid).scrollLeft += n;
		num -= n;
		if(Math.abs(num) <= 1){
		    this.lock = false;return;
		}else{
			setTimeout("photogallery.move(" + num + ")",10)
		}
	}
};
photogallery.setconfig({previd:'qprev', nextid:'qnext', nodeWidth:37});
photogallery.init();


