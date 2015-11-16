//dynamictab
$.fn.dynamictab = function(settings){
	 settings = jQuery.extend({
		 navid : '#nav',
		navtag : 'li',
	  navclass : 'on',
			ev : 'click',
		 index : 0,
	  callback : null
	 }, settings || {});
	 
	 return this.each(function(){
		 var container = this;
		 var navList = $(settings.navid).find(settings.navtag),
			 cur = settings.index,
			 cls = settings.navclass,
			 ev = settings.ev,
			 callback = settings.callback;
		 $(navList[cur]).addClass(cls);
		 
		 navList.each(function(i){
		     $(this).bind(settings.ev, function(event){
				 $(navList).removeClass(cls);
				 $(this).addClass(cls);
				 event.preventDefault();
				 if(settings.callback){
				     callback(this);
				 }
			 });
		 
		 });
		 
	 });
};

//tab
$.fn.mangoTabs = function(settings){
	 settings = jQuery.extend({
		 navid : 'nav',
		navtag : 'li',
	  navclass : 'on',
	   panelid : 'panel',
	  paneltag : 'div',
	panelclass : 'panel',
			ev : 'click',
		 index : 0,
	  callback : null
	 }, settings || {});
	 
	 return this.each(function(){
		 var container = this;
		 
		 var navList = $('#'+settings.navid).find(settings.navtag),
		     panelList = $('.'+settings.panelclass, '#'+settings.panelid),
			 cur = settings.index,
			 cls = settings.navclass,
			 ev = settings.ev,
			 callback = settings.callback;
		 $(navList).removeClass(cls); 
		 $(navList[cur]).addClass(cls);
		 $(panelList).hide();
		 $(panelList[cur]).show();
		 navList.each(function(i){
		     $(this).bind(settings.ev, function(event){
				 $(navList).removeClass(cls);
				 $(panelList).hide();
				 $(this).addClass(cls);
				 $(panelList[i]).show();
				 event.preventDefault();
				 if(settings.callback){
				     callback(this, $(panelList).get(i));
				 }
			 });
		 
		 });
		 
	 });
};

$.fn.croll = function(settings){
	 settings = jQuery.extend({
			wraper : '#chatwrap',
		      prev : '#chatprev',
		      next : '#chatnext'
	 }, settings || {});
     return this.each(function(){
	    var iss = false, timer, count=0; 
		var len = $(settings.wraper).find('li').length;
		var truewidth = $(settings.wraper).find('li').eq(0).width() * $('li', settings.wraper).length;
		var w = $(settings.wraper).width();
		
		$(settings.prev).click(function(){
			 if(count < len-1){
			    count+=1;
				 if(timer) clearInterval(timer);
				 timer = setInterval(function(){movemc(count, w)}, 5);
			 }
			 if(timer) clearInterval(timer);
			 timer = setInterval(function(){movemc(count, w)}, 5);
		});
		
		$(settings.next).click(function(){
			 if(count > 0){
			    count-=1;
			 }
			 if(timer) clearInterval(timer);
			 timer = setInterval(function(){movemc(count, w)}, 5);
		});		
		
		function movemc(count, distance){
			 var item = $(settings.wraper);
			 var ns = (count*distance - item.scrollLeft());
			 if(ns == 0) return;
			 var v = ns > 0 ? Math.ceil(ns/10) : Math.floor(ns/10);
			 item.scrollLeft(item.scrollLeft() + v);
			
		}	

	
	 });

};


// lazy load images
jQuery.fn.loadthumb = function(options) {
	options = $.extend({
		 src : ""
	},options);
	var _self = this;
	_self.hide();
	var img = new Image();
	$(img).load(function(){
		_self.attr("src", options.src);
		_self.fadeIn("slow");
	}).attr("src", options.src);
	return _self;
}

