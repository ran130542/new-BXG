var x = "<div class='overlay'><img src='/public/img/loading.gif' /></div>";
$('body').append(x);
$(document).on('ajaxStart',function () {  
  $('.overlay').show();
})
$(document).on('ajaxStop',function () {  
  $('.overlay').hide();
})