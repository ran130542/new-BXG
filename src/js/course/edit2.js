require('../common/header.js')
require('../common/aside.js')
require('../common/common')
require('../common/ajaxloading')

var paths = require('../common/getpath');
var p = paths.getpath('cs_id');

$.get('/v6/course/picture', { 'cs_id': p }, function (data) {
  if (data.code == 200) {
    data.result.stepindex = 2;
    $('.steps').html(template('requireimg', data.result));
  }
})