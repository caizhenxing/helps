var TIME_DAY=100;var DATA_SPLIT_SIGN_1="#";var DATA_SPLIT_SIGN_2=";";var DATA_SPLIT_SIGN_3="=";var DATA_SPLIT_SIGN_4=":";var HISTORY_LIST=5;var COOKIE_DOMAIN="http://10.10.16.86/";var arrays=new Array();function setCookieHistory(b,d,c){if(navigator.cookieEnabled){var a=new Date();a.setTime(a.getTime()+1000*60*60*24*TIME_DAY);document.cookie=b+"="+escape(d)+";expires="+a.toGMTString()+";path=/"}}function getCookieHistory(d){var b=document.cookie.split(DATA_SPLIT_SIGN_2);for(var c=0;c<b.length;c++){var a=b[c].split(DATA_SPLIT_SIGN_3);if(d==a[0].trim()){return unescape(a[1])}}return null}function arrayToString(g,c,a){if(g==null||g.length<1){return}var e=g.length;var f="";for(var d=0;d<e;d++){f+=c+d+a+g[d];var b=f.lastIndexOf(DATA_SPLIT_SIGN_2);if((b+1)!=f.length){f+=DATA_SPLIT_SIGN_2}}return f}function delCookieHistory(b,d){var c=b+"=nodata;path=/";var a=new Date();a.setTime(a.getTime()-10000);if(d!=null&&d!=""){c+=";domain="+d+";"}document.cookie=c}function getCondition(){arrays=new Array();var e=getCookieHistory("twebhistoryCondition");if(e!=null&&e!=""&&e!=undefined){var h=e.split(DATA_SPLIT_SIGN_1);var d=h.length;for(var c=0;c<d;c++){if(h[c]==undefined||h[c]==null||h[c]==""){continue}var g=h[c].split(DATA_SPLIT_SIGN_4);var k=g[1].split(DATA_SPLIT_SIGN_2);var a=k.length;var f=new Array();var l;for(var b=0;b<a;b++){if(k[b]==undefined||k[b]==null||k[b]==""){continue}l=k[b].split(DATA_SPLIT_SIGN_3);f.push(l[1])}arrays.push(f)}}}function saveCondition(c){var a=arrays.length;if(a>=HISTORY_LIST){arrays.shift()}arrays.push(c);var f=new Array();var g="";a=arrays.length;for(var b=0;b<a;b++){g="";var e=arrays[b];g+=arrayToString(e,"plan",DATA_SPLIT_SIGN_3);if((b+1)!=a){g+=DATA_SPLIT_SIGN_1}f.push(g)}var d=arrayToString(f,"condition",DATA_SPLIT_SIGN_4);setCookieHistory("twebhistoryCondition",d,COOKIE_DOMAIN)}String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};function format_Date_cookie(d){var a=d.split("-");var f="";for(var e=0;e<a.length;e++){f+="/"+a[e]}f=f.substring(1);return new Date(f)};