/*------------------★sparkset.js展開分ここから--------------------*/
/*

  SparkSet Classes

  Written by rryu <rryu@t3.rim.or.jp>

フェアリーダストJS作成者  http://www.t3.rim.or.jp/~rryu/

  # 2001-08-31 Ver 1.0



★JS保管サイト　http://www.shurey.com/js/others/mouse_twinklestar.html*/

//-----------------------------------------// Spark class definition
//

/*

  SparkSet Classes

  Written by rryu <rryu@t3.rim.or.jp>
             http://www.t3.rim.or.jp/~rryu/

  # 2001-08-31 Ver 1.0

*/

//----------------------------------------------------
// Spark class definition
//

function Spark(elem, weight) {
  this.elem = elem;
  this.weight = weight == 0 ? 10 : weight;
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.lifetime = 0;
  this.isLive = false;

  this.setVisible(false);

  elem.onmousedown = Spark_eventIgnore;
  elem.onmouseup = Spark_eventIgnore;
  elem.onmouseover = Spark_eventIgnore;
  elem.onmouseout = Spark_eventIgnore;
  elem.onmousemove = Spark_eventIgnore;
}

function Spark_eventIgnore() {
  return true;
}

function Spark_birth(startX, startY, spX, spY, lifetime) {
  this.x = startX;
  this.y = startY;
  this.speedX = spX;
  this.speedY = spY;
  this.lifetime = lifetime;
  this.isLive = true;

  this.moveTo(startX, startY);
  this.setVisible(true);
}

function Spark_die() {
  this.setVisible(false);
  this.isLive = false;
}

function Spark_doMove() {
  this.x += this.speedX;
  this.y += this.speedY;
  this.moveTo(this.x, this.y);
  this.speedY += this.weight;
  this.lifetime--;
  if (this.lifetime <= 0) this.die();
  return this.isLive;
}

function Spark_moveTo_IE(x, y) {
  this.elem.style.left = "" + Math.round(x) + "px";
  this.elem.style.top = "" + Math.round(y) + "px";
}

function Spark_moveTo_Netscape(x, y) {
  this.elem.left = x;
  this.elem.top = y;
}

function Spark_setVisible_IE(isVisible) {
  this.elem.style.visibility = isVisible ? "visible" : "hidden";
}

function Spark_setVisible_Netscape(isVisible) {
  this.elem.visibility = isVisible ? "visible" : "hide";
}

Spark.prototype.birth = Spark_birth;
Spark.prototype.die = Spark_die;
Spark.prototype.doMove = Spark_doMove;

if (document.layers) {
  Spark.prototype.moveTo = Spark_moveTo_Netscape;
  Spark.prototype.setVisible = Spark_setVisible_Netscape;
} else {
  Spark.prototype.moveTo = Spark_moveTo_IE;
  Spark.prototype.setVisible = Spark_setVisible_IE;
}

//----------------------------------------------------
// SparkSet class definition
//

function SparkSet(id, interval, weight) {
  this.sparks = new Array();
  this.numSpark = 0;
  this.numLiveSpark = 0;
  this.birthIdx = 0;
  this.interval = interval;
  this.isSetTimeout = false;
  this.sparkWeight = weight;
  this.id = id;
  SparkSet.instances[id] = this;
}

function SparkSet_getElementById(id) {
  return document.getElementById(id);
}

function SparkSet_getElemetById_IE(id) {
  return document.all[id];
}

function SparkSet_getLayerById(id) {
  return document.layers[id];
}

function SparkSet_start(n) {
  var elem;
  this.sparks = new Array();
  for (var i = 0; i < n; i++) {
    elem = this.getElementById(this.id + i);
    this.sparks[i] = new Spark(elem, this.sparkWeight);
  }
  this.numSpark = n;
  this.numLiveSpark = 0;
}

function SparkSet_startWithWriteElements(
  n,
  imgFile,
  imgWidth,
  imgHeight,
  spread
) {
  for (var i = 0; i < n; i++) {
    var delta = Math.floor(spread * Math.random());
    var w = imgWidth - delta;
    var h = imgHeight - delta;
    this.writeSparkElement(i, imgFile, w, h);
  }
  this.start(n);
}

function SparkSet_WriteSparkElement(no, imgFile, imgWidth, imgHeight) {
  document.write(
    '<DIV id="' +
      this.id +
      no +
      '" style="position:absolute; visibility: hidden;">'
  );
  document.write(
    '<IMG src="./' +
      imgFile +
      '" width="' +
      imgWidth +
      '" height="' +
      imgHeight +
      '">'
  );
  document.write("</DIV>");
}

function SparkSet_WriteSparkLayer(no, imgFile, imgWidth, imgHeight) {
  document.write('<LAYER name="' + this.id + no + '" visibility="hide">');
  document.write(
    '<IMG src="./' +
      imgFile +
      '" width="' +
      imgWidth +
      '" height="' +
      imgHeight +
      '">'
  );
  document.write("</LAYER>");
}

