$('aside img').attr('src',);
var datas = JSON.parse(localStorage.getItem('userinfo'));
$('.aside img').attr('src',datas.tc_avatar);  //显示用户的头像
$('.aside h4').text(datas.tc_name);           //显示用户的用户名



var path  = location.pathname;
$('.navs a').removeClass('active');             //导航添加焦点样式
$('.navs a[href="'+path+'"]').addClass('active').parents('ul').show();  //导航点击后展开




