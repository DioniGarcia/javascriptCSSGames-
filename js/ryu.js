
var audio = new Audio("../css/song.mp3");
audio.play();

document.addEventListener('keydown', (e) => {
    
    if (e.code === "ArrowUp")  {
      pressedColor('up');
        moveT(); 
    } else if (e.code === "ArrowDown") {
      pressedColor('down');
        moveB();
    } else if (e.code === "ArrowLeft") {
      pressedColor('left');
        moveL(); 
    }else if (e.code === "ArrowRight"){
        pressedColor('right');
        moveR(); 
    } else if(e.code === "KeyA"){
        pressedColor('a');
        var bola = document.getElementById('bola'); 
        bola.style.animation='kame 1s linear  1s 1';
        //bola.style.animation='';
        var fighter = document.getElementById('fighter');
        fighter.style.animation='chKame 1s linear 0s 1'; 
        new Audio("../css/hadouken.mp3").play();
    } else if(e.code === "KeyS"){
      pressedColor('s');
      document.getElementById('fighter').style.animation='kickA .5s linear 0s 1 alternate'; 
      new Audio("../css/punch.mp3").play();
    }

  });

  function pressedColor(elem){
    document.getElementById(elem).style.backgroundColor='orange';
  }
  
  function moveBola(dist){
    var bola = document.getElementById('bola');
    var oldLeft = parseInt(bola.style.left,10);
    bola.style.left = oldLeft+dist+"px";
    
  }
  function moveR() {
    var obj = document.getElementById("fighter");
    var leftVal = parseInt(obj.style.left, 10);
    obj.style.left = (leftVal + 10) + "px";    
    moveBola(10);
  }

  function moveL() {
    var obj = document.getElementById("fighter");
    var leftVal = parseInt(obj.style.left, 10);
    obj.style.left = (leftVal - 10) + "px";  
    moveBola(-10);  
  }

  function moveT(){
    var obj = document.getElementById("fighter");
    console.log("TOP: "+obj.style.top);
  }
  function moveB(){
    var obj = document.getElementById("fighter");
    console.log("BOTTOM: "+obj.style.bottom);
  }

  document.addEventListener('keyup', (e) => {
    var arr = document.querySelectorAll(".butt, .trigg");
    
    for( x of arr){
        x.style.background = 'black';
        x.style.color= 'white';
    }

    document.getElementById('fighter').style.animation="";
    
  });
