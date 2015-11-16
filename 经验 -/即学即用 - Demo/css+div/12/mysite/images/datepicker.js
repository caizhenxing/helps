//oop datepicker
/*
* 面板两个状态：1、打开 true 2、关闭 false
* 样式三个状态：1、载入状态（最原始状态）2、获取焦点状态 3、失去焦点状态（a.合理日期, b.非法日期）
*
* 面板点击事件：1、点击面板之外 2、点击面板范围之内
*
* 属性的获取:1、创建实例时赋予基本属性 2、在表单元素获取焦点时开始查找各种属性
*
*/

//var holiday={"2010-01-01":{holidayName:"元旦节",beforeTime:3,afterTime:3,dayindex:0},"2011-02-14":{holidayName:"情人节",beforeTime:7,afterTime:0,dayindex:0},"2010-04-05":{holidayName:"清明节",beforeTime:3,afterTime:3,dayindex:0},"2010-05-01":{holidayName:"劳动节",beforeTime:3,afterTime:3,dayindex:0},"2010-06-16":{holidayName:"端午节",beforeTime:3,afterTime:3,dayindex:0},"2010-09-22":{holidayName:"中秋节",beforeTime:3,afterTime:3,dayindex:0},"2010-10-01":{holidayName:"国庆节",beforeTime:3,afterTime:0,dayindex:0},"2011-01-01":{holidayName:"元旦节",beforeTime:3,afterTime:3,dayindex:0},"2011-02-03":{holidayName:"春节",beforeTime:7,afterTime:3,dayindex:0},"2011-04-05":{holidayName:"清明节",beforeTime:3,afterTime:3,dayindex:0},"2011-05-01":{holidayName:"劳动节",beforeTime:3,afterTime:3,dayindex:0},"2011-06-06":{holidayName:"端午节",beforeTime:3,afterTime:3,dayindex:0},"2011-09-12":{holidayName:"中秋节",beforeTime:3,afterTime:3,dayindex:0},"2011-10-01":{holidayName:"国庆节",beforeTime:3,afterTime:0,dayindex:0}};


