require('../common/header.js')
require('../common/aside.js')
require('../common/common')
var paths = require('../common/getpath')
var p = paths.getpath('tc_id');
$.get('/v6/teacher/edit', { tc_id: p }, function (data) {
  if (data.code == 200) {
    $('.teacher-add').html(template('changeteacher', data.result))
  }
})

$('.form-horizontal').ajaxForm({
  delegation:true,
  success: function (data) {
    if (data.code == 200) {
      alert('ok');
    }
  }
})