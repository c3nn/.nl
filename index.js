import { $, css } from "./lib/c3nnUtil.js";

const heroBgCanvas = $('#heroBgCanvas'),
	c = heroBgCanvas.getContext('2d', { alpha: false });

const circleRadius = 5,
	circleColumnSpacing = 15,
	circleRowSpacing = 15,
	circleColor = '#111',
	noiseScale = 0.005,
	noiseMoveAmp = 14,
	noiseSizeAmp = 6,
	xOffsetSpeed = 0.01,
	yOffsetSpeed = 0.005;
css("--circleColumnSpacing", circleColumnSpacing + "px");
css("--circleRowSpacing", circleRowSpacing + "px");

var xOffset = 0,
	yOffset = 0;

var circleColumns,
	circleRows,
	loops,
	resizeOnNextUpdate = false,
	deltaTime,
	then = Date.now()-10;

function windowResize(){
	heroBgCanvas.width = Math.min(window.innerWidth, 2560);
	heroBgCanvas.height = Math.min(window.innerHeight, 1440);
	
	circleColumns = Math.floor(heroBgCanvas.width / circleColumnSpacing);
	circleRows = Math.floor(heroBgCanvas.height / circleRowSpacing);
	loops = circleColumns * circleRows;

	c.fillStyle = circleColor;
	
	return;
}
windowResize();
window.addEventListener('resize', ()=> {
	resizeOnNextUpdate = true;
});

function update(){
	if(resizeOnNextUpdate == true){
		windowResize();
		resizeOnNextUpdate = false;
	}

	c.clearRect(0,0,heroBgCanvas.width,heroBgCanvas.height);
	for (let i = 0; i < loops; i++) {
		c.beginPath();
		let preX = circleColumnSpacing/2 + (i%circleColumns)*circleColumnSpacing,
			preY = circleRowSpacing/2 + Math.floor(i/circleColumns)*circleRowSpacing + noiseMoveAmp;

		let x = preX,
			y = preY - (perlin.get(preX*noiseScale+xOffset, preY*noiseScale-yOffset)+1)*noiseMoveAmp,
			radius = circleRadius + perlin.get(preX*noiseScale+xOffset, preY*noiseScale-yOffset)*noiseSizeAmp;

			c.arc(x.limitDec(1), y.limitDec(1), radius.limitDec(1), 0, Math.PI*2);
			c.fill();
		}

	deltaTime = Date.now() - then;
	then = Date.now();

	xOffset += xOffsetSpeed * (deltaTime/50);
	yOffset += yOffsetSpeed * (deltaTime/50);

	setTimeout(() => {
		window.requestAnimationFrame(update);
	}, 80-deltaTime)
	return;
}
window.requestAnimationFrame(update);
