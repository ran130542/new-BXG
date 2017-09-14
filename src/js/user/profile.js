require('../common/header.js');
require('../common/aside.js');
require('../common/common.js');
require('../common/ajaxloading')




$.ajax({
  type: 'get',
  url: '/v6/teacher/profile.html',
  success: function (data) {
    if (data.code == 200) {
      $('.teacher-profile').html(template('selfinfo', data.result));
      initPlugin();
    }
  }
})

$('html').on('click', '#makesure', function () {
  $.ajax({
    url: '/v6/teacher/modify',
    type: "post",
    data: $('#teacher-profile-form').serialize(),
    success: function (data) {
      if (data.code == 200) {
        alert('ok')
      }
    }
  })
})

function initPlugin() {
  $('input[name=tc_birthday]').datepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    endDate: new Date('2010-01-01')
  })
  $('input[name=tc_join_date]').datepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    endDate: new Date('2015-01-01')
  })
}