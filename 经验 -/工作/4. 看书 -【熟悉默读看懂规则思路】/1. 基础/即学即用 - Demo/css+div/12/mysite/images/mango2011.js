// mangocity ui
if(typeof MG == "undefined" || !MG) { var MG = {}; }

MG.Event = {
	getEvent : function(e){
		return e || window.event || top.window.event;
	},
	getTarget : function(e){
		e = MG.Event.getEvent(e);
		return e.target || e.srcElement;
	},
	getkeycode : function(e){
		e = MG.Event.getEvent(e);
		var code = e.keyCode ? e.keyCode : e.witch ? e.witch : null;
		return code;
	},
	stopPropagation : function(e){
		e = MG.Event.getEvent(e);
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	},
	preventDefault : function(e){
		e = MG.Event.getEvent(e);
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	},
	stopEvent : function(e){
		e = MG.Event.getEvent(e);
		this.stopPropagation(e);
		this.preventDefault(e);
	},
	addEvent : function(obj, type, fn){
		if(obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if(obj.attachEvent){
			obj.attachEvent("on" + type, fn);
		}else{
			obj["on" + type] = fn;
		}
	},
	delEvent : function(obj, type, fn){
		if(window.removeEventListener){
			obj.removeEventListener(type, fn, false);
		}else if(window.detachEvent){
			obj.detachEvent('on'+type,fn);
		}else{
			obj['on'+type] = null;
		}
	}
};

MG.Style = {
	hasClass : function(obj, sClass){
		var classname = obj.className,
			re = new RegExp("(?:^|\\s)" + sClass + "(?:\\s|$)");
		return obj && sClass && classname && re.test(classname);
	},
	removeClass : function(obj, sClass){
		var reg = new RegExp("(^|\\s)" +sClass+ "(\\s|$)");
		if(obj.className){
		    obj.className = obj.className.replace(reg, ' ');
		}else{
		    obj.className = obj.className.replace(reg, '');
		}
		
	},
	addClass: function(obj, sClass){
	    if(obj.className.length){
			var cln = obj.className.split(" ");
			cln.push(sClass);
			obj.className = cln.join(" ");
		}else{
		    obj.className = sClass;
		}
	},
	getStyle : function(obj, name){
	    if(obj.style[name]){
		    return obj.style[name];
		}else if(obj.currentStyle){
		    return obj.currentStyle[name];
		}else if(document.defaultView && document.defaultView.getComputedStyle){
		    name = name.replace(/([A-Z])/g,"-$1");
			name = name.toLowerCase();
			var s = document.defaultView.getComputedStyle(obj,"");
			return s && s.getPropertyValue(name);
		}else{
		    return null;
		}
	}
};

var boxModel = (function(){
	var div = document.createElement("div");
	div.style.width = div.style.paddingLeft = "1px";
	document.body.appendChild(div);
	var boxModel = div.offsetWidth === 2;
	document.body.removeChild(div).style.display = "none";
	div = null;
	return boxModel;
})();

var contains = function(a, b){
	if(!a) return false;
	var iscontain = false;
	if(a.contains){
		iscontain = a.contains(b);
	}else{
		iscontain = a.compareDocumentPosition(b) == 20 ? true : false;
	}
	return iscontain;
};


MG.Dom = {
    getid : function(id){ return (typeof id === "string") ? document.getElementById(id) : id; },
	getbyClass : function(parent, tag, name){
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

	},	
	next : function(elem){
	    do{
		  elem = elem.nextSibling
		}while(elem && elem.nodeType !=1)
		return elem;	
	},
	prev : function(elem, dept){
	    dept = dept || 1;
		var cur = 0;
		//console.log(cur);
		for(;elem;elem = elem.previousSibling){
		    if(elem.nodeType === 1 && ++cur === dept){
			    //console.log(cur);
			    break;
			}
		}
		//console.log(cur);
		return elem;	
	},
	remove : function(elem){
	    while(elem && elem.firstChild){
		  elem.removeChild(elem.firstChild);
		}
	},
	getoffset : function(el){
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

	},
	getparentoffset : function(el, parent){
	    if(!el || !el.parentNode || !el.ownerDocument){return null;}
		var ppos = {
			left : 0,
			top : 0
		};
		ppos.left = getoffset(el).left - getoffset(parent).left;
		ppos.top = getoffset(el).top - getoffset(parent).top;
		return ppos;
	}	
}
MG.ajax =(function(){
		//do handel
	    function handle(o, callback){
		    var poll = setInterval(function(){
			    if(o&&o.readyState == 4){
				    window.clearInterval(poll);
					if(callback){
					    callback(o);
					}
				}								
			}, 50);
		}
		
		// get xhr
		var getxhr = function(){
		    if(typeof XMLHttpRequest != 'undefined'){
			    getxhr = function(){
				    return new XMLHttpRequest();
				};
			}else if(typeof ActiveXObject !='undefined'){
			    getxhr = function(){
				    return new ActiveXObject(
					    navigator.userAgent.indexOf('MSIE 5') >=0 ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'
					);
				};
			}else{
			    getxhr = function(){
				    throw new Error('can not create xhr!');
				};
			}
			return getxhr();
		};
		
		// send msg
		return function(method, uri, callback, postData){
			var http = getxhr();
			http.open(method, uri, true);
			handle(http, callback);
			http.send(postData || null);
			return http;
		};
})();
// form verification

var formValid = {
    trim : function(val){
	    return val.replace(/^\s+|\s+$/g, "");
	},
    isDate : function(str){
		var reg = /(?:[19|20]\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/;
		return reg.test(str) && str.length == 10;
	},
	compareDate : function(d1, d2, str){
	    var d1arr = d1.split(str), d2arr = d2.split(str);
		return (d2arr[0]>d1arr[0] || (d2arr[0]==d1arr[0] && d2arr[1]>d1arr[1]) || (d2arr[0]==d1arr[0] && d2arr[1]==d1arr[1] && d2arr[2]>d1arr[2])) ? 1 : 0;
	}
};





// bind function
function bind(fn, context){
    var args = Array.prototype.slice.call(arguments, 2);
	return function(){
	    var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	};
}

// is function
var isFunction = (function(){
    return "object" === typeof document.getElementById ?
	isFunction = function(fn){
	    try{
		    return /^\s*\bfunction\b/.test(''+fn);
		}catch(e){
		    return false;
		}
	}:
	isFunction = function(fn){
	    return "[object Function]" === Object.prototype.toString.call(fn);
	};
})();

var isArray = function(obj){
    return "[object Array]" === Object.prototype.toString.call(obj);
};


// metho and function

Function.prototype.method = function(name, fn){
    this.prototype[name] = fn;
	return this;
};

if(!Array.prototype.forEach){
    Array.method('forEach', function(fn, thisObj){
	    var scope = thisObj || window;
		for(var i=0, len=this.length; i<len; ++i){
		    fn.call(scope, this[i], i, this);
		}
	});
}

// JavaScript Document

function Selecter(target, config){
    this.target = target || null;
	this.swidth = config.swidth || 98;
	this.callback = config.callback || null;
	this.list = config.list;
	this.isopen = false;
	this.keyIndex = 0;
	this._init(); //初始化
}

Selecter.prototype = {
    _init : function(){
	    this._startEvent();
	},
	
	_createhtml : function(){
		if(MG.Dom.getid('selecter')){
			return;
		}
		if(!MG.Dom.getid('selecter')){
			var div = document.createElement('div');
			div.className = "selecter";
			div.id = "selecter";
			
			document.body.appendChild(div);
		}
		var slWrap = MG.Dom.getid('selecter');
		slWrap.innerHTML = '<div id="sltit" class="sltit">请选择选择</div><div id="sllist" class="sllist"></div><iframe frameborder="0" marginheight="0" marginwidth="0" id="mgiframe" style="position:absolute; left:-8px; top:-8px; overflow:hidden; width:106px; background:#fff; border:0; z-index:-1; opacity:0; filter:alpha(opacity = 0);"></iframe>';
	
	},
	_setPosition : function(el, wrap){
		 var pos = MG.Dom.getoffset(el);
		 if(!this.isopen) wrap.style.display = "block";
		 wrap.style.left = (pos.left-2) + "px";
		 wrap.style.top = pos.top + el.offsetHeight + "px";
		 this.isopen = true;
	},
	_resetPosition: function(wrap){
		 if(this.isopen) wrap.style.display = "none";
		 this.isopen = false;
	},
	_setInputValue: function(el,tag){
	     if(el.tagName =='INPUT'){
		     el.value = tag.firstChild.nodeValue;
			 el.style.color='#333333';
			 if(MG.Dom.next(el)){
			     MG.Dom.next(el).value = tag.title;
			 }
		 }
	},
	_pclick :function(e, obj){
		 var eTarget = MG.Event.getTarget(e);
		 if(eTarget.nodeName == 'A'){
			 this._setInputValue(obj, eTarget);
		 }else if(eTarget.parentNode.nodeName == 'A'){
			 this._setInputValue(obj, eTarget.parentNode);
		 }
	},
	_setSelect : function(tags, name, index){
	    for(var i=0, j=tags.length; i<j; i++){
		    MG.Style.removeClass(tags[i], name);
		}
		MG.Style.addClass(tags[index], name);

	},
	_droplist : function(){
	    var list = this.list;
	    var str = '<ul>';
		for(var i=0, len = list.length; i<len; i++){
		    str += '<li><a href="javascript:void(0);" title="'+ list[i][1] +'">'+ list[i][0] +'</a></li>'
		}
		str += '</ul>';
		return str;
	},
	_focus : function(target){
	    this._createhtml();
		MG.Dom.getid('sllist').innerHTML = this._droplist();
		var wrap = MG.Dom.getid('selecter');
		
		if(this.swidth){
			wrap.style.width = this.swidth + 'px';
		}
		
		this._setPosition(target, wrap);
		var that = this;
		wrap.onclick = function(e){
			that._pclick(e, target);
			that._resetPosition(wrap);
			MG.Event.stopEvent(e);
		}
		this.isopen = true;
		//target.blur();
		
	},
	_keyup : function(e){
	    var slList = MG.Dom.getid('sllist');
		var ekeycode = MG.Event.getkeycode(e);
		aSelect = slList.getElementsByTagName('a');
		var wrap = MG.Dom.getid('selecter');
		 switch(ekeycode){
			 case 13 : //enter
					 if(this.isopen){
						 this._setInputValue(input, aSelect[this.keyIndex]);
						 this._resetPosition(wrap);
					 }
					 MG.Event.stopEvent(e);
					 break;
			 case 27 : //esc
					 this._resetPosition(wrap);
					 break;
			 case 38 : //up
					 this.keyIndex <= 0 ? this.keyIndex = aSelect.length-1 : this.keyIndex--;
					 this._setSelect(aSelect, 'current', this.keyIndex);
					 MG.Event.stopEvent(e);
					 break;
			 case 40 : //down
					 this.keyIndex >= aSelect.length-1 ? this.keyIndex = 0 : this.keyIndex++;
					 this._setSelect(aSelect, 'current', this.keyIndex);
					 MG.Event.stopEvent(e);
					 break;
			 default :
				  break;
		 }							
	
	},
	_startEvent : function(){
	    var that = this;
		
	    that.target.onfocus = that.target.onclick = function(){
		    that._focus(that.target);
			
		};
		
		
		MG.Event.addEvent(document, 'click', function(e){
		    var wrap = MG.Dom.getid('selecter');
			var eTarget = MG.Event.getTarget(e);
			if(eTarget==that.target){ return false;}
			if(contains(wrap, eTarget)) return;
			that._resetPosition(wrap);

		});

	}
};

var pricelist = [['不限',''],['200元以下','0-200'],['200-300元','200-300'],['300-500元','300-500'],['500元以上','500-99999']];
var price = new Selecter(MG.Dom.getid('id_hotelPriceStr'), {list:pricelist});
//price = null;

var fslist = [['全部',''],['00:01—12:00','00:01—12:00'],['12:01—18:00','12:01—18:00'],['18:01—24:00','18:01—24:00']];
var fstart = new Selecter(MG.Dom.getid('id_startTime'), {list:fslist});
//fstart = null;

var felist = [['全部',''],['00:01—12:00','00:01—12:00'],['12:01—18:00','12:01—18:00'],['18:01—24:00','18:01—24:00']];
var fend = new Selecter(MG.Dom.getid('id_backTime'), {list:felist});
//fend = null;

var taketimelist = [['08:00','08:00'],['09:00','09:00'],['10:00','10:00'],['11:00','11:00'],['12:00','12:00'],['13:00','13:00'],['14:00','14:00'],['15:00','15:00'],['16:00','16:00'],['17:00','17:00'],['18:00','18:00'],['19:00','19:00'],['20:00','20:00'],['21:00','21:00'],['22:00','22:00']];
var taketime = new Selecter(MG.Dom.getid('taketime'), {list:taketimelist});
//taketime = null;
var returntimelist = [['08:00','08:00'],['09:00','09:00'],['10:00','10:00'],['11:00','11:00'],['12:00','12:00'],['13:00','13:00'],['14:00','14:00'],['15:00','15:00'],['16:00','16:00'],['17:00','17:00'],['18:00','18:00'],['19:00','19:00'],['20:00','20:00'],['21:00','21:00'],['22:00','22:00']];
var returntime = new Selecter(MG.Dom.getid('returntime'), {list:returntimelist});
//returntime = null;







//for city drop list
MG.citySelect = MG.citySelect || (function(){
    var slWrap = MG.Dom.getid('mgSelect'),
	    slTit = MG.Dom.getid('mgsltit'),
		slList = MG.Dom.getid('mgcitylist'),
		slIframe = MG.Dom.getid('mgiframe');
	var comList = [], allList = [];
	var inputNotes = ["中文/拼音"], selectInput = [], flag, commoncitys = [], citys = [];
	var keyIndex = 0;
	var isopen = false;
	
	
	//自定义字符串方法
	if(!String.prototype.trim)
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g, "");
	}
	
	//初始化输入框颜色并且获取输入框
	function setInputInit(){
	    var inputs = document.getElementsByTagName('input');
		for(var i=0, len=inputs.length; i<len; i++){
		    if(inputs[i].defaultValue === inputNotes[0]){
			     inputs[i].style.color = '#999';
			}
			if(/MGcity/.test(inputs[i].className)){
			    //var flag = inputs[i].getAttribute('title');
				//var list = getArray(flag);
				//commoncitys = list.commoneArray;
				//citys = list.allArray;
				selectInput.push(inputs[i]);
			}
		}
		return selectInput;
	}
	
	//建立下拉框结构
	function createSelect(){
		if(MG.Dom.getid('mgSelect')) return;
		if(!MG.Dom.getid('mgSelect')){
			var div = document.createElement('div');
			div.className = "mgSelect";
			div.id = "mgSelect";
			document.body.appendChild(div);
		}
		var slWrap = MG.Dom.getid('mgSelect');
		slWrap.innerHTML = '<div id="mgsltit" class="mgsltit">输入中文/拼音或&uarr;&darr;选择</div><div id="mgcitylist" class="mgcitylist"></div><iframe frameborder="0" marginheight="0" marginwidth="0" id="mgiframe" style="position:absolute; left:-8px; top:-8px; overflow:hidden; width:218px; background:#fff; border:0; z-index:-1; opacity:0; filter:alpha(opacity = 0);"></iframe>';
	
	}
	
	//判断数组类型(机票或者酒店)
	function getArray(flag){
	    var city = {
		    commoneArray : [],
			allArray : []
		};
		switch(flag){
		    case 'flight' :
			    city.commoneArray = commoncitysFlight;
				city.allArray =  citysForFlight;
				break;
			case 'hotel' :
			    city.commoneArray = commoncitysHotel;
				city.allArray =  citysForHotel;
				break;
			case 'car' :
			    city.commoneArray = carHotCitys;
				city.allArray =  carCitys;
			    break;
			case 'gat' :
			    city.commoneArray = gatarr;
				city.allArray =  gatarr;
			    break;
				
			default :
			    break;
			
		}
		
		return city;
	}
	
	//获取常用城市列表
	function getCommFlightList(){
	     var flightList = "";
	     if(!commoncitys || commoncitys.constructor != Array || commoncitys.length == 0) return;
		 for(var i=0, len = commoncitys.length; i<len; i++){
		     flightList+='<a id="'+commoncitys[i][0]+'" href="#"><span>'+commoncitys[i][1]+'</span><em>'+commoncitys[i][2]+'</em></a>';
		 }
		 return flightList;
	}
	
	//动态获取城市列表
	function dynamicList(oInput){
	     var sVal = oInput.value;
		 var aList = "";
		 if(!sVal.trim()) return aList;
		 sVal = sVal.toUpperCase();
		 if(!citys || citys.constructor != Array || citys.length == 0) return;
		 for(var i=0, len = citys.length; i<len; i++){
		     if(getLeftStr(citys[i][3], sVal.length) == sVal || getLeftStr(citys[i][0], sVal.length) == sVal || getLeftStr(citys[i][2], sVal.length) == sVal ||(citys[i][1].indexOf(sVal) !=-1)){
			     aList+='<a id="'+citys[i][0]+'" href="#"><span>'+citys[i][1]+'</span><em>'+citys[i][2]+'</em></a>';
			 }
		    
		 }
		 if(aList.length){
		     slTit.innerHTML=''+sVal.toLowerCase()+' ,按拼音排序';
		 }else{
		     slTit.innerHTML='对不起,找不到 '+sVal.toLowerCase()+'';
			 aList = "unfound";
			 return aList;
		 }
         //console.log(aList);
		 return aList;
	}
	
	//检查输入框中字符是否在列表中
	function isListProperty(val){
	     var back = {id:'', value:''};
		 if(!citys || citys.constructor != Array || citys.length == 0) return;
		 
		 for(var i=0, len = citys.length; i<len; i++){
		     if( citys[i][1] == val || citys[i][2] == val.toUpperCase()){
			     back.id = citys[i][0];
				 back.value = citys[i][1];
				 return back;
			 }
		 }
		 return false;
	}
	
	//获取字符串左边字符
    function getLeftStr(str,len){
        if(!len){
            len = str.length;
        }else{
            if(parseInt(len)<0||parseInt(len)>str.length){
                len = str.length;
            }
        }
        return str.substring(0,len).toUpperCase();
    }
	
	//自动获取列表高度
	function setIframeH(listH, framH){
	     if(!listH || !framH) return;
	     var listHeight = listH.offsetHeight + 4;
		 framH.style.height = listHeight + "px";
	}
	
	//输入框赋值
	function setInputValue(el,tag){
	     if(el.tagName =='INPUT'){
		     el.value = tag.firstChild.firstChild.nodeValue;
			 MG.Dom.next(el).value = tag.id ;
			 el.style.color='#333333';
			 
			 if(el.id==='car_cityname'){
			     var zuchelist = getCarQu(tag.id);
				 var distr = MG.Dom.getid('distr');
				 distr.value = '';
				 MG.Dom.next(distr).value = '';
				 //console.log(zuchelist);
				 var distrs = new Selecter(distr, {list:zuchelist, swidth:203});
				 //distrs
                 //fstart = null;
				 
			     //distr.value = zuchelist[0][0];
				 //MG.Dom.next(distr).value = zuchelist[0][1];
			 }
			 
		 }else{
		     el.innerHTML = tag.id;
		 }
	}
	
	//设置选择项
	function setSelect(tags, name, index){
	    for(var i=0, j=tags.length; i<j; i++){
		    MG.Style.removeClass(tags[i], name);
		}
		MG.Style.addClass(tags[index], name);

	}
	
	function focuscode(el){
	   　if(el.defaultValue ==inputNotes[0] && el.value == el.defaultValue){
	        el.value='';
		    el.style.color='#333333';
	   　}
	}
	function blurcode(el){
	    if(!el.value) {
		 el.value = inputNotes[0];
		 el.style.color='#999';
		}else{
		    var valid = isListProperty(el.value);
		    if(valid){
			    el.value = valid.value;
				MG.Dom.next(el).value = valid.id;
			}else{
			    el.value = el.value;
				MG.Dom.next(el).value = '';
				el.style.color='#999';
			}
		}
	}
	

    return{
	    init : function(){
             setInputInit();
             if(!selectInput.length) return;			 
		     createSelect();
			 //this.fillCommListIn(slList); //预先生成列表?
			 this.startEvent();
		
			 //console.log(selectInput);
			 //this.al();
		},
		fillCommListIn : function(el){
		     var list = getCommFlightList();
		     el.innerHTML = list;
			 el.firstChild.className='current';
			 slTit.innerHTML = '输入中文/拼音或&uarr;&darr;选择';
			 //keyIndex = 0;
		},
		fillDynamicIn : function(el, oInput){
		     var list = dynamicList(oInput);
			 if(list.length && list!="unfound"){
		         el.innerHTML = list;
			     el.firstChild.className='current';
			 }else if(list=="unfound"){
			     el.innerHTML = "";
			 }else{
			    slTit.innerHTML = '输入中文/拼音或&uarr;&darr;选择';
			    this.fillCommListIn(slList);
			 }
			 //keyIndex = 0;
		},
		setPosition : function(el, wrap){
		     var pos = MG.Dom.getoffset(el);
			 if(!isopen) wrap.style.display = "block";
			 wrap.style.left = (pos.left-2) + "px"; //just for index
			 wrap.style.top = pos.top + el.offsetHeight + "px";
			 isopen = true;
			 setIframeH(wrap, slIframe);
		},
		resetPosition : function(wrap){
		     if(isopen) wrap.style.display = "none";
			 isopen = false;
		},
		pclick : function(e, obj){
		     var eTarget = MG.Event.getTarget(e);
			 if(eTarget.nodeName == 'A'){
			     setInputValue(obj, eTarget);
			 }else if(eTarget.parentNode.nodeName == 'A'){
			     setInputValue(obj, eTarget.parentNode);
			 }
			 obj.blur();
		},
		startEvent : function(){
		     var that = this;
			 var aSelect = [];
		     for(var i=0, len = selectInput.length; i<len; i++){
				(function(cc){
					//var cur = selectInput[i]; //for ie
					MG.Event.addEvent(selectInput[cc], 'focus', function(){
						var flag = selectInput[cc].getAttribute('title');
						var list = getArray(flag);
						//if(!list || !list.length){ return false;}
						commoncitys = list.commoneArray;
						citys = list.allArray;
					    focuscode(selectInput[cc]);
						//that.fillDynamicIn(slList, selectInput[cc]);
						that.fillCommListIn(slList);
						aSelect = slList.getElementsByTagName('a');
						var oldscroll = document.body.scrollWidth;
						that.setPosition(selectInput[cc], slWrap);
						// reset the position when  page exist scroll
						if(document.body.scrollWidth != oldscroll){
						    that.setPosition(selectInput[cc], slWrap);
							oldscroll = document.body.scrollWidth;
						}
						keyIndex = 0;
						slWrap.onclick = function(e){
						    that.pclick(e, selectInput[cc]);
							that.resetPosition(slWrap);
							MG.Event.stopEvent(e);
						}
						selectInput[cc].onfocus = null;
					});
					
					
					MG.Event.addEvent(selectInput[cc], 'keyup', function(e){
					    var ekeycode = MG.Event.getkeycode(e);
						//alert(ekeycode);
						that.fillDynamicIn(slList, selectInput[cc]);
						aSelect = slList.getElementsByTagName('a');
						//dynamicList(selectInput[cc]);
						 switch(ekeycode){
						     case 8  :
							         that.fillDynamicIn(slList, selectInput[cc]);
									 that.setPosition(selectInput[cc], slWrap);
									 MG.Dom.next(selectInput[cc]).value = "";
									 break;
							 case 13 : //enter
									 if(isopen && aSelect.length){ //aSelect[keyIndex]
										 setInputValue(selectInput[cc], aSelect[keyIndex]);
										 that.resetPosition(slWrap);
										 
									 }else{
										 that.resetPosition(slWrap);
									 }
									 MG.Event.stopEvent(e);
									 break;
							 case 27 : //esc
									 that.resetPosition(slWrap);
									 break;
							 case 38 : //up
									 keyIndex <= 0 ? keyIndex = aSelect.length-1 : keyIndex--;
									 setSelect(aSelect, 'current', keyIndex);
									 MG.Event.stopEvent(e);
								     break;
							 case 40 : //down
									 keyIndex >= aSelect.length-1 ? keyIndex = 0 : keyIndex++;
									 setSelect(aSelect, 'current', keyIndex);
									 MG.Event.stopEvent(e);
								     break;
							 default :
								  break;
						 }							
						
					});
					
					MG.Event.addEvent(selectInput[cc], 'blur', function(){
					    blurcode(selectInput[cc]);
					});

				})(i);
			 }



			MG.Event.addEvent(document, 'click', function(e){
				var eTarget = MG.Event.getTarget(e);
				if(eTarget.nodeName == 'INPUT' && /MGcity/.test(eTarget.className)) return;
				if(contains(slWrap, eTarget)) return;
				that.resetPosition(slWrap);

			});
			 
		},
		al : function(){
		     alert('ok');
		}
	};	
	 
})();

