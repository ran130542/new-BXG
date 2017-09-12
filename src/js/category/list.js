require('../common/header.js')
require('../common/aside.js')

$.get('/v6/category',function (data) {  
  $('tbody').append(template('catagorylist',data.result));
})