var Datepicker = function(target,config){
    this.target = target || null; //日历目标节点
    this.eachW = config.eachW || 177; //单列宽度
	this.eachH = config.eachH || 178; //单列高度
	
	this.year = config.year || new Date().getFullYear(); //当前年
	this.month = config.month || (new Date().getMonth() + 1); //当前月
	this.day = config.day || new Date().getDate(); //当前日

	this.startDate = config.startDate || [];
	this.endDate = config.endDate || [];
	
	this.ttMonth = config.ttMonth || 2; //共显示几个月的数据，默认两个月，即双日历
	
	this.addDays = config.addDays || 0; //自动增加天数
	this.cday = 0; //选中日期
	this.isopen = false; //默认关闭
	this.inputs = []; //日历输入框(数量)
	this.callback = config.callback || null;
	this._init(); //初始化
	
};
Datepicker.prototype = {
    _init : function(){
		this._startEvent();		
	},
	_createPanel : function(){
	    var dp_wrap = MG.Dom.getid('dp_id');
		if(dp_wrap){
		    return;
		}else{
		    var div = document.createElement('div');
			div.className = "datepicker";
			div.id = "dp_id";
			div.innerHTML = '<div class="pickerwrap"><em class="prevMonth">&lt;&lt;</em><em class="nextMonth">&gt;&gt;</em><div class="pickwidth" id="pickwidth"> </div> </div><iframe frameborder="0" marginheight="0" marginwidth="0" id="dateframe" style="position:absolute; left:-8px; top:-8px; overflow:hidden; background:#fff; border:0; z-index:-1; opacity:0; filter:alpha(opacity = 0);"></iframe></div>';
			document.body.appendChild(div);
		}
	},
	_getCalendar : function(date){
	    this.year = date.getFullYear(), this.month = date.getMonth(), this.day = date.getDate(); //获取当前日期
		var ttm = this.ttMonth, dpanel = [];
		var ndate = new Date(this.year,this.month,this.day); //日期函数在调用前必须先初始化
		//var ndate = new Date(date.getFullYear(),(date.getMonth()-1),date.getDate()); //日期函数在调用前必须先初始化
		//var ndate = date;
		for(var i=0; i<ttm; i++){
			dpanel[i] = this._getDayList(ndate);
			//console.log(i);
			var addd = new Date(ndate.getFullYear(),ndate.getMonth()+i+1,0).getDate();
			//console.log(ndate.getMonth());
			ndate.setFullYear(ndate.getFullYear(), ndate.getMonth(), 1+addd);
			//ndate.setMonth(ndate.getMonth()+1);
			//console.log(ndate.getMonth());
			//ndate.setMonth(ndate.getMonth()+1);
		}
		
		MG.Dom.getid('pickwidth').innerHTML = dpanel.join('');
		MG.Dom.getid('dp_id').style.width = ttm*this.eachW + "px";
		MG.Dom.getid('dateframe').style.width  = (ttm*this.eachW + 8) + "px";
		MG.Dom.getid('dateframe').style.height  = 188 + "px";
	},
	_getDayList : function(date){
	    var dplist = ['日','一','二','三','四','五','六'],
		    today = this.startDate[2] || new Date().getDate(),
			tmonth = this.startDate[1] || new Date().getMonth(),
			tyear = this.startDate[0] || new Date().getFullYear(),
			cmonth = date.getMonth(), //取得的月数字比实际小1
			cyear = date.getFullYear(),
			cday = this.cday,
			addDay = this._operaAddDay(this.addDays);
			
		var arr = [], firstday, lastday, list = [], plist;
		firstday = new Date(cyear, cmonth, 1).getDay(); //当月第一天在第一周中的位置
		lastday = new Date(cyear, cmonth+1, 0).getDate(); //返回当月天数
		for(var i=1; i<=firstday; i++){arr.push(0);}
		for(var i=1; i<=lastday; i++){arr.push(i);}
		
		if(this.endDate.length){
		    //tyear = this.startDate[0]; tmonth = this.startDate[1];
			
			var eyear = this.endDate[0], emonth = this.endDate[1], eday = this.endDate[2];
			
			//console.log(emonth);
			
			for(var j=0, k=arr.length; j<k; j++){
				if((tyear > cyear && arr[j]) || ((tyear == cyear) && (tmonth > cmonth) && arr[j]) || ((tyear == cyear) && (tmonth == cmonth) && arr[j] && (arr[j] < today)) || (eyear < cyear && arr[j]) || ((eyear == cyear) && (emonth < cmonth+1) && arr[j]) || ((eyear == cyear) && (emonth == cmonth+1) && arr[j] && (eday < arr[j]))){
					list.push('<li>'+ arr[j] +'</li>');
				}else if((tyear == cyear) && (tmonth == cmonth) && arr[j] && arr[j]==today){
					list.push('<li><a href="javascript:void(0);" class="now" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else if((cyear == cyear) && (cmonth == cmonth) && arr[j] && arr[j]==cday){
					list.push('<li><a href="javascript:void(0);" class="choice" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else if(arr[j]){
					list.push('<li><a href="javascript:void(0);" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else{
					list.push('<li>&nbsp;</li>');
				}
			}			
		
		}else if(addDay.length){
		    
		    var eyear = addDay[0], emonth = addDay[1], eday = addDay[2];
			
			//console.log(emonth); //undefined
			
			for(var j=0, k=arr.length; j<k; j++){
				if((tyear > cyear && arr[j]) || ((tyear == cyear) && (tmonth > cmonth) && arr[j]) || ((tyear == cyear) && (tmonth == cmonth) && arr[j] && (arr[j] < today)) || (eyear < cyear && arr[j]) || ((eyear == cyear) && (emonth < cmonth+1) && arr[j]) || ((eyear == cyear) && (emonth == cmonth+1) && arr[j] && (eday < arr[j]))){
					list.push('<li>'+ arr[j] +'</li>');
				}else if((tyear == cyear) && (tmonth == cmonth) && arr[j] && arr[j]==today){
					list.push('<li><a href="javascript:void(0);" class="now" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else if((cyear == cyear) && (cmonth == cmonth) && arr[j] && arr[j]==cday){
					list.push('<li><a href="javascript:void(0);" class="choice" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else if(arr[j]){
					list.push('<li><a href="javascript:void(0);" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else{
					list.push('<li>&nbsp;</li>');
				}
			}
			
		}else{
			for(var j=0, k=arr.length; j<k; j++){
				if((tyear > cyear && arr[j]) || ((tyear == cyear) && (tmonth > cmonth) && arr[j]) || ((tyear == cyear) && (tmonth == cmonth) && arr[j] && (arr[j] < today))){
					list.push('<li>'+ arr[j] +'</li>');
				}else if((tyear == cyear) && (tmonth == cmonth) && arr[j] && arr[j]==today){
					list.push('<li><a href="javascript:void(0);" class="now" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else if((cyear == cyear) && (cmonth == cmonth) && arr[j] && arr[j]==cday){
					list.push('<li><a href="javascript:void(0);" class="choice" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else if(arr[j]){
					list.push('<li><a href="javascript:void(0);" title="'+cyear+'-'+((cmonth+1)<10 ? ("0"+(cmonth+1)) : (cmonth+1))+'-'+(arr[j]<10 ? ("0"+arr[j]) : arr[j])+'">'+ arr[j] +'</a></li>');
				}else{
					list.push('<li>&nbsp;</li>');
				}
			}
		
		
		}
		

		plist = '<div class="pickerbody"><div class="pickhead"><strong>'+ cyear +'年'+ (cmonth+1) +'月</strong></div><div class="pickweek"><span>'+ dplist[0] +'</span><span>'+ dplist[1] +'</span><span>'+ dplist[2] +'</span><span>'+ dplist[3] +'</span><span>'+ dplist[4] +'</span><span>'+ dplist[5] +'</span><span>'+ dplist[6] +'</span></div><div class="dateswrap"><ul>'+ list.slice(0).join('') +'</ul></div></div>';
		return plist;		
		
		
	},
	_operaAddDay : function(num){
	    var now = new Date(), obj = [];
		now.setDate(now.getDate()+num);
		obj.push(now.getFullYear());
		obj.push((now.getMonth()+1)<10 ? "0"+(now.getMonth()+1): (now.getMonth()+1));
		obj.push(now.getDate()<10 ? "0"+now.getDate() :now.getDate());
		return obj;
	},
	_onclick : function(e, target, cur){
	    var eTarget = MG.Event.getTarget(e),
		    sTag = eTarget.nodeName,
		    panel = MG.Dom.getid('dp_id'),
		    thisday,
			date = new Date(this.year, this.month, this.day);
		if(!this.isopen){ return false; }
		var cb = this.callback;
		//console.log(sTag);
		if(contains(panel, eTarget)){
		
			switch(sTag){
				case 'EM' :
					if(/prevMonth/.test(eTarget.className)) {this._preMonth(date);} //date come from input
				    if(/nextMonth/.test(eTarget.className)) {this._nextMonth(date);}
					break;
				case 'A' :
					if(cb){
					    cb(cur, eTarget);
						this._resetPosition(target, panel);
					}					
				    break;
				default :
					break;

			}
		
		
		}else{
            this._resetPosition(target, panel);		 
		}
	},
	_preMonth : function(date){
		date.setMonth(date.getMonth()-1);
	    this._getCalendar(date);
	},
	_nextMonth : function(date){
		date.setMonth(date.getMonth()+1);
	    this._getCalendar(date);
	},
	_setposition : function(input, el){
		var pos = MG.Dom.getoffset(input);
		el.style.display = 'block';
		el.style.left = (pos.left-2) + "px";
		el.style.top = pos.top + input.offsetHeight + "px";
	    this.isopen = true;
	},
	_resetPosition : function(input, el){
	    el.style.display = 'none';
		this.isopen = false;
	},
	_startEvent : function(){
	    var that = this;
		that.target.onfocus = that.target.onclick = function(e){
			that._createPanel();
			that._getCalendar((that.startDate.length && that.endDate.length)? new Date(that.startDate[0], that.startDate[1], that.startDate[2]) : new Date());
			that._setposition(this, MG.Dom.getid('dp_id'));
			
			document.onmousedown = function(e){
				that._onclick(e, this, that.target);
			};
			
		};

		
	}
};
