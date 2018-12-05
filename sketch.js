var target,yy=0;x=0,count=0;
var y;
var songs,toys,drawings,canvas;
var m = [];
var state;
var t =[],d=[],s =[];
var t1=0,d1=0,s1=0;
var domList;
var aInt = 80;
function setup() {
  canvas = createCanvas(windowWidth,0.7*windowHeight);
  y = windowHeight;
  yy = windowHeight;
  songs = createP("Songs");
  toys = createP("Toys");
  drawings = createP("More");
  toys.class('h2');
  drawings.class('h2');
  songs.class('h2');
  songs.touchStarted(songsDisplay);
  toys.touchStarted(toysDisplay);
  drawings.touchStarted(drawingsDisplay);
  domSetup();
  for (var i=0;i<30;i++){
    m[i] = new Particle(random(width),random(height),random(1,3));
  }
}
function domSetup(){
  domList = document.getElementsByClassName("h2");
  for(let i = 0; i<domList.length;i++){
    if(windowWidth<windowHeight){
      aInt = 90;
      domList[i].style.fontSize = "35px";
      document.getElementsByTagName("h1")[0].style.fontSize = "70px";
    }
    else{
      aInt = 45;
      domList[i].style.fontSize = "26px";
      document.getElementsByTagName("h1")[0].style.fontSize = "55px";  
      if(windowHeight<768){
        document.getElementsByTagName("h1")[0].style.fontSize = "50px";
        domList[i].style.fontSize = "23px";

  
      }   
    }
    domList[i].addEventListener('mouseover',function(){      
      domList[i].style.maxWidth = "100%";
    })
    domList[i].addEventListener('mouseout',function(){
      domList[i].style.maxWidth = "61.8%";
    })    
  }
}
function draw() {
  if (windowHeight<1000){
    wh =1000;
  }
  else{
    wh = windowHeight;
  }
  yy += (y-yy)*0.05
  canvas.position(0,yy)
  background(0,30);
  stroke(random(200,255),100);
  var l = random(height)
  if (state===0){
  line(0,l,width,l)
  }else{
  var ly = random(-100,100);
  line(0,l,mouseX,mouseY+ly);
  line(mouseX,mouseY+ly,width,l);
  }
  noStroke();
  fill(255)
  for (var t = 0;t<m.length;t++){
    fill(200,100);
    if (state == 1){
      m[t].steering(createVector(mouseX,mouseY));
    }
    m[t].separation(m);
    m[t].resistance();
    m[t].borders();
    m[t].update();
    m[t].display();
  }
  push()
  fill(200,180);
  textSize(28);
  textAlign(CENTER);
  text("Design & Code by Sikai LI, 2018",0.5*width,height-40);
  pop()
}


function songsDisplay(){
  toys.style("max-width","61.8%");
  drawings.style("max-width","61.8%");
  songs.style("max-width","100%");
  if (t.length>0){
    t[0].remove();
    t[1].remove();
    t[2].remove();
    t[3].remove();
    t[4].remove();
    t[5].remove();
  }
  if (s.length>0){
    s[0].remove();
    s[1].remove();
    s[2].remove();
    s[3].remove();
    s = [];
    // d[3].remove();
  }
  if (d.length>0){
    d[0].remove();
    d[1].remove();
    d[2].remove();
    d[3].remove();

    d = [];
  }
  s[0] = createA("http://song.skyl.fr","Flower 花");
  s[2] = createA("http://em.skyl.fr","E_Ham_Minor_85 字");
  s[1] = createA("http://rain.skyl.fr","Rain Addiction 雨瘾");
  s[3] = createA("http://el.skyl.fr","Sync_c 一");
  x = 0;
  y = 300+ 0.25*(windowHeight-300);

  s[0].position(x+20,y+10);
  s[1].position(x+20,y+10+aInt*1);
  s[2].position(x+20,y+10+aInt*2);
  s[3].position(x+20,y+10+aInt*3)
  s1 = 1
}
function toysDisplay(){
  toys.style("max-width","100%");
  drawings.style("max-width","61.8%");
  songs.style("max-width","61.8%");


  if (t.length>0){
    t[0].remove();
    t[1].remove();
    t[2].remove();
    t[3].remove();
    t[4].remove();
    t[5].remove();
  }
  if (s.length>0){
    s[0].remove();
    s[1].remove();
    s[2].remove();
    s[3].remove();
    s = [];
    // d[3].remove();
  }
  if (d.length>0){
    d[0].remove();
    d[1].remove();
    d[2].remove();
    d[3].remove();

    d = [];
  }
  t[4] = createA("http://forces.skyl.fr","Gravity    万 有引力");
  t[3] = createA("http://unsustainable.skyl.fr","Unsustainable      回 授");
  t[2] = createA("http://testa.skyl.fr","Toxic    毒 ");
  t[0] = createA("http://eyes.skyl.fr","Eyes    眼");
  t[1] = createA("http://line.skyl.fr","Draw      画");
  t[5] = createA("http://splash.skyl.fr","Washed      登高冲刷");

  x = 0;
  y = 300+ 0.5*(windowHeight-300);

  t[0].position(x+20,y+10+aInt*0);
  t[1].position(x+20,y+10+aInt*1);
  t[2].position(x+20,y+10+aInt*2);
  t[3].position(width/2+20,y+10+aInt*0);
  t[4].position(width/2+20,y+10+aInt*1);
  t[5].position(width/2+20,y+10+aInt*2);
  t1 = 1
}
function drawingsDisplay(){
  toys.style("max-width","61.8%");
  drawings.style("max-width","100%");
  songs.style("max-width","61.8%");

  if (t.length>0){
    t[0].remove();
    t[1].remove();
    t[2].remove();
    t[3].remove();
    t[4].remove();
    t[5].remove();
  }
  if (s.length>0){
    s[0].remove();
    s[1].remove();
    s[2].remove();
    s[3].remove();
    s = [];
    // d[3].remove();
  }
  if (d.length>0){
    d[0].remove();
    d[1].remove();
    d[2].remove();
    d[3].remove();

    d = [];
  }

  d[1] = createA("http://myj.skyl.fr/cv.pdf","C.V.");
  d[2] = createA("http://skyl.fr","skyl@me.com");
  d[0] = createA("https://www.behance.net/gallery/59875263/Generative-Design","Drawings");
  d[3] = createA("https://myss.skyl.fr","Myss");

  x = 0;
  y = 300+ 0.6*(windowHeight-300);
  d[0].position(x+20,y+10+aInt*0);
  d[1].position(x+20,y+10+aInt*1);
  d[2].position(x+20,y+10+aInt*2);
  d[3].position(width/2+20,y+10+aInt*0);

  d1 = 1
}

function touchStarted() {
  state = 1;
  background(random(100,500),0,100);
  

}
function touchEnded() {
  state = 0;
}
function windowResized() {
  // y = windowHeight;
  // yy = windowHeight;
  // resizeCanvas(windowWidth, 0.7*windowHeight);
  // domSetup();
}
// document.ontouchmove = function(e) {
//   e.preventDefault();
// }