MG.citySelect.init();

//radio 切换
MG.radioChange = MG.radioChange || (function(){
	var rd1 = MG.Dom.getid('id_lineType1');
	var rd2 = MG.Dom.getid('id_lineType2');
	var rebdate = MG.Dom.getid('rebdate');
	var rebtime = MG.Dom.getid('rebtime');
	
	return{
	     init : function(){
		    
			if(rd1 && rd2 && rebdate && rebtime){
			    //rd1.setAttribute('checked', 'checked');
				MG.Event.addEvent(rd1, 'click', function(){
					rebtime.style.display = "none";
					rebdate.style.display = "none";
				});
				MG.Event.addEvent(rd2, 'click', function(){
					rebtime.style.display = "block";
					rebdate.style.display = "block";
				});
			}
		 
		 }
	}

})();
MG.radioChange.init();


var photogallery = {
	timer : null,
	tt : null,
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
	    this.ttWidth = MG.Dom.getid(this.scrollid).getElementsByTagName('li').length * this.nodeWidth;
		this.scWidth = MG.Dom.getid(this.scrollid).offsetWidth;
		//alert(this.ttWidth);
		var that = this;
		MG.Dom.getid(this.previd).onmousedown = function(){that.prevMousedown();};
		MG.Dom.getid(this.previd).onmouseout = function(){that.prevEnd('end');};
		MG.Dom.getid(this.previd).onmouseup = function(){that.prevEnd();};
		
		MG.Dom.getid(this.nextid).onmousedown = function(){that.nextMousedown();};
		MG.Dom.getid(this.nextid).onmouseout = function(){that.nextEnd('end');};
		MG.Dom.getid(this.nextid).onmouseup = function(){that.nextEnd();};
	},
	prevMousedown : function(){
	    if(this.lock){ return;}
		if(this.timer){clearInterval(this.timer);}
		this.lock = true;
		var that = this;
		this.timer = setInterval(function(){
		    that.moveLeft();
		},10);
	},
	moveLeft : function(){
	    if(MG.Dom.getid(this.scrollid).scrollLeft + 10 > this.ttWidth - this.scWidth){
		    MG.Dom.getid(this.scrollid).scrollLeft = this.ttWidth - this.scWidth;
			this.prevEnd();
		}else{
		    MG.Dom.getid(this.scrollid).scrollLeft += 10;
		}
	},
	prevEnd : function(param){
	    if(param == 'end'){ if(!this.lock) return;}
		clearInterval(this.timer);
		this.lock = false;
		if(this.tt){clearTimeout(this.tt)}
		this.move(30);
	},
	nextMousedown : function(){
	    if(this.lock){ return;}
		if(this.timer){clearInterval(this.timer);}
		this.lock = true;
		var that = this;
		this.timer = setInterval(function(){
		    that.moveRight();
		},10);
	},
	moveRight : function(){
	    MG.Dom.getid(this.scrollid).scrollLeft -= 10;
		if(MG.Dom.getid(this.scrollid).scrollLeft == 0){this.nextEnd();}
	},
	nextEnd : function(param){
	    if(param == 'end'){ if(!this.lock) return;}
		clearInterval(this.timer);
		this.lock = false;
		if(this.tt){clearTimeout(this.tt)}
		this.move(-30);
	},
	moveTo : function(num){
	    if(this.lock){return;};
		this.lock = true;
		
	    var distance = Math.round(this.nodeWidth*num - this.scWidth/2)-41; //var li width
		distance -= MG.Dom.getid(this.scrollid).scrollLeft;
		
		if(MG.Dom.getid(this.scrollid).scrollLeft + distance < 0){
		    distance = -MG.Dom.getid(this.scrollid).scrollLeft;
		}
		if(MG.Dom.getid(this.scrollid).scrollLeft + distance >= this.ttWidth - this.scWidth){
		    distance = this.ttWidth - this.scWidth - MG.Dom.getid(this.scrollid).scrollLeft;
		}
		if(this.tt){clearTimeout(this.tt)}
		this.move(distance);
	},
	move : function(num){
	    var n = num/4;
		if(Math.abs(n)<1 && n!=0){
		    n = n >=0 ? 1 : -1;
		}else{
		    n = Math.round(n);
		}
		var t = MG.Dom.getid(this.scrollid).scrollLeft + n;
		if(t<=0){MG.Dom.getid(this.scrollid).scrollLeft = 0;this.lock = false;return;}
		if(t >= this.ttWidth - this.scWidth){MG.Dom.getid(this.scrollid).scrollLeft = this.ttWidth - this.scWidth;this.lock = false;return;}
		MG.Dom.getid(this.scrollid).scrollLeft += n;
		num -= n;
		if(Math.abs(num) <= 1){
		    this.lock = false;return;
		}else{
		    var that = this;
			that.tt = setTimeout(function(){
			    that.move(num);
			},10)
		}
	}
};
photogallery.setconfig({scrollid:'flightwrap', previd:'flightprev', nextid:'flightnext', nodeWidth:37});
photogallery.init();


