require('../common/header.js')
require('../common/aside.js')
require('../common/common')


$.get('/v6/teacher', function (data) {
  if (data.code == 200) {
    $('#teachertr').append(template('teacherlist', data.result))
  }
})

$('html').on('click', '.teacherlook', function () {

  var tc_id = $(this).data('id');
  console.log(tc_id);
  $.get('/v6/teacher/view', {'tc_id':tc_id }, function (data) {
    if (data.code == 200) {
      $('#teacherModal').html(template('motaikuang', data.result));  
    }
  })
})



$('html').on('click', '.changestatus', function () {
  var tc_id = $(this).data('id');
  var tc_status = $(this).data('status');
  var $this = $(this);
  $.post('/v6/teacher/handle', { tc_id: tc_id, tc_status: tc_status }, function (data) {
    if (data.code == 200) {
      $this.text(data.result.tc_status == 1 ? '启 用' : '注 销');
      $this.data('status', data.result.tc_status);
    }
  })
})

