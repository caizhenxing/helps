//var words=new Array("�����");

var words=new Array("Ԫ��","��ǩ","�ṹ","���","��ʽ","����","���","��׼","��ʽ","Web 2.0", "CSS", "XHTML 1.0");

//var words=new Array("clear","float","clip","overflow","overflow-x","overflow-y","display","visibility","position","z-index","top","right","bottom","left","height","max-height","min-height","width","max-width","min-width");

function AddFillerLink(){
	if(!document.getElementById || !document.createElement) return;
	var i,l;
	for(i=0;i<arguments.length;i++){
		l=document.createElement("a");
		l.href="#";
		l.appendChild(document.createTextNode("���������"));
		l.onclick=function(){AddText(this);return(false)};
		document.getElementById(arguments[i]).appendChild(l);
	}
}

function AddText(el){
	var s="",n,i;
	n=RandomNumber(20,80);
	for(i=0;i<n;i++)
		s+=words[RandomNumber(0,words.length-1)]+" ";
	var t=document.createElement("p");
	t.appendChild(document.createTextNode(s));
	el.parentNode.insertBefore(t,el);
}

function RandomNumber(n1,n2){
	return(Math.floor(Math.random()*(n2-n1))+n1);
}