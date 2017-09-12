// $(function(){
//     console.log("111")
//     $('#login_form').ajaxForm({
//         success:function(data){
//             console.log(data.result)
//             if(data.code==200){
//                 console.log(data.result)
//                 var obj_str=JSON.stringify(data.result)
//                 localStorage.setItem('userinfo',obj_str);
//                 location.href='/dist/index.html'
//             }else{
//                 alert("登录失败")
//             }
//         },
//         error:function(){
//             alert('错误')
//         }
//     })
// });



$(() => {
    $('#login_form').ajaxForm({
        success: function (data) {
            if (data.code == 200) {
                localStorage.setItem('userinfo', JSON.stringify(data.result));
                location.href='/dist/index.html';
            } else {
                alert('登陆失败')
            }
        },
        error: function () {
            alert('登陆失败')
        }
    })
})



var userinfo = JSON.parse(localStorage.getItem('userinfo')) || {};
 var tc_avatar = userinfo.tc_avatar || '/public/img/default.png';
 $('.avatar img').attr('src', tc_avatar);