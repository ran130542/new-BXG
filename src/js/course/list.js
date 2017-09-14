require('../common/header.js');
require('../common/aside.js');
require('../common/common')
require('../common/ajaxloading')

$.get('/v6/course',function(data){
  if(data.code==200){
    $('.courses').html(template('couselist',data.result))
  }
})