function movearound(){
	if(!ismove){return false;}
    var L = T = 0;
	var R = body.clientWidth - fdivobj.offsetWidth,
	    B = body.clientHeight - fdivobj.offsetHeight;
	fdivobj.style.left = initX + body.scrollLeft + 'px';
	fdivobj.style.top = initY + body.scrollTop + 'px';
	initX = initX + step*(xr ? 1 : -1);
	//console.log(initX);
	if(initX < L){xr = true; initX = L}
	if(initX > R){xr = false; initX = R}
	initY = initY + step*(yr ? 1 : -1);
	if(initY < T){yr = true; initY = T}
	if(initY > B){yr = false; initY = B}
	
}

var randomnum = Math.floor(Math.random()*1000);   //1至100的随机数
  var dangqianUrl= location.href;  //当前路径
  //alert(dangqianUrl);
  var gotoUrl,gotoid=0,booleanTag;
  if((dangqianUrl == "http://www.mangocity.com/GDSWeb/intquery/searchCondition_initCondition.action")&&(randomnum<300))
  {
     gotoUrl = "http://club.mangocity.com/act/5Years/lucky.aspx?c=6";
	 gotoid = 6;
  }
    else if((dangqianUrl  == "http://vacation.mangocity.com/travelIndex.shtml")&&(randomnum<200))
  {
      gotoUrl = "http://club.mangocity.com/act/5Years/lucky.aspx?c=2";
	  gotoid = 2;
  }

    else if(dangqianUrl  == "http://www.mangocity.com/")
  {
      gotoUrl = "http://club.mangocity.com/act/5Years/lucky.aspx?c=1";
	  gotoid = 1;
  }

    else if((dangqianUrl  == "http://visa.mangocity.com/")&&(randomnum<100))
  {
      gotoUrl = "http://club.mangocity.com/act/5Years/lucky.aspx?c=10";
	  gotoid = 10;
  }

  else if(((dangqianUrl  == "http://www.mangocity.com/biz/index.htm")||(dangqianUrl  == "http://tmc.mangocity.com/"))&&(randomnum<200))
  {
      gotoUrl = "http://club.mangocity.com/act/5Years/lucky.aspx?c=10";
	  gotoid = 10;
  }
   else if((dangqianUrl  == "http://travel.mangocity.com/")&&(randomnum<500))
  {
      gotoUrl = "http://club.mangocity.com/act/5Years/lucky.aspx?c=11";
	  gotoid = 11;
  }
  document.write('<input type="hidden" value="'+dangqianUrl+'" />');
  if(!!gotoUrl&&gotoid){
  document.write('<style type="text/css"> .qmangoimg{ border:none;}</style>');
  document.write('<a href="../芒果网 酒店预订,酒店预定,酒店查询,机票预订,旅游度假,邮轮,门票,租车 飞一般的旅行网_files/'+gotoUrl+'" target="_blank" id="fdiv" style=" display:block; position:absolute; left:100px; top:200px; width:65px; height:50px;"><img src="http://images.mangocity.com/club/act/5years/clogo/'+gotoid+'.gif" alt="" class="qmangoimg" /></a>');
  
  var initX = 50,
    initY = 50,
	xr = true,
	yr = true,
	ismove = true,
	step = 1,
	delay = 10,
	doc = document,
	body = doc.body,
	docElem = doc.documentElement,
	fdivobj = document.getElementById('fdiv');
 

var timer = setInterval(function(){movearound();}, delay);

fdivobj.onmouseover = function(){

    ismove = false;
};

fdivobj.onmouseout = function(){
    ismove = true;
};
fdivobj.onclick = function(){
    clearInterval(timer);
	timer = null;
	fdivobj.style.display='none';
};	
  }