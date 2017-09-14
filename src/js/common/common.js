NProgress.start();
window.onload= function () { 
	NProgress.done();
 }




$('.navs ul').prev('a').on('click', function () {
	$(this).next().slideToggle();
});




var islogin = !!$.cookie('PHPSESSID')
var isloginpage = location.pathname=='/dist/html/user/login.html';

if(isloginpage&&islogin){
	location.href = '/dist/index.html'
}
if(!isloginpage&&!islogin){
	location.href = '/dist/html/user/login.html';
}
