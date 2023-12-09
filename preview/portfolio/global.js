import { $, $all, css } from "./lib/c3nnUtil.js";

//* Setup
window.addEventListener('load', (e) => {
	$('#loadingLinesCont').dataset.start = true;
});

let linesCont = $('#linesCont'),
linesHoverCont = $('#linesCont .hoverCont');
// checks every loop and replicates what the data-anim state of #linesCont
$all('#linesCont .line').forEach(element => { 
	element.addEventListener('animationiteration', (e) => {
		element.dataset.anim = linesCont.dataset.anim;
	});
});
linesHoverCont.addEventListener("mouseenter", (e) => {
	linesCont.dataset.anim = "hover";
});
linesHoverCont.addEventListener("mouseleave", (e) => {
	if(linesCont.dataset.anim != 'closed'){
		linesCont.dataset.anim = "";
	}
});
linesHoverCont.addEventListener('click', (e) => {
	let canRun = true;
	$all('#linesCont .line').forEach(element => {
		if(getComputedStyle(element).width == '0px'){
			canRun = false;
		}
	});
	if(canRun == false){ return; }
	
	linesCont.dataset.anim = "closed";
	$('#linesMenuContCont').className = "Open";
	$all('#linesCont .line').forEach(element => {
		element.animate(
			[
				{
					top: getComputedStyle(element).top,
					easing: 'cubic-bezier(.3,1,1,1)',
				},
				{
					// I dont even know ok
					top: ((getComputedStyle(element).top.replace('px','') * 1) + (getComputedStyle(linesCont).height.replace('px','') * 0.4)) + 'px',
				}
			],
			1800
		);
		element.addEventListener('animationiteration', (e) => {
			// starts negative so it plays aninimation before page loads and uses --n2 after menu opens
			element.css('--n','var(--n2)');
		}, {once: true});
	});
});
$('#linesMenuClose').addEventListener('click', () => {
	let canRun = true;
	$all('#linesCont .line').forEach(element => {
		if(getComputedStyle(element).width != '0px'){
			canRun = false;
		}
	});
	if(canRun == false){ return; }

	$all('#linesMenuContCont #linesMenuCont .line .miniLine').forEach(element => {
		element.animate(
			[
				{
					width: getComputedStyle(element).width,
					right: getComputedStyle(element).right,
					easing: 'cubic-bezier(1,0,.76,.75)',
				},
				{
					width: "0px",
					right: "0px",
				}
			],
			1000
		);
	});
	$('#linesMenuContCont').className = "Closed";
	linesCont.dataset.anim = '';
	$all('#linesCont .line').forEach(element => {
		element.dataset.anim = '';
	});
});
