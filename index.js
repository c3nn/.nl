import { $, $all, css } from "/lib/c3nnUtil.js";

if(css('--SupportsCSSHasSelector') != "true"){
	$('#enableJS').innerHTML = '( please use a chromium based browser for the best experience or a firefox version >120 )';
	setInterval(() => {$('#enableJS').remove();}, 10000);
}else{
	$('#enableJS').remove();
}

window.addEventListener('scroll', (e) => {
	css('--HeroScrollPer',Math.min(window.scrollY/(window.innerHeight/2),1));
});

$all('.iframeProjShowcase .iframeCont .zoomCont .minus').forEach(element => {
	element.addEventListener('click', (e) => {
		let iframeCont = element.parentElement.parentElement;
		iframeCont.css('--z', Math.min(iframeCont.css('--z',null,{num:true}) + 0.1, 10));
	});
});
$all('.iframeProjShowcase .iframeCont .zoomCont .plus').forEach(element => {
	element.addEventListener('click', (e) => {
		let iframeCont = element.parentElement.parentElement;
		iframeCont.css('--z', Math.max(iframeCont.css('--z',null,{num:true}) - 0.1, 0.2));
	});
});
