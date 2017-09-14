require('../common/header.js')
require('../common/aside.js')
require('../common/common')
require('../common/ajaxloading')

var paths = require('../common/getpath');
var p = paths.getpath('cs_id');
var cg_id;
$.get('/v6/course/basic', { cs_id: p }, function (data) {
  if (data.code == 200) {
    data.result.stepindex = 1;
    $('.steps').html(template('coursebase', data.result));
  }
});
$(document).on('change', '#firstcategory', function () {
  var val = $(this).val();
  
  $.get('/v6/category/child', {cg_id:val},function(data){
    if(data.code == 200){
      var html = '';
      for(var i= 0;i<data.result.length;i++){
        html+= '<option  value="'+data.result[i].cg_id+'">'+data.result[i].cg_name+'</option>'
      }
      $('#secondcategory').html(html);
    }
  })
})

$('.form-horizontal').ajaxForm({
  delegation:true,
  success:function(data){
    if(data.code == 200){
      console.log(2343532);
      location.href='/dist/html/course/edit2.html?cs_id='+p;
    }
  }
})