function clone(obj){
    function F(){}
	F.prototype = obj;
	return new F();
}
var hotelgallery = clone(photogallery);

hotelgallery.setconfig({scrollid:'hotelwrap', previd:'hotelprev', nextid:'hotelnext', nodeWidth:37});
hotelgallery.init();



//set hotel date
(function(){
    var id_hotelStartDate = MG.Dom.getid('id_hotelStartDate');
	var id_hotelBackDate = MG.Dom.getid('id_hotelBackDate');
    var id_startDate = MG.Dom.getid('id_startDate');
	var id_backDate = MG.Dom.getid('id_backDate');
	var startDate = MG.Dom.getid('startDate');
	var endDate = MG.Dom.getid('endDate');
	//var startTime = MG.Dom.getid('startTime');
	
	MG.setDate = (function(){
		function addDay(num){
			var now = new Date();
			var olddate = now.getDate();
			now.setDate(now.getDate()+num);
			return now.getFullYear() + '-' + ((now.getMonth()+1)<10 ? "0"+(now.getMonth()+1): (now.getMonth()+1))+'-'+ (now.getDate()<10 ? "0"+now.getDate() :now.getDate());
		}
		
		return{
			init : function(){
				id_hotelStartDate.value = addDay(1);
				id_hotelBackDate.value = addDay(2);
				id_startDate.value = addDay(1);
				id_backDate.value = addDay(2);
				startDate.value = addDay(1);
				endDate.value = addDay(2);
				//startTime.value = addDay(1);
			}
		}
	})();
    MG.setDate.init();	
	//var hotelstart = new Datepicker(id_hotelStartDate, {eachW:144,ttMonth:2, startDate:[2011,3,1], endDate:[2011,6,30], callback:null});
	var hotelstart = new Datepicker(id_hotelStartDate, {eachW:144,ttMonth:2, addDays:60, callback:callhotelstart});
	var hotelend = new Datepicker(id_hotelBackDate, {eachW:144,ttMonth:2, addDays:60, callback:callhotelstart});
	
	var flightstart = new Datepicker(id_startDate, {eachW:144,ttMonth:2, addDays:360, callback:callhotelstart});
	var flightend = new Datepicker(id_backDate, {eachW:144,ttMonth:2, addDays:360, callback:callhotelstart});
	
	var carstart = new Datepicker(startDate, {eachW:144,ttMonth:2, addDays:60, callback:callhotelstart});
	var carend = new Datepicker(endDate, {eachW:144,ttMonth:2, addDays:60, callback:callhotelstart});
	
	//var shipstart = new Datepicker(startTime, {eachW:144,ttMonth:2, addDays:60, callback:callhotelstart});
	
	function callhotelstart(o, t){
	    o.value = t.title;
		//id_hotelBackDate.focus();
	}
	hotelstart = hotelend = flightstart = flightend = startDate = endDate = null;


/*
MG.Dom.getid('distr').onclick = function(){
    var val = MG.Dom.getid('carSearchVOcityCode').value;
	//console.log(val);
	if(val){
	    var zuchelist = getCarQu(val);
		//console.log(zuchelist);
		
		var distr = new Selecter(this, {list:zuchelist,swidth:210});
		this.focus();
		distr = null;
		
	}
};	

	
MG.Dom.getid('distr').onfocus = function(){
    setTimeout(function(){
    var val = MG.Dom.getid('carSearchVOcityCode').value;
	//console.log(val);
	if(val){
	    var zuchelist = getCarQu(val);
		
	    //var str = '';
	    var frag = document.createDocumentFragment();
		for(var i=0, len = zuchelist.length; i<len; i++){
		    var opt = document.createElement('option');
			opt.value = zuchelist[i][1];
			opt.text = zuchelist[i][0];
			frag.appendChild(opt);
		    //str += '<option value ="'+ zuchelist[i][1] +'">'+ zuchelist[i][0] +'</option>'
		}
		MG.Dom.getid('distr').appendChild(frag);
		//MG.Dom.getid('distr').innerHTML = str;
		//console.log(zuchelist);
		
		//var distr = new Selecter(MG.Dom.getid('distr'), {list:zuchelist,swidth:210});
		//distr = null;
	}
	
	
	},200);

};	
	
*/	
	
var formValid = {
    trim : function(val){
	    return val.replace(/^\s+|\s+$/g, "");
	},
    isDate : function(str){
		var reg = /(?:[19|20]\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/;
		return reg.test(str) && str.length == 10;
	},
	compareDate : function(d1, d2, str){
	    var d1arr = d1.split(str), d2arr = d2.split(str);
		return (d2arr[0]>d1arr[0] || (d2arr[0]==d1arr[0] && d2arr[1]>d1arr[1]) || (d2arr[0]==d1arr[0] && d2arr[1]==d1arr[1] && d2arr[2]>d1arr[2])) ? 1 : 0;
	}
};

function getThreeWordByCity(cityName,flag){
    var commoncitys, citys, threeWord = "";
    if(flag!=undefined&&flag!=null&&flag=="hotel"){
       commoncitys = commoncitysHotel;
       citys = citysForHotel;
    }else if(flag!=undefined&&flag!=null&&flag=="flight"){
       commoncitys = commoncitysFlight;
       citys = citysForFlight;
    }
    for(var i = 0,len = citys.length;i<len;i++){
        if(cityName == citys[i][1]){
            threeWord = citys[i][0];
            break;
        }
    }
    return threeWord;
}

	
var lineType = 'ow';
if(MG.Dom.getid('id_lineType1') && MG.Dom.getid('id_lineType2')){

	MG.Dom.getid('id_lineType1').onfocus = MG.Dom.getid('id_lineType1').onclick = function(){
		lineType = 'ow';
	};
	MG.Dom.getid('id_lineType2').onfocus = MG.Dom.getid('id_lineType2').onclick = function(){
		lineType = 'rt';
	};

}

	
if(MG.Dom.getid('id_research')){

    MG.Event.addEvent(MG.Dom.getid('id_queryFlightForm'), 'submit', function(e){
	    MG.Event.preventDefault(e);
	});

	MG.Event.addEvent(MG.Dom.getid('id_research'), 'click', function(){
		var lt = MG.Dom.getid('id_lineType1'),
			sc = MG.Dom.getid('id_startCity'),
			ec = MG.Dom.getid('id_endCity'),
			sd = MG.Dom.getid('id_startDate'),
			bd = MG.Dom.getid('id_backDate');
			startCity = sc.value,
			endCity = ec.value,
			startDate = sd.value,
			backDate = bd.value;
		if(getThreeWordByCity(startCity,"flight") == ""){
		   alert("请填写正确的出发城市");
		   window.setTimeout(function(){sc.focus(); }, 10);
		   
		}else if(getThreeWordByCity(endCity,"flight") == ""){
		   alert("请填写正确的到达城市");
		   window.setTimeout(function(){ec.focus(); }, 10);
		}else if(getThreeWordByCity(startCity,"flight") == getThreeWordByCity(endCity,"flight")){
		   alert("出发城市与到达城市不能同名");
		   ec.value = "";
		   MG.Dom.next(ec).value = "";
		   window.setTimeout(function(){ec.focus(); }, 10);
		}else if(!formValid.isDate(startDate)){
		   alert("请填写正确的出发日期");
		   sd.value = "";
		   window.setTimeout(function(){sd.focus();}, 10);
		}else if(lineType == "rt" && !formValid.isDate(backDate)){
		   alert("请填写正确的返程日期");
		   bd.value = "";
		   window.setTimeout(function(){bd.focus();}, 10);
		}else if(lineType == "rt" && !formValid.compareDate(startDate, backDate, '-')){
		   alert("返程日期应晚于出发日期");
		   bd.value = "";
		   window.setTimeout(function(){bd.focus();}, 10);
		}else{
		   MG.Dom.getid('id_queryFlightForm').submit();   
		}
		
	});

}	
	
	
	
	
	if(MG.Dom.getid('gnhotel') && MG.Dom.getid('gahotel')){
		MG.Dom.getid('gnhotel').setAttribute('checked','checked');
		//MG.Dom.getid('gahotel').setAttribute('checked','');
		MG.Dom.getid('gnhotel').onfocus = function(){
			MG.Dom.getid('gnhotel').setAttribute('checked','checked');
			MG.Dom.getid('gahotel').setAttribute('checked','');
			MG.Dom.getid('id_hotelStartCity').title = 'hotel';
			MG.Dom.getid('id_hotelStartCity').value = '中文/拼音';
			MG.Dom.getid('id_cityCode').value = '';
			
		};
		MG.Dom.getid('gahotel').onfocus = function(){
			MG.Dom.getid('gnhotel').setAttribute('checked','');
			MG.Dom.getid('gahotel').setAttribute('checked','checked');
			MG.Dom.getid('id_hotelStartCity').title = 'gat';
			MG.Dom.getid('id_hotelStartCity').value = '香港';
			MG.Dom.getid('id_cityCode').value = 'HKG';
			
		};
		

	}
	
if(MG.Dom.getid('id_hotelName')){

	MG.Event.addEvent(MG.Dom.getid('id_hotelName'), 'click', function(){
		var statickeyWord="请输入酒店关键字";
		if(this.value == statickeyWord){
			this.value ="";
		}
	});
}
 if(MG.Dom.getid('id_hotelSearch')){
 
    MG.Event.addEvent(MG.Dom.getid('id_queryHotelForm'), 'submit', function(e){
	    MG.Event.preventDefault(e);
	});

	MG.Event.addEvent(MG.Dom.getid('id_hotelSearch'), 'click', function(){
		var sc = MG.Dom.getid('id_hotelStartCity'),
			sd = MG.Dom.getid('id_hotelStartDate'),
			bd = MG.Dom.getid('id_hotelBackDate');
		var startCity = sc.value,
			startDate = sd.value,
			backDate = bd.value;
		//alert(lineType +'-'+startCity+'-'+endCity +'-'+startDate+'-'+backDate);
		if(getThreeWordByCity(startCity,"hotel") == ""){
		   alert("请填写正确的城市");
		   window.setTimeout(function(){sc.focus(); }, 10); //delay 10 for firefox
		   
		}else if(!formValid.isDate(startDate)){
		   alert("请填写正确的入住日期");
		   sd.value = "";
		   sd.focus();
		}else if(!formValid.isDate(backDate)){
		   alert("请填写正确的离店日期");
		   bd.value = "";
		   bd.focus();
		}else if(!formValid.compareDate(startDate, backDate, '-')){
		   alert("离店日期应晚于入住日期");
		   bd.value = "";
		   bd.focus();
		}else{
		   MG.Dom.getid('id_queryHotelForm').submit();   
		}
		
	});

 }	
 if(MG.Dom.getid('queryExc')){
 
    MG.Event.addEvent(MG.Dom.getid('travelQueryForm'), 'submit', function(e){
	    MG.Event.preventDefault(e);
	});

	MG.Event.addEvent(MG.Dom.getid('queryExc'), 'click', function(){
	    var statickeyWord="请输入产品名称/景点";
	    var staticDestination="中文/拼音首字母";
        var destinationID = MG.Dom.getid('destinationID');
		var destnext = MG.Dom.next(destinationID);
		var nameKey = MG.Dom.getid('mutiOnlineProduct.nameKey');
		if(destinationID.value === staticDestination){
		    destinationID.value =  '';
			destnext.value = '';
		}
		if(nameKey.value === statickeyWord){
		    nameKey.value = '';
		}
		MG.Dom.getid('travelQueryForm').submit();
		
		
	});

 }		

	
	
	/*
	if(MG.Dom.getid('account') && MG.Dom.getid('myaccount')){
	    var acc = MG.Dom.getid('account');
		var macc = MG.Dom.getid('myaccount');
		
	    MG.Event.addEvent(acc, 'mouseover',function(){
		    MG.Style.addClass(acc, 'addrop');
			var pos = MG.Dom.getoffset(acc);
			macc.style.left = pos.left + 'px';
			macc.style.display = 'block';
		});
		MG.Event.addEvent(acc, 'mouseout',function(){
		    MG.Style.removeClass(acc, 'addrop');
			macc.style.display = 'none';
		});
		
	}
	
	*/
	/*
	if(MG.Dom.getid('distr') && MG.Dom.getid('carSearchVO.cityCode')){
	    MG.Dom.getid('distr').onfocus = MG.Dom.getid('distr').onclick = function(){
		    var code = MG.Dom.getid('carSearchVO.cityCode').value;
			var xhrdate = MG.ajax('GET', 'http://cars.mangocity.com/car-index-buildDistrictSelectList.shtml?cityCode='+code, function(xhr){
				console.log(xhr);
				
			});
			xhrdate = null;		
		};
	}
	*/
	
})();