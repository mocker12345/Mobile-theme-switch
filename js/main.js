/**
 * Created by rancongjie on 16/3/19.
 */
var imgUrls=["img/img1.jpeg","img/img2.jpeg","img/img3.jpeg","img/img4.jpeg"];
function id(idName) {
  return document.getElementById(idName);
}
window.onload=function() {
  setLayout();
  var list=id("imgList");
  var boxs=list.getElementsByClassName("div");
  var now=0;
  var timer=0;
  var off=false;
  $(list).swipeLeft(
    function (){
      if(off)
      {
        return;
      }
      off=true;
      now++;
      var i=0;
      clearInterval(timer);
      timer=setInterval(
        function (){
          if(i==3)
          {
            clearInterval(timer);
          }
          tabImg(i,-1);
          i++;
        },
        30
      );
      tabNav();
    }
  );
  $(list).swipeRight(
    function (){
      if(off)
      {
        return;
      }
      off=true;
      now--;
      var i=0;
      clearInterval(timer);
      timer=setInterval(
        function (){
          if(i==3)
          {
            clearInterval(timer);
          }
          tabImg(i,1);
          i++;
        },
        30
      );
      tabNav();
    }
  );
  function tabImg(rows,dis){
    var timer2=0;
    var start= dis>0? rows*4 : (rows+1)*4-1;
    var end= dis>0?  (rows+1)*4-1 : rows*4;
    timer2=setInterval(
      function() {
        if(start == end)
        {
          clearInterval(timer2);
        }
        if(rows==3 && start == end)
        {
          mTween(boxs[start],{rotateY:-90*now},600,"backOut",
            function (){
              off=false;
            }
          );
        }
        else
        {
          mTween(boxs[start],{rotateY:-90*now},600,"backOut");
        }
        start+=dis;
      },
      60
    );
  }
  function tabNav(){
    var navs=id("navs").children;
    var nub=now%navs.length;
    if(nub<0){
      nub+=navs.length;
    }
    for(var i=0; i<navs.length; i++){
      navs[i].className="";
    }
    navs[nub].className="active";
  }
};
function setLayout(){
  var list=id("imgList");
  var li=list.getElementsByTagName("li");
  var css=id("css");
  var str='';
  var listH=list.clientHeight;
  var liH=listH/4;
  for( var i=0; i<16; i++){
    str+='<li><div class="div"><div><span></span><div><span></span><div><span></span><div><span></span></div></div></div></div></div></li>'
  }
  list.innerHTML=str;
  css.innerHTML+="#imgList li{height:"+liH+"px}";
  for(var i=0; i<li.length; i++){
    var span=li[i].getElementsByTagName("span");
    for(var j=0; j<span.length; j++){
      span[j].style.backgroundImage="url("+imgUrls[j]+")";
      span[j].style.backgroundPosition=-(i%4)*4+"rem -"+parseInt(i/4)*liH+"px";
    }
  }
}
