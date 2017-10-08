/*
mixedReality.
=============
>> interspecifics // mecanosaurio
<< abandon normal devices 2017
*/

// sketch for p5.js, p5_dom.js
// dinamically creates textboxs
// plot graphs and change some stuff

var w, hc;
var timer;
var fonti;
var filtIndex;

function preload(){
  fonti = loadFont("./etc/Occupied.ttf");
  fontb = loadFont("./etc/Waukegan.ttf");
 }

function setup() {
  var canvasDiv = document.getElementById('barrac1');
  w = canvasDiv.offsetWidth;
  canvas = createCanvas(w, 200);
  canvas.parent('sketch-holder');
  canvas.id('graphs');

  // change some stuff in DOM
  ttl = select('h3');
  nst = w/16;
  if (nst>36) nst=36;
  ttl.style("font-size", nst+"px");
  
  //startMessages();

  // also, some data math
  total_loc1 = 0;
  total_loc2 = 0;
  for (i=0; i<10; i++){
    total_loc1 += loc_tniu[i][1];
    total_loc2 += loc_tfem[i][1];
    console.log("total_loc1:"); console.log(total_loc1);  
    console.log("total_loc2:"); console.log(total_loc2);  
  }
  // txt settings
  textFont(fonti);
  textAlign(CENTER);

}


function draw() {
  background(0,0,0);
  // margins
  noFill();
  stroke(0,204, 0);
  rect(0,0,w/2-1,197);
  rect(w/2+1,0,w/2-2,197);

  // plot 1
  textFont(fonti);
  textSize(nst/2);
  fill(255, 255, 255);
  stroke(255, 255, 255);
  text("TOP COUNTRIES TALKING ABOUT:", w/4, 25);
  textFont(fontb);
  fill(0, 255, 0);
  stroke(0, 255, 0);
  text("#niunamenos", w/4, 45);

  offsetX = 20;
  offsetY = 160;
  barSizeX = ((w/2)-40)/5;
  for (i=0; i<5; i++){
    barSizeY = 220*(loc_tniu[i][1]/total_loc1)
    fill(0, 204, 0);
    stroke(0, 104, 0);
    rect(offsetX + barSizeX*i, offsetY, barSizeX-10, -barSizeY);
    textFont(fontb);
    textSize(2+nst/4);
    fill(255, 255, 255);
    stroke(255, 255, 255);

    var sp = loc_tniu[i][0].split(" ");
    if (sp.length>=2){
      text(sp[sp.length-2], offsetX + barSizeX*i + barSizeX/2 - 6, offsetY+14);
      text(sp[sp.length-1], offsetX + barSizeX*i + barSizeX/2 - 6, offsetY+24);
    } else {
      text(loc_tniu[i][0], offsetX + barSizeX*i + barSizeX/2 - 6, offsetY+14);
    }

  }

  // plot 2
  textFont(fonti);
  textSize(nst/2);
  fill(255, 255, 255);
  stroke(255, 255, 255);
  text("TOP COUNTRIES TALKING ABOUT:", 3*w/4, 25);
  textFont(fontb);
  fill(0, 255, 0);
  stroke(0, 255, 0);
  text("#feminazi", 3*w/4, 45);

  offsetX = w/2 + 20;
  offsetY = 160;
  barSizeX = ((w/2)-40)/5;
  for (i=0; i<5; i++){
    barSizeY = 220*(loc_tfem[i][1]/total_loc2)
    fill(0, 204, 0);
    stroke(0, 104, 0);
    rect(offsetX + barSizeX*i, offsetY, barSizeX-10, -barSizeY);
    textFont(fontb);
    textSize(2+nst/4);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    var sp = loc_tfem[i][0].split(" ");
    if (sp.length>=2){
      text(sp[sp.length-2], offsetX + barSizeX*i + barSizeX/2 - 6, offsetY+14);
      text(sp[sp.length-1], offsetX + barSizeX*i + barSizeX/2 - 6, offsetY+24);
    } else {
      text(loc_tfem[i][0], offsetX + barSizeX*i + barSizeX/2 - 6, offsetY+14);
    }
  }

}


function hereIs(indexOption){
  var txtDiv = $('#cajatexto');
  txtDiv.empty()
  filtIndex=indexOption;
  startMessages();
}


function startMessages() {
  timer = setInterval(createMessage, 10000);
}


function createMessage() {
  otherDiv = document.getElementById('barrac1');
  hb = otherDiv.offsetHeight;
  canvasDiv = document.getElementById('laapp');
  hc = canvasDiv.offsetHeight;
  console.log(w+', '+hc);
  
  var rIndex = Math.floor(Math.random()*data.length-1);
  document.getElementById('other-message').innerHTML = "["+data[rIndex]['username']+"]: "+data[rIndex]['text'];

  var pX = 5+Math.floor(Math.random()*(w-252));
  var pY = hb+Math.floor(Math.random()*(hc-100));
  console.log(pX+", "+pY);
  
  // make the div
  var aDiv = createDiv("");
  aDiv.parent("cajatexto");
  aDiv.class("text_block");

    // head
    var text_0 = createDiv(" ");
    text_0.class("text_head");
    var span_00 = createSpan("[>>]: "+data[rIndex]['timestamp'].substring(4));
    text_0.child(span_00);

    // user
    var text_1 = createP("");
    var span_1a = createSpan("User: ");
    var span_1b = createSpan(data[rIndex]['username']);
    text_1.child(span_1a);
    text_1.child(span_1b);

    // text
    var text_2 = createP("");
    var span_2a = createSpan("Text: ");
    var span_2b = createSpan(data[rIndex]['text']);
    text_2.child(span_2a);
    text_2.child(span_2b);

    // locationhttps://github.com/mecanosaurio/mixedReality/blob/master/data.js
    var text_3 = createP("");
    var span_3a = createSpan("Location: ");
    var span_3b = createSpan(data[rIndex]['location']);
    text_3.child(span_3a);
    text_3.child(span_3b);

    // timestamp
    //var text_4 = createP("");
    //var span_4a = createSpan("[Time]: ");
    //var span_4b = createSpan(data[rIndex]['time']);
    //text_4.child(span_4a);
    //text_4.child(span_4b);


    // los azules son los seleccionados en la lista

    console.log(data[rIndex]['loc']);
    console.log(loc_all[filtIndex][0]);
    if (data[rIndex]['loc'] == loc_all[filtIndex][0]){
      span_1a.class("text_blue");
      span_2a.class("text_blue");
      span_3a.class("text_blue");
      //span_4a.class("text_blue");  
    } else {
      span_1a.class("text_green");
      span_2a.class("text_green");
      span_3a.class("text_green");
      //span_4a.class("text_green");
    }

  aDiv.child(text_0);
  aDiv.child(text_1);
  aDiv.child(text_2);
  aDiv.child(text_3);
  //aDiv.child(text_4);

  aDiv.position(pX, pY);
}

