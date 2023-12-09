//
// Remnants of Attraction by e4494s
// https://e4494s.neocities.org/generative-art-gallery#:~:text=Remnants%20of%20Attraction
//

function randSign() {
	return Math.round(Math.random()) == 0 ? 1 : -1;
}
function randBetween(min, max) {
	return (Math.random() * (max - min)) + min;
}

var canvas3 = document.querySelector('#heroBgCanvas')

const ctx3 = canvas3.getContext("2d");
canvas3.onresize = function(){
	console.log(getComputedStyle(canvas3).width);
	canvas3.width = getComputedStyle(canvas3).width.replace('px','');
	canvas3.height = getComputedStyle(canvas3).height.replace('px','');

}
canvas3.onresize();

let friction3 = 0.2;
let numBlackHoles3 = 25;
let numPoints3 = 1000;
let minDist3 = 5;
let minAcceleration3 = 0.01;
let blackHole3Power = 10;
let brightness3 = 80;
let lineWidth3 = 1;
let opacity3 = 0.25;
let edgeSpawning3 = true;
let stepsPerFrame3 = 100000;
let spawningVelocity3 = 0;
let colorVariation3 = 0;

function randCanvas3EdgePos() {
  let r = Math.floor(Math.random() * 4);
  if (r === 0) return {x: Math.random() * canvas3.width, y: 0};
  else if (r === 1) return {x: canvas3.width, y: Math.random() * canvas3.height};
  else if (r === 2) return {x: Math.random() * canvas3.width, y: canvas3.height};
  else return {x: 0, y: Math.random() * canvas3.height};
}

function Point3() {
  let p = randCanvas3EdgePos();
  this.x = edgeSpawning3 ? p.x : Math.random() * canvas3.width;
  this.y = edgeSpawning3 ? p.y : Math.random() * canvas3.height;
  let a = Math.random() * Math.PI * 2;
  this.vx = spawningVelocity3 * Math.cos(a);
  this.vy = spawningVelocity3 * Math.sin(a);
  this.stopped = false;
  let hue = 20; //! color
  this.color = `hsl(${hue}deg, 100%, ${brightness3}%)`;
}
Point3.prototype.render = function() {
  let lastX = this.x;
  let lastY = this.y;
  this.x += this.vx;
  this.y += this.vy;
  this.vx *= 1 - friction3;
  this.vy *= 1 - friction3;
  for (let i = 0; i < blackHole3Array.length; i++) {
    let dx = blackHole3Array[i].x - this.x;
    let dy = blackHole3Array[i].y - this.y;
    let distSq = (dx * dx) + (dy * dy);
    let dist = Math.sqrt(distSq);
    if (dist <= minDist3) {
      this.stopped = true;
      this.x = blackHole3Array[i].x;
      this.y = blackHole3Array[i].y;
    }
    let invDist = 1 / dist;
    let angle = Math.atan2(dy, dx);
    let velocity = blackHole3Array[i].powerRatio * blackHole3Power * invDist;
    velocity = Math.max(velocity, minAcceleration3);
    this.vx += velocity * Math.cos(angle);
    this.vy += velocity * Math.sin(angle);
  }
  ctx3.strokeStyle = this.color;
  ctx3.lineWidth = lineWidth3;
  ctx3.globalAlpha = opacity3;
  ctx3.lineCap = ctx3.lineJoin = "round";
  ctx3.beginPath();
  ctx3.moveTo(lastX, lastY);
  ctx3.lineTo(this.x, this.y);
  ctx3.stroke();
};
let point3Array = [];
for (let i = 0; i < numPoints3; i++) point3Array.push(new Point3());

function BlackHole3() {
  this.x = Math.random() * canvas3.width;
  this.y = Math.random() * canvas3.height;
  this.powerRatio = randBetween(0.5, 1);
}
let blackHole3Array = [];
for (let i = 0; i < numBlackHoles3; i++) blackHole3Array.push(new BlackHole3());

function frame3() {
  for (let j = 0; j < stepsPerFrame3; j++) {
    for (let i = 0; i < point3Array.length; i++) {
      point3Array[i].render();
      if (point3Array[i].stopped) {
        point3Array[i] = new Point3();
      }
    }
  }
}

function reset3() {
  ctx3.globalAlpha = 1;
  ctx3.fillStyle = "black";
  ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
  
  blackHole3Array = [];
  while (blackHole3Array.length < numBlackHoles3) blackHole3Array.push(new BlackHole3());
  
  point3Array = [];
  point3Array.push(new Point3());
}

function draw3() {
  hue3 = Math.random() * 360;
  numBlackHoles3 = Math.round(randBetween(25, 50));
  
  reset3();
  frame3();
}

draw3()
