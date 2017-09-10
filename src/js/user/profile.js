require('../common/header.js');
require('../common/aside.js');
require('../common/common');




$.ajax({
  type: 'get',
  url: '/v6/teacher/profile.html',
  success: function (data) {
    if (data.code == 200) {
      $('.teacher-profile').html(template('selfinfo', data.result));
    }
  }
})

