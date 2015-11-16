var from = document.getElementsByTagName("script")[document.getElementsByTagName("script").length-1].src.split("?")[1];

var arrCount = 17; //数组长度
var img= new Array();
var imgGIF = new Array();
var link = new Array();
var imgTitle = new Array();

//图片地址数组
for( var i = 0 ; i< arrCount; i ++ )
{
    img[i] = "http://wimg.mangocity.com/img/home/banner/top" + i  +".jpg";    
}

//GIF图片地址数组
for( var j = 0 ; j< arrCount; j ++ )
{
    imgGIF[j] = "http://wimg.mangocity.com/img/home/banner/top" + j  +".gif";    
}

//链接地址数组
link[0] = "http://www.mangocity.com/promotion/m110413integrity1.html?ozs=111990";
link[1] = "http://www.mangocity.com/promotion/h110328yiliao.html?ozs=111959";
link[2] = "http://www.mangocity.com/promotion/h110328yiliao.html?ozs=111959";
link[3] = "http://www.worlinkad.com/iclk/?zoneid=54&uid=1044";
link[4] = "http://www.mangocity.com/promotion/f110321oumei.html?ozs=111953";
link[5] = "http://www.mangocity.com/promotion/e110224funv.html?ozs=111916";
link[6] = "http://www.fashionsfriend.com/prolist.php?source=mgcruises-list&640ad4289aca986fa392cdadb3c227cf";
link[7] = "http://www.worlinkad.com/iclk/?zoneid=52&uid=1044";;
link[8] = "http://quan.mangocity.com/";
link[9] = "http://quan.mangocity.com/";
link[10] = "http://quan.mangocity.com/";
link[11] = "http://quan.mangocity.com/";
link[12] = "http://quan.mangocity.com/";
link[13] = "http://quan.mangocity.com/";
link[14] = "http://quan.mangocity.com/";
link[15] = "http://tuan.mangocity.com/";
link[16] = "http://quan.mangocity.com/"

document.write("<a name=\"topAd" + from + "\" href=\"" + link[from] + "\" class=\"topAd\" target=\"_blank\"><img alt=\"" + imgTitle[from] + "\" src=\"" + img[from] + "\" width=\"468\" height=\"60\" border=\"0\" onerror=\"this.src='" + imgGIF[from] + "' \" /></a>");