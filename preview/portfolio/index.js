import { $ } from "./lib/c3nnUtil.js";

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	$('#enableJS').innerHTML = '( please use a chromium based browser for the best experience or a firefox version >120 )'
	setInterval(() => {$('#enableJS').remove();}, 10000)
}else{
	$('#enableJS').remove();
}

// 🥚
let emailUsernamesEggList = ['c','conmann','Superuser','Nobody','Chucklenuts','Punslinger','uninst','onlyCatMemes','hello','conmandev','goofly']
$('.atSymbol').title = $('.atSymbol').title.replace('[Please Enable Javascript]',emailUsernamesEggList[Math.floor(Math.random()*emailUsernamesEggList.length)]);
