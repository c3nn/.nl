import { $, css } from "/lib/c3nnUtil.js";

if(css('--SupportsCSSHasSelector') != "true"){
	$('#enableJS').innerHTML = '( please use a chromium based browser for the best experience or a firefox version >120 )';
	setInterval(() => {$('#enableJS').remove();}, 10000);
}else{
	$('#enableJS').remove();
}

window.addEventListener('scroll', (e) => {
	css('--HeroScrollPer',Math.min(window.scrollY/(window.innerHeight/2),1));
	css('--ScrollY',window.scrollY);
});

// 🥚
let emailUsernamesEggList = ['c','conmann','Superuser','Nobody','Chucklenuts','Punslinger','uninst','onlyCatMemes','hello','conmandev','goofly'];
$('.atSymbol').title = $('.atSymbol').title.replace('[Please Enable Javascript]',emailUsernamesEggList[Math.floor(Math.random()*emailUsernamesEggList.length)]);
