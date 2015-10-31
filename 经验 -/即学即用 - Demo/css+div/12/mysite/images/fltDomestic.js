
function getCarQu(str)
{
    var carPinYinQu = new Array();
	switch (str) {
	   case 'CGQ':{
		   carPinYinQu.push(["南关区","CGQNGQD"]);   return carPinYinQu;}
	   case 'CKG':{
		   carPinYinQu.push(["高新技术开发区","CKGGXJSKFB"]);
		   carPinYinQu.push(["渝北区","CKGYBQD"]);
		   carPinYinQu.push(["江北区","CKGJBQD"]);
		   carPinYinQu.push(["九龙坡区","CKGJLPD"]);   return carPinYinQu;}
	   case 'CSX':{
		   carPinYinQu.push(["岳麓区","CSXYULD"]);
		   carPinYinQu.push(["天心区","CSXTIXD"]);
		   carPinYinQu.push(["黄花机场","CSXJCQD"]);
		   carPinYinQu.push(["开福区","CSXKIFD"]);
		   carPinYinQu.push(["星沙经济开发区","CSXXSQB"]);
		   carPinYinQu.push(["雨花区","CSXYUHD"]);   return carPinYinQu;}
	   case 'CTU':{
		   carPinYinQu.push(["青羊区","CTUQGQD"]);
		   carPinYinQu.push(["成华区","CTUCHQD"]);
		   carPinYinQu.push(["金牛区","CTUJNQD"]);
		   carPinYinQu.push(["武侯区","CTUWHQD"]);
		   carPinYinQu.push(["锦江区","CTUJJQD"]);
		   carPinYinQu.push(["双流","CTUSLQD"]);   return carPinYinQu;}
	   case 'CZX':{
		   carPinYinQu.push(["天宁区","CZXTNQD"]);
		   carPinYinQu.push(["新北区","CZXXBQD"]);
		   carPinYinQu.push(["钟楼区","CZXZLQD"]);   return carPinYinQu;}
	   case 'DLC':{
		   carPinYinQu.push(["甘井子区","DLCGJZD"]);
		   carPinYinQu.push(["中山区","DLCZSQD"]);   return carPinYinQu;}
	   case 'FOC':{
		   carPinYinQu.push(["鼓楼区","FOCGLUD"]);
		   carPinYinQu.push(["机场","FOCFZJCB"]);   return carPinYinQu;}
	   case 'FOH':{
		   carPinYinQu.push(["禅城区","FOHCCQD"]);   return carPinYinQu;}
	   case 'PEK':{
		   carPinYinQu.push(["顺义区","PEKSYQD"]);
		   carPinYinQu.push(["西城区","PEKXCGD"]);
		   carPinYinQu.push(["宣武区","PEKXWQD"]);
		   carPinYinQu.push(["海淀区","PEKHDND"]);
		   carPinYinQu.push(["丰台区","PEKFTQD"]);
		   carPinYinQu.push(["昌平区","PEKCPQD"]);
		   carPinYinQu.push(["朝阳区","PEKZYGD"]);
		   carPinYinQu.push(["东城区","PEKDCGD"]);   return carPinYinQu;}
	   case 'DNG':{
		   carPinYinQu.push(["厚街镇","DNGHJZD"]);
		   carPinYinQu.push(["南城区","DNGNCQD"]);
		   carPinYinQu.push(["常平镇","DNGCPZD"]);
		   carPinYinQu.push(["万江区","DNGWJQD"]);   return carPinYinQu;}
	   case 'CAN':{
		   carPinYinQu.push(["越秀区","CANYXUD"]);
		   carPinYinQu.push(["白云区","CANBYND"]);
		   carPinYinQu.push(["花都区","CANHDUD"]);
		   carPinYinQu.push(["天河区","CANTHED"]);
		   carPinYinQu.push(["番禺区","CANFYUD"]);
		   carPinYinQu.push(["海珠区","CANHZUD"]);
		   carPinYinQu.push(["荔湾区","CANLWND"]);   return carPinYinQu;}
	   case 'HAK':{
		   carPinYinQu.push(["秀英区","HAKXYQD"]);
		   carPinYinQu.push(["机场","HAKHKJCB"]);
		   carPinYinQu.push(["龙华区","HAKLHQD"]);   return carPinYinQu;}
	   case 'HFE':{
		   carPinYinQu.push(["瑶海区","HFEYHQD"]);
		   carPinYinQu.push(["包河区","HFEBHQD"]);   return carPinYinQu;}
	   case 'HGH':{
		   carPinYinQu.push(["西湖区","HGHXHQD"]);
		   carPinYinQu.push(["上城区","HGHSCQD"]);
		   carPinYinQu.push(["滨江区","HGHJIDD"]);
		   carPinYinQu.push(["拱墅区","HGHGSQD"]);
		   carPinYinQu.push(["下城区","HGHXCQD"]);
		   carPinYinQu.push(["萧山区","HGHXSQD"]);   return carPinYinQu;}
	   case 'KWL':{
		   carPinYinQu.push(["象山区","KWLXSQD"]);
		   carPinYinQu.push(["机场","KWLGLJCB"]);   return carPinYinQu;}
	   case 'TNA':{
		   carPinYinQu.push(["槐荫区","TNAHYQD"]);
		   carPinYinQu.push(["历城区","TNALCQD"]);   return carPinYinQu;}
	   case 'KHN':{
		   carPinYinQu.push(["机场","KHNJICHB"]);
		   carPinYinQu.push(["红谷滩新区","KHNHGTD"]);   return carPinYinQu;}
	   case 'KMG':{
		   carPinYinQu.push(["官渡区","KMGGDQD"]);
		   carPinYinQu.push(["盘龙区","KMGPLQD"]);   return carPinYinQu;}
	   case 'NGB':{
		   carPinYinQu.push(["鄞州区","NGBYZQD"]);
		   carPinYinQu.push(["海曙区","NGBHSQD"]);
		   carPinYinQu.push(["江东区","NGBJDQD"]);   return carPinYinQu;}
	   case 'NKG':{
		   carPinYinQu.push(["建邺区","NKGJYQD"]);
		   carPinYinQu.push(["玄武区","NKGXWQD"]);
		   carPinYinQu.push(["下关区","NKGXGQD"]);
		   carPinYinQu.push(["秦淮区","NKGQHQD"]);
		   carPinYinQu.push(["鼓楼区","NKGGLQD"]);
		   carPinYinQu.push(["江宁区","NKGJNQD"]);   return carPinYinQu;}
	   case 'NTG':{
		   carPinYinQu.push(["崇川区","NTGCHCHQ"]);   return carPinYinQu;}
	   case 'KUS':{
		   carPinYinQu.push(["玉山","KUSYUSB"]);
		   carPinYinQu.push(["花桥","KUSHQB"]);   return carPinYinQu;}
	   case 'SHA':{
		   carPinYinQu.push(["虹口区","SHAHKUD"]);
		   carPinYinQu.push(["浦东新区","SHAPDGD"]);
		   carPinYinQu.push(["静安区","SHAJAND"]);
		   carPinYinQu.push(["徐汇区","SHAXHID"]);
		   carPinYinQu.push(["松江区","SHASJQD"]);
		   carPinYinQu.push(["长宁区","SHACNGD"]);
		   carPinYinQu.push(["宝山区","SHABSND"]);
		   carPinYinQu.push(["杨浦区","SHAYPUD"]);
		   carPinYinQu.push(["闸北区","SHAZBID"]);
		   carPinYinQu.push(["嘉定区","SHAJNGD"]);
		   carPinYinQu.push(["卢湾区","SHALWND"]);
		   carPinYinQu.push(["普陀区","SHAPTOD"]);
		   carPinYinQu.push(["闵行区","SHAMHGD"]);
		   carPinYinQu.push(["黄浦区","SHAHPUD"]);   return carPinYinQu;}
	   case 'SHE':{
		   carPinYinQu.push(["铁西区","SHETXQD"]);
		   carPinYinQu.push(["大东区","SHEDDQD"]);   return carPinYinQu;}
	   case 'SYX':{
		   carPinYinQu.push(["凤凰机场","SYXFHB"]);
		   carPinYinQu.push(["大东海","SYXDDHB"]);
		   carPinYinQu.push(["三亚湾","SYXSYWB"]);
		   carPinYinQu.push(["亚龙湾","SYXYLWB"]);
		   carPinYinQu.push(["河西区","SYXHXB"]);   return carPinYinQu;}
	   case 'SZX':{
		   carPinYinQu.push(["罗湖区","SZXLHUD"]);
		   carPinYinQu.push(["南山区","SZXNSND"]);
		   carPinYinQu.push(["龙岗区","SZXLGGD"]);
		   carPinYinQu.push(["宝安区","SZXBAND"]);
		   carPinYinQu.push(["福田区","SZXFTND"]);   return carPinYinQu;}
	   case 'TAO':{
		   carPinYinQu.push(["城阳区","TAOCYQD"]);
		   carPinYinQu.push(["四方区","TAOSFQD"]);
		   carPinYinQu.push(["市北区","TAOSBQD"]);   return carPinYinQu;}
	   case 'TSN':{
		   carPinYinQu.push(["滨海新区","TSNBHQQD"]);
		   carPinYinQu.push(["南开区","TSNNKQD"]);
		   carPinYinQu.push(["河东区","TSNHDQD"]);
		   carPinYinQu.push(["河北区","TSNHBQD"]);
		   carPinYinQu.push(["东丽区","TSNDLQD"]);
		   carPinYinQu.push(["塘沽区","TSNTGD"]);
		   carPinYinQu.push(["红桥区","TSNHXCD"]);   return carPinYinQu;}
	   case 'TYN':{
		   carPinYinQu.push(["迎泽区","TYNYZQD"]);
		   carPinYinQu.push(["小店区","TYNXDQD"]);   return carPinYinQu;}
	   case 'WUH':{
		   carPinYinQu.push(["汉阳区","WUHHYQD"]);
		   carPinYinQu.push(["江汉区","WUHJHQD"]);
		   carPinYinQu.push(["东西湖区","WUHDHKFD"]);
		   carPinYinQu.push(["武昌区","WUHWCQD"]);
		   carPinYinQu.push(["青山区","WUHQSD"]);
		   carPinYinQu.push(["洪山区","WUHHSQD"]);
		   carPinYinQu.push(["黄陂区","WUHHPQD"]);
		   carPinYinQu.push(["东湖高新技术","WUHDHGXB"]);   return carPinYinQu;}
	   case 'WUX':{
		   carPinYinQu.push(["北塘区","WXIBTQD"]);
		   carPinYinQu.push(["新区","WXIXINQU"]);   return carPinYinQu;}
	   case 'SDE':{
		   carPinYinQu.push(["顺德","FSSDB"]);   return carPinYinQu;}
	   case 'SOZ':{
		   carPinYinQu.push(["苏州工业园区","SOZSZGYD"]);
		   carPinYinQu.push(["相城区","SOZXCQD"]);
		   carPinYinQu.push(["平江区","SOZPJQD"]);
		   carPinYinQu.push(["沧浪区","SOZCLQD"]);
		   carPinYinQu.push(["金阊区","SOZJCQD"]);
		   carPinYinQu.push(["苏州新区","SOZSZXQD"]);
		   carPinYinQu.push(["吴中区","SOZWZQD"]);   return carPinYinQu;}
	   case 'QDH':{
		   carPinYinQu.push(["其他","QDHQTD"]);   return carPinYinQu;}
	   case 'CGO':{
		   carPinYinQu.push(["中原区","CGOZYQD"]);
		   carPinYinQu.push(["管城回族区","CGOGCHZD"]);
		   carPinYinQu.push(["二七区","CGOEQQD"]);
		   carPinYinQu.push(["金水区","CGOJSQD"]);
		   carPinYinQu.push(["机场","CGOJCD"]);   return carPinYinQu;}
	   case 'XIA':{
		   carPinYinQu.push(["新城区","XIAXCQD"]);
		   carPinYinQu.push(["雁塔区","XIAYTQD"]);
		   carPinYinQu.push(["开发区","XIAKFQD"]);
		   carPinYinQu.push(["咸阳机场","XIAXYJCB"]);   return carPinYinQu;}
	   case 'XMN':{
		   carPinYinQu.push(["思明区","XMNSMQD"]);
		   carPinYinQu.push(["湖里区","XMNHLQD"]);   return carPinYinQu;}
	   case 'ZUH':{
		   carPinYinQu.push(["香洲区","ZHHXZQD"]);
		   carPinYinQu.push(["金湾区","ZHHJWQD"]);
		   carPinYinQu.push(["拱北区","ZHHGBQB"]);   return carPinYinQu;}
	   } 
    return  new Array();
}