$(document).ready(function(){
	function readyImg()
	{
		var len  = $("#picnum").find('span').length;
		//alert(len);
		var index = 0;
		var adTimer;
		$("#picnum span").mouseover(function(){
		index  =   $("#picnum span").index(this);
		showImg(index);
		}).eq(0).mouseover();	
		$('#bigpic').hover(function(){
			 clearInterval(adTimer);
		 },function(){
			 adTimer = setInterval(function(){
				index++;
				if(index==len){index=0;}
				showImg(index);				
			  } , 5000);
		}).trigger("mouseleave");
	}
	var catchImgs=new Array();
	function showImg(index)
	{
		var flagImg=false;
		for(var k=0;k<catchImgs.length;k++)
		{
		   if(catchImgs[k]==index)
		   {
			  flagImg= true;
			  break;
		   }
		}
		if(!flagImg)
		{
			$("#bigpic").addClass("adloading");
			$(".class_img").hide();
			$("#id_img_"+index).loadthumb({src:  src[index] });
			catchImgs.push(index)
		}
		else
		{
			$("#bigpic").removeClass("adloading");
			$(".class_img").hide();
			$("#id_img_"+index).fadeIn("slow");
		}
		
		$("#picnum span").removeClass("on").eq(index).addClass("on");
		$("#id_showImage").attr("href",_href[index]).attr("name","flashAd"+index);
	}	
	
	readyImg();
	
	// get flight data $.fn.dynamictab
	
	function getDataForProduct(list,city,defaultCity,num)
	{
	   var tempList1 = new Array();
	   var tempList2 = new Array();
	   var length = list.length;
	   var count=1;
	   var count2=1;
	   if(num==undefined||num==null||num=="")num=10;
	   for(var i=0;i<length;i++)
	   {
		   if(list[i][0]==city)
		   {
			  tempList1.push(list[i]);
			  count++;
		   }
		   if(list[i][0]==defaultCity)
		   { 
			  if(count2<=num)
			  {
				 tempList2.push(list[i]);
				 count2++;
			  }
		   }
		   if(count>num)break;
	   }//end for
	   
	   if(tempList1.length<=1)return tempList2;
	   else return tempList1;
	}
	
	
	function getarrfirst(list, city, num){
	    var len = list.length,
		    city = city,
			num = num || 10,
			count = 1,
			arr = [];
		for(var i=0; i<len; i++){
		    if(count <= num && list[i][0] === city){
			    arr.push(list[i]);
				count++
			}
			
		}
		return arr;
	}
	
	//根据城市查找国际机票城市三字码
	function getThreeWordByinitCity(cityName,flag)
	{
        citys = intercitys;
		var threeWord = "";
		for(var i = 0,len = citys.length;i<len;i++)
		{
			if(cityName == citys[i][1])
			{
				threeWord = citys[i][0];
				break;
			}
		}
		return threeWord;
	}
	
	function chooseIntelProductCity(city)
	{
	   var planeIntelList = getDataForProduct(intTicketArray,city,'SHA',3);
	   $("#gwflight").html(getHtmlByArrayForIntel(planeIntelList));
	}	
	
	function getHtmlByArrayForIntel(list)
	{
	   var length = list.length;
	   var temp = "<ul>";
	   
	   var exdate=new Date();
       exdate.setFullYear(exdate.getFullYear(), exdate.getMonth(), exdate.getDate()+15); 
	   var datestr = exdate.getFullYear()+'-'+((exdate.getMonth()+1)<10 ? "0"+(exdate.getMonth()+1) :exdate.getMonth())+'-'+(exdate.getDate()<10 ? "0"+exdate.getDate():exdate.getDate());
	   for(var i=0;i<length;i++)
	   {
	      var inicode = getThreeWordByinitCity(list[i][2]);
		  temp += '<li><span class="airline">'+list[i][1]+'→'+list[i][2]+'</span>'
				  +'<span class="airlinetype">单程</span>'
				  +'<a href="javascript:submitinplaneform(\''+list[i][1]+'\',\''+list[i][0]+'\',\''+list[i][2]+'\',\''+inicode+'\',\''+datestr+'\');" class="price"><em class="yen">&yen;'+list[i][3]+'</em></a></li>';
	   }//end for
	   temp += '</ul>';
	   return temp
	}	
	
	
	function getLowerPriceForFlight(arrSrc, num)
	{   //var arr = arr;
	    var arr=[];
	    for(var k=0,len=arrSrc.length; k<len; k++){
		    arr.push(arrSrc[k]);  
		}
	
		arr.shift();
		arr.shift();
		arr.shift();
		arr.pop();
		var temp, j,temp1;  
		for(var i=1; i<arr.length; i++)
		{  
		   var tempList = arr[i].split(",");
		   var tempList_ = arr[i-1].split(",");
		   if(parseInt(tempList[0]) < parseInt(tempList_[0]))
		   {  
				temp = arr[i];  
				temp1 = arr[i].split(",");
				j = i-1;  
				
				do{  
				   arr[j+1] = arr[j];  
				   j--;  
				}  
				while (j>-1 && parseInt(temp1[0]) < parseInt(arr[j].split(",")[0]));  
				arr[j+1] = temp;  
		   }//endif  
		 } //end for 
        //arr = arr.slice(0, num);
	   return arr;  
	}  



	function gethtmlfromlist(list){
	    var len = list.length;
		var str = '<ul>';
		for(var i=0; i<len; i++){
		    var scode = list[i][0], ecode = list[i][1], cityname = list[i][2];
		    var lowlist = getLowerPriceForFlight(list[i],4);
			//console.log(list[i]);
		    str+='<li><span class="airline">'+cityname.replace(",","&rarr;")+'</span><a href="http://flight.mangocity.com/jipiao-'+scode+'-'+ecode+'-'+lowlist[0].split(",")[1].replace(/-/g,'')+'.html" class="price"><em class="yen">&yen;'+lowlist[0].split(",")[0]+'</em>'+lowlist[0].split(",")[1].substring(5,10)+'</a><a href="http://flight.mangocity.com/jipiao-'+list[i][0]+'-'+list[i][1]+'-'+lowlist[1].split(",")[1].replace(/-/g,'')+'.html" class="price"><em class="yen">&yen;'+lowlist[1].split(",")[0]+'</em>'+lowlist[1].split(",")[1].substring(5,10)+'</a><a href="http://flight.mangocity.com/jipiao-'+list[i][0]+'-'+list[i][1]+'-'+lowlist[2].split(",")[1].replace(/-/g,'')+'.html" class="price"><em class="yen">&yen;'+lowlist[2].split(",")[0]+'</em>'+lowlist[2].split(",")[1].substring(5,10)+'</a><a href="http://flight.mangocity.com/jipiao-'+list[i][0]+'-'+list[i][1]+'-'+lowlist[3].split(",")[1].replace(/-/g,'')+'.html" class="price"><em class="yen">&yen;'+lowlist[3].split(",")[0]+'</em>'+lowlist[3].split(",")[1].substring(5,10)+'</a></li>';
		}
		str+='</ul>';
		return str;
	}
	
	function getplanecity(city){
	    var code = city || 'PEK';
		var list = airplaneCommendArray;
		var arr = getarrfirst(list, code, 4);
		
		//console.log(arr);
		
		var htmlstr = gethtmlfromlist(arr);
		$('#gnflight').html(htmlstr);
		
		chooseIntelProductCity(city);
		
	}
	
	function flightcallback(el){
	    var code = el.href.split('#')[1];
		getplanecity(code);
	}
	
	function chooseHotelProductCity(city)
	{  //console.log(city);
	   var hotelProductList = getDataForProduct(htlCommendArray,city,'PEK',3);
	   //console.log(hotelProductList);
	   $("#hotellist").html(getHtmlByArrayForHotel2(hotelProductList,city));
	   
	}	
	function getHtmlByArrayForHotel2(list,city)
	{
	   var length = list.length;
	   var temp = "";
	   var cashSign="&yen;";
	   if(city=="HKG"||city=="MAC")cashSign="HK$";
	   var str = '<ul>';
	   for(var i=0;i<length;i++)
	   {
	      str += '<li><span class="txtcut txtit"><a href="http://hotel.mangocity.com/jiudian-'+list[i][1]+'.html title='+list[i][2]+'">'+list[i][2]+'</a></span><em class="price yen">'+cashSign+list[i][5]+'起</em></li>';
	      //str += '<li><span class="txtcut txtit"><a href="http://hotel.mangocity.com/jiudian-'+list[i][1]+'.html title='+list[i][2]+'">'+list[i][2]+'</a></span><em class="price yen">'+cashSign+list[i][5]+'起</em><em class="repay yen">(返现'+cashSign+list[i][6]+')</em></li>';
		  
	   }
	   return str
	}
	function hotelcallback(el){
	    var code = el.href.split('#')[1];
		//console.log(code);
		chooseHotelProductCity(code);
	}

	
	chooseHotelProductCity('PEK');
	getplanecity('PEK');
	
	$('#flightnav').dynamictab({navid:'#flightul', navtag:'a', ev:'mouseover', callback:flightcallback});
	
	$('#hotelnav').dynamictab({navid:'#hotelul', navtag:'a', ev:'mouseover', callback:hotelcallback});

	$('#selectSearch').mangoTabs({navid:'selectSearch', navtag:'dt', panelid:'selectSearch', paneltag:'dd', panelclass:'searchdd', index:1, callback:function(){
	     $('#gnhotel').attr('checked', 'checked');
	}});
	

	$('#travelrecommend').bind('click', function(){
		$(this).addClass('isclick');
	    $('#traveline').css({'left':$(this).offset().left, 'top':$(this).offset().top+28}).show();

	});
	

	$('#traveline a').each(function(){
	    $(this).click(function(){
		    var code = this.href.split('#')[1];
		    $('#travelcity').text($(this).text());
			$('.travellines').hide();
			$('#line_'+code).show();
			$('#travelrecommend').removeClass('isclick');
			$('#traveline').hide();
		});
	});
	

	
	
	$('#zucherecommend').bind('click', function(){
		$(this).addClass('isclick');
	    $('#zuchelist').css({'left':$(this).offset().left, 'top':$(this).offset().top+23}).show();

	});
	

	$('#zuchelist a').each(function(){
	    $(this).click(function(){
		    var code = this.href.split('#')[1];
		    $('#zuchecity').text($(this).text());
			$('.zuchelist').hide();
			$('#zuche_'+code).show();
			$('#zucherecommend').removeClass('isclick');
			$('#zuchelist').hide();
		});
	});
	
	$(document).click(function(event){
		if($(event.target).attr("id") != 'travelrecommend'&&$(event.target).parent().attr("id") != 'traveline'){
		   $('#travelrecommend').removeClass('isclick');
		   $('#traveline').hide();
		}
		
		if($(event.target).attr("id") != 'zucherecommend'&&$(event.target).parent().attr("id") != 'zuchelist'){
		   $('#zucherecommend').removeClass('isclick');
		   $('#zuchelist').hide();
		}
	});

	
	
	$('.chat').croll();
	
	/*
	$('#account').mouseover(function(){
	    $(this).addClass('addrop');
		$('#myaccount').css({'left':$(this).offset().left}).show();
	});
	
	$('#account').mouseout(function(){
	    $(this).removeClass('addrop');
		$('#myaccount').hide();
	});
	*/
	
	/*
	$('#distr').click(function(){
	    var code = $('#carSearchVOcityCode').val();
		//console.log(code);
		$.getJSON("http://cars.mangocity.com/car-index-buildDistrictSelectList.shtml?cityCode="+code+"&format=json&jsoncallback=?", function(data){
		  //alert(data);
		  $.each(data.items, function(i,item){
		     //alert(i+'----'+item);
		     //console.log(i+'----'+item);
			//$("<img/>").attr("src", item.media.m).appendTo("#images");
			//if ( i == 3 ) return false;
		  });
		});	
	});
	*/
	
	
	
});



