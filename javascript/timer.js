var min;
var rest;
var stopping = false;
var start = false;
var myAlarm = 1;
var canvas;
var context;
var sizeX=200, sizeY=200;
var r = 100;
var isrest = false;

function init(){
    canvas = document.getElementById('graph');
    sizeX = canvas.clientWidth;
    sizeY = canvas.clientHeight;
    r = (sizeX > sizeY)?sizeY/2:sizeX/2;
    context = canvas.getContext("2d");
    context.beginPath();
    context.arc(sizeX/2,sizeY/2,r, 0, 2*Math.PI, false);
    context.strokeStyle = "red";
    context.stroke();
}

function timer(){
    m = document.getElementById("minute").value;
    re = document.getElementById("rest").value;
    if(isNaN(m) || isNaN(re)){
        alert("잘못된 입력입니다. 숫자로 입력해주세요");
    }
    else if(m == "" || re ==""){
        alert("빈칸이 있습니다. 숫자를 입력하세요");
    }else{
        if(!start){
            min = m;
            rest = re;
            var started = new Date();
            stopping= false;
            start=true;
            showTime(started);
        }
    }
}

function drawCircle(max, re){
    var startPoint = 1.5*Math.PI;
    context.clearRect(0,0,sizeX,sizeY);
    context.beginPath();
    context.fillStyle="red";
    context.arc(sizeX/2,sizeY/2,r,startPoint, startPoint + re/(max*60)*2*Math.PI, isrest);
    context.lineTo(sizeX/2,sizeY/2);
    context.lineTo(sizeX/2,0);
    context.closePath();
    context.fill();
}
function showTime(started){
    var now = new Date();
    var text = document.getElementById("timer");
    var diff = min * 60 * 1000 - (now.getTime() - started.getTime());
    var second = Math.floor(diff /1000) % 60;
    var minute = Math.floor(diff/1000/60) % 60;
    if(minute <10) minute = '0'+minute;
    if(second<10) second='0'+second;
    text.innerHTML=  minute + ":" + second+"";


    if(stopping){
        stopping = false;
        text.innerHTML = "STOP";
        return;
    }
    if(diff > 0){
        drawCircle(min ,diff/1000);
        setTimeout(showTime, 100, started);
    }
    else{
        alarm();
        isrest =true;
        text.style.color="blue";
        resting(now);
    }
}

function resting(started){
    var now = new Date();
    var text = document.getElementById("timer");
    var diff = rest * 60 * 1000 - (now.getTime() - started.getTime());
    var second = Math.floor(diff /1000) % 60;
    var minute = Math.floor(diff/1000/60) % 60;
    if(minute <10) minute = '0'+minute;
    if(second<10) second='0'+second;
    text.innerHTML= minute + ":" + second;
    if(stopping){
        stopping=false;
        text.innerHTML = "중지되었습니다.";
        return;
    }
    else if(diff > 0){
        drawCircle(rest,diff/1000);
        setTimeout(resting, 100, started);
    }
    else{
        alarm();
        isrest = false;
        text.style.color="black";
        showTime(now);
    }
}
var showop = false;

function explain(e){
    if(!showop){
        var list = document.getElementById("option");
        var label = "<div id='list'><label for='"+e.id+"'>옵션</label></div>";
        list.innerHTML = label;
    }
}

function tomato(e){
    if(!showop){
        var list = document.getElementById("option");
        list.innerHTML = "";
    }
     
}

function stop(){    
    stopping = true;
    start=false;
}

function alarm(){

    var src = "./mp3/"+myAlarm+".mp3";
    var audio = new Audio(src);
    audio.play();

}

function setting(e){
    myAlarm = e.value;
    alarm();
}


function option(){
    if(showop){
        hideOption();
        showop=false;
    }else{
        showOption();
        showop=true;
    }
}

function showOption(){
    var list = document.getElementById("option");
    list.innerHTML ="<div id='list'></div>";
    var k = document.getElementById('list');
    k.innerHTML ="";

    for(i=0;i<8;i++){
        k.innerHTML += "<input type='radio' name='alarm' onclick='setting(this)' value='" + (i+1) + "'>알림음"+(i+1)+"<br>";
    }
    var inputs = k.getElementsByTagName("input");
    inputs[myAlarm-1].checked = true;
}
function hideOption(){
    var list = document.getElementById("option");
    list.innerHTML = "";

}
