var min;
var rest;
var stopping;
var start = false;
function timer(){
    min = document.getElementById("minute").value;
    rest = document.getElementById("rest").value;
    if(isNaN(min) || isNaN(rest)){
        alert("잘못된 입력입니다. 숫자로 입력해주세요");
    }
    else if(min == "" || rest ==""){
        alert("빈칸이 있습니다. 숫자를 입력하세요");
    }else{
        if(!start){
            var started = new Date();
            stopping= false;
            start=true;
            showTime(started);
        }
    }
}

function showTime(started){
    var now = new Date();
    var text = document.getElementById("timer");
    var diff = min * 60 * 1000 - (now.getTime() - started.getTime());
    var second = Math.floor(diff /1000) % 60;
    var minute = Math.floor(diff/1000/60) % 60;

    text.innerHTML= "다음 쉬는 시간 까지... <br>" + minute + "분 " + second+" 초";

    if(stopping){
        stopping = false;
        text.innerHTML = "중지되었습니다.";
        return;
    }
    if(diff > 0){
        setTimeout(showTime, 100, started);
        
    }
    else{
        resting(now);
    }
}

function resting(started){
    var now = new Date();
    var text = document.getElementById("timer");
    var diff = min * 60 * 1000 - (now.getTime() - started.getTime());
    var second = Math.floor(diff /1000) % 60;
    var minute = Math.floor(diff/1000/60) % 60;
    text.innerHTML= "남은 쉬는시간은...<br>" + minute + "분 " + second+" 초";
    if(stopping){
        stopping=false;
        text.innerHTML = "중지되었습니다.";
        return;
    }
    else if(diff > 0){
        setTimeout(resting, 100, started);
    }
    else{
        showTime(now);
    }
}

function stop(){    
    stopping = true;
    start=false;
}