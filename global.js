import { $, css } from "/lib/c3nnUtil.js";

const barsCont = $('#barsCont');

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
	if($('#barsCont').hasAttribute('about-page-open')){
		$('#barsCont').removeAttribute('about-page-open');
	}else{
		$('#barsCont').attr('about-page-open','')
	}
});