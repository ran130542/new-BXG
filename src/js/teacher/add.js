require('../common/aside');
require('../common/header');
require('../common/common');

require('../common/ajaxloading')

$('.teacher-add').ajaxForm({
  delegation:true,
  success:function(data){
    if(data.code == 200){
      alert(12345);
    }
  }
})