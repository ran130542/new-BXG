require('../common/header.js')
require('../common/aside')
require('../common/common')
var path = require('../common/getpath');
require('../common/ajaxloading')

var cg_id = path.getpath('cg_id');
$.get('/v6/category/edit', {cg_id: cg_id },function (data) { 
  $('.form-horizontal').html(template('editcategory',data.result))
 })
$('#category-edit-form').ajaxForm({
  delegation:true,
  success:function(data){
    if(data.code == 200){
      alert('修改成功')
    }
  }
})