function SparkSet_birthSpark(x, y, spX, spY, lifetime) {
  if (this.numLiveSpark >= this.numSpark) return false;

  while (this.numLiveSpark < this.numSpark) {
    var spark = this.sparks[this.birthIdx++];
    if (this.birthIdx >= this.numSpark) this.birthIdx = 0;
    if (!spark.isLive) {
      spark.birth(x, y, spX, spY, lifetime);
      this.numLiveSpark++;
      break;
    }
  }

  if (this.numLiveSpark > 0 && !this.isSetTimeout) this.setTimeout();
  return true;
}

function SparkSet_setTimeout() {
  setTimeout('SparkSet.instances["' + this.id + '"].doSpark()', this.interval);
  this.isSetTimeout = true;
}

function SparkSet_doSpark() {
  for (var i = 0; i < this.numSpark; i++) {
    var spark = this.sparks[i];
    if (spark.isLive) {
      if (!spark.doMove()) this.numLiveSpark--;
    }
  }

  this.isSetTimeout = false;
  if (this.numLiveSpark > 0) this.setTimeout();
}

SparkSet.instances = new Object();

if (document.getElementById) {
  SparkSet.prototype.getElementById = SparkSet_getElementById;
  SparkSet.prototype.writeSparkElement = SparkSet_WriteSparkElement;
} else if (document.layers) {
  SparkSet.prototype.getElementById = SparkSet_getLayerById;
  SparkSet.prototype.writeSparkElement = SparkSet_WriteSparkLayer;
} else {
  SparkSet.prototype.getElementById = SparkSet_getElemetById_IE;
  SparkSet.prototype.writeSparkElement = SparkSet_WriteSparkElement;
}
SparkSet.prototype.start = SparkSet_start;
SparkSet.prototype.startWithWriteElements = SparkSet_startWithWriteElements;
SparkSet.prototype.birthSpark = SparkSet_birthSpark;
SparkSet.prototype.setTimeout = SparkSet_setTimeout;
SparkSet.prototype.doSpark = SparkSet_doSpark;

/*--------------------★sparkset.js展開分ここまで---------------------------*/

/*--------------------★星屑のスクリプトここから---------------------------*/
var lx = 0;
var ly = 0;
fairyDust = new SparkSet("dust", 70, 0.8);

/*★星屑の画像指定(星の総数,画像のURL,画像の横サイズ,画像の縦サイズ,大きさの揺らぎ)
大きさの揺らぎは星の大きさに変化を付ける指定で、指定サイズから揺らぎサイズ分だけ小さくなった大きさでランダムに変化。原本は(30,"fairydust.gif",13,13,7)*/
fairyDust.startWithWriteElements(30, "img/star2.png", 20, 20, 7);
document.onmousemove = handleMouseMove;
if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE);
function handleMouseMove(e) {
  var x = e ? e.pageX : event.x + document.body.scrollLeft;
  var y = e ? e.pageY : event.y + document.body.scrollTop;
  var dx = x - lx > 0 ? 3 : -3;
  var dy = y - ly > 0 ? 3 : -3;
  var num = Math.round(Math.random()) + 1;
  for (var i = 0; i < num; i++) {
    var spX = Math.floor(dx * Math.random());
    var spY = Math.floor(dy * Math.random());
    /*★マウスでクリックしにくい時は、下記2行の右端の数値を変更*/
    var px =
      x + Math.floor(20 * Math.random()) - 50; /*★原本10。マウスと星の横間隔*/
    var py =
      y + Math.floor(20 * Math.random()) - 10; /*★原本10。マウスと星の縦間隔*/
    var lifetime = 5 + Math.floor(5 * Math.random());
    fairyDust.birthSpark(px, py, spX, spY, lifetime);
  }
  lx = x;
  ly = y;
}
/*--------------------★星屑のスクリプトここまで---------------------------*/

/*------★クリックすると星が飛び散るスクリプトここから。不要なら削除-------*/
clickSpark = new SparkSet("star", 50, 10);

/*★飛び散る星の画像指定(星の総数,画像のURL,画像の横サイズ,画像の縦サイズ,大きさの揺らぎ)
原本は(30,"star.gif",16,15,7)。画像は星屑と同じでも違っても可能*/
clickSpark.startWithWriteElements(10, "msk3_ki.png", 20, 20, 7);

document.onmousedown = handleMouseDown;
if (document.captureEvents) document.captureEvents(Event.MOUSEDOWN);
function handleMouseDown(e) {
  var x = e ? e.pageX : event.x + document.body.scrollLeft;
  var y = e ? e.pageY : event.y + document.body.scrollTop;
  for (var i = 0; i < 10; i++) {
    var spX = Math.floor(80 * Math.random()) - 40;
    var spY = -10 - Math.floor(60 * Math.random());
    var lifetime = 5 + Math.floor(15 * Math.random());
    clickSpark.birthSpark(x, y, spX, spY, lifetime);
  }
}
/*---------------★クリックすると星が飛び散るスクリプトここまで----------*/
// -->
