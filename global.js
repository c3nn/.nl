import { $, $all, css } from "/lib/c3nnUtil.js";

const barsCont = $('#barsCont');

//* Page transitions
function loadingMenuOff(){
	barsCont.attr('loading-out','');
	barsCont.removeAttr('loading');
	setTimeout(() => {
		barsCont.removeAttr('loading-out')
	}, 350);
}
function loadingMenuOn(){
	barsCont.attr('loading-out','');
	barsCont.attr('loading', '');
	setTimeout(() => {
		barsCont.removeAttr('loading-out')
	}, 350);
}
window.trans = function(href){ // transition to a page
	loadingMenuOn();
    setTimeout(function() { 
        window.location.href = href
    }, 400)
	return false; // stops browser from opening link
}
window.addEventListener('load', () => {
	setTimeout(() => {
		loadingMenuOff();
	}, 100);
});

//* Bars Menu
$(':root').addEventListener('mousedown', (e) => {
	if(css('--isMobileDevice') == "true"){
		if(barsCont.attr('open') != 'true' && e.clientY >= window.innerHeight - 50){
			barsCont.attr('open','true');
		}else if(e.clientY <= window.innerHeight * (Number($('#barsCont').css('--_contHeight').replace('svh',''))/100)){
			barsCont.removeAttribute('open');
		}
	}
})
window.addEventListener('resize', () => {
	if(css('--isMobileDevice') != "true"){
		barsCont.removeAttribute('open');
	}
});

$('#barsContactPageButton').addEventListener('click', () => {
	if(barsCont.hasAttr('about-page-open')){
		barsCont.removeAttr('about-page-open');
	}else{
		barsCont.attr('about-page-open','')
	}
});
