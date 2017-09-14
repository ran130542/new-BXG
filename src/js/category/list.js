require('../common/header.js')
require('../common/aside.js')
require('../common/common')
require('../common/ajaxloading')

$.get('/v6/category',function (data) {  
  $('tbody').append(template('catagorylist',data.result));
})


