require('../common/header.js');
require('../common/aside.js');
require('../common/common');
require('../common/ajaxloading')

var paths = require('../common/getpath');
var p = paths.getpath('cs_id');

/*数据展示*/
var lessons;
var datas;
$.get('/v6/course/lesson', { cs_id: p }, function (data) {
  if (data.code == 200) {
    console.log(111);
    
    data.result.stepindex = 3;
    lessons = data.result.lessons;
    datas = data.result
    $('.steps').html(template('courselist', data.result));
  }
})




$(document).on('click', '.showdetail', function () {
  var ct_id = $(this).data('id');

  if (ct_id) {
    $.get('/v6/course/chapter/edit', { 'ct_id': ct_id }, function (data) {
      if (data.code == 200) {
        $('#chapterModal').html(template('motaikuang', data.result));
      
       }
    })
  }
})

$(document).on('click', '#addlesson', function () {
  $('#chapterModal').html(template('motaikuang', { 'cs_id': p }));
})



$('#motai').ajaxForm({
  delegation: true,
  beforesubmit:function(arrdata,$form,options){
    arrdata.push({
      name:'ct_is_free',
      value:$('#ct_is_free').prop('checked')?1:0
    })
  },
  success: function (data) {
    if (data.result) {
      alert('添加成功');
      uplesson(data.result);
      $('#motai').get(0).reset();
    } else {
      alert('修改成功');
      uplesson()
    }

  }
})

function uplesson(ct_id) {
  var newdata = refreshdata();
  var lessondata = {
    ct_id: newdata.ct_id || ct_id,
    ct_name: newdata.ct_name,
    ct_video_duration: newdata.ct_minutes + ':' + newdata.ct_seconds
  }
  console.log(lessondata);
  if (ct_id) {
    lessons.push(lessondata);
  } else {
    var index = getindex(newdata.ct_id);
    lessons.splice(index, 1, lessondata);
  }
  console.log(lessons);
  $('#newdata').html(template('redata', lessons));
}


function refreshdata() {

  var dataarr = $('#motai').serializeArray();
console.log(dataarr);
  var dataupdate = {};
  for (var i = 0; i < dataarr.length; i++) {
    dataupdate[dataarr[i].name] = dataarr[i].value;
  }
  console.log(dataupdate);
  return dataupdate;

};

function getindex(ct_id) {
  for (var i = 0, len = lessons.length; i < len; i++) {
    if (lessons[i].ct_id == ct_id) {
      return i;
    }
  }
}

