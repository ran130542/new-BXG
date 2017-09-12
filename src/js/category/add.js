require('../common/header.js')
require('../common/aside.js')
require('../common/common')
$.get('/v6/category/top',function (data) {  
  if (data.code == 200) {
    $('#category-top-select').html(template('select-tpl', data.result));
  }
})


$('#category-add-form').ajaxForm(function(data) {
  if(data.code == 200) {
    alert('恭喜你，创建了一个新学科');
  }
 });