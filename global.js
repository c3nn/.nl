import { $, css } from "/lib/c3nnUtil.js";

const barsCont = $('#barsCont');

$(':root').addEventListener('mousedown', (e) => {
	if(css('--isMobileDevice') == "true"){
		if(barsCont.attr('data-open') != 'true' && e.clientY >= window.innerHeight - 50){
			barsCont.attr('data-open','true');
		}else if(e.clientY <= window.innerHeight * (Number($('#barsCont').css('--_contHeight').replace('svh',''))/100)){
			barsCont.removeAttribute('data-open');
		}
	}
})
window.addEventListener('resize', () => {
	if(css('--isMobileDevice') != "true"){
		barsCont.removeAttribute('data-open');
	}
});