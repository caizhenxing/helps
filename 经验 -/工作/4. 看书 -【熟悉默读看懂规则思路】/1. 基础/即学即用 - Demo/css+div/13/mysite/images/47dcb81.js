var byttf="banyetan";
var bytpu="";
var bytpf="banyetan";
var bytsu=window.location;
var bytsf=document.referrer;
var bytof="";
var bytop="";
var bytops=1;
var bytot=1;
var bytd=new Date();
var bytcolor="";
if (navigator.appName=="Netscape"){bytcolor=screen.pixelDepth;} else {bytcolor=screen.colorDepth;}
try{byttf=top.document.referrer;}catch(e){}
try{bytpu =window.parent.location;}catch(e){}
try{bytpf=window.parent.document.referrer;}catch(e){}
try{bytops=document.cookie.match(new RegExp("(^| )AJSTAT_ok_pages=([^;]*)(;|$)"));

bytops=(bytops==null)?1: (parseInt(unescape((bytops)[2]))+1);
var bytoe =new Date();
bytoe.setTime(bytoe.getTime()+60*60*1000);

document.cookie="AJSTAT_ok_pages="+bytops+ ";path=/;expires="+bytoe.toGMTString();
bytot=document.cookie.match(new RegExp("(^| )AJSTAT_ok_times=([^;]*)(;|$)"));

if(bytot==null){bytot=1;}
else
{bytot=parseInt(unescape((bytot)[2]));

 bytot=(bytops==1)?(bytot+1):(bytot);
 }
 bytoe.setTime(bytoe.getTime()+365*24*60*60*1000);
 document.cookie="AJSTAT_ok_times="+bytot+";path=/;expires="+bytoe.toGMTString();}catch(e){}
 
bytof=bytsf;
if(bytpf!=="banyetan")
{bytof=bytpf;}
if(byttf!=="banyetan")
{bytof=byttf;}
bytop=bytpu;
try{lainframe}catch(e){bytop=bytsu;}
document.write('<img style="width:0px;height:0px" src="http://tongji.banyuetan.org/Satatsitics.aspx?svid=1&BYTXHSZHBEJID=81&TopCode=80&tpages='+bytops+'&ttimes='+bytot+'&tzone='+(0-bytd.getTimezoneOffset()/60)+'&tcolor='+bytcolor+'&sSize='+screen.width+','+screen.height+'&referrer='+escape(bytof)+'&vpage='+escape(bytop)+'" />');