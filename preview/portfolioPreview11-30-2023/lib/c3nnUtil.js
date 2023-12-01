/* 
* c3nnUtil.js
* 11/24/2023
* Conmann (c3nn.com)
* https://github.com/c3nn/.com/blob/main/lib/c3nnUtil.js
* Contains super useful fuctions that I sometimes use
* if you somehow find this helpful, you can use if you want just don't expect it to be the same for the rest of time
*/

// quick selector
export const $ = function(selector, searchElement = document){return searchElement.querySelector(selector);};
export const $all = function(selector, searchElement = document){return searchElement.querySelectorAll(selector);};
Element.prototype.$ = function(selector){return $(selector, this);}
Element.prototype.$all = function(selector){return $all(selector, this);}

export function css(name, val = null, options = {resolveToNum: false, obj: $(':root')}){
	let obj = (options.obj?options.obj:$(':root'));
	if(val != null){ // sets property
		obj.style.setProperty(name, val);
	}else{ // gets property if val == null
		let output = getComputedStyle(obj).getPropertyValue(name);
		return (options.resolveToNum?Number(output.delChar(' ').delChar('px').delChar('%').delChar('s')):output);
	}
}
Element.prototype.css = function(name, val = null, options = {resolveToNum: false}){
	let passedOptions = options;
	passedOptions.obj = this;
	css(name, val, passedOptions)
};

// String malipulation
String.prototype.delChar = function(sel){return this.replace(sel,'')};

// Set, get, has, and delete storage types (use filesaver.js if you want)
export function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}
export function hasCookie(cname) {
	return (getCookie(cname)?true:false);
}
export function deleteCookie(cname){
	if(!hasCookie(cname)){console.warn("cookie, " + cname + ", not found"); return;}
	setCookie(cname, '', 0);
}
export function setURLParam(name,value){
	let params = new URLSearchParams(window.location.search);
	params.set(name,value);
	window.location.search = params.toString();
}
export function getURLParam(name){
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
}
export function hasURLParam(name){
	const params = new URLSearchParams(window.location.search);
	return params.has(name);
}
export function deleteURLParam(name){
	const params = new URLSearchParams(window.location.search);
	params.delete(name);
	window.location.search = params.toString();
}
export function setURLHash(value){
	location.hash = value;
}
export function getURLHash(){
	if(location.hash == ''){return null;}
	return location.hash.replace('#','');
}
export function hasURLHash(){
	return (getURLHash() == null?false:true)
}
export function deleteURLHash(){
	setURLHash('')
}

// Math
export function pthag(a,b){
	return Math.sqrt(a*a + b*b);
}
export function toDeg(rad){
	return rad * 180/Math.PI;
}
export function toRad(deg){
	return deg * Math.PI/180;
}

// Exports
export default [
	Element.prototype.css,
	Element.prototype.$,
	Element.prototype.$all, 
	String.prototype.delChar
]
