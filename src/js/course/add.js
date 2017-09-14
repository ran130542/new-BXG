require('../common/header.js')
require('../common/aside.js')
require('../common/common')
require('../common/ajaxloading')

$('.form-horizontal').ajaxForm(function(data){
 if(data.code == 200) {
    alert('课程创建成功');
    location.href = '/dist/html/course/edit1.html?cs_id=' + data.result.cs_id;
  }
})

