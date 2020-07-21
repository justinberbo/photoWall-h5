
var  userId;
// 注册
function register() {

  var email = $("#login_name").val();
  var password = $("#password").val();
  var isEmail= new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")
  var condition=0;
  if (password== null || password == ''||password.length<6){

    condition=2;
  }
  if (email == null || email == ''||!isEmail.test(email)) {
    condition=1;
  }

  switch (condition) {
    case (0):$.ajax({
      type: "post",
      url: "http://47.103.218.59:81/api/register",
      data: JSON.stringify({"email": email,"password":password}),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.success) {
          localStorage.removeItem("uuid")
          localStorage.setItem("uuid",data.data);
          $(location).attr('href', '/photoWall/index.html');
        } else {
          alert(data.returnMsg)
        }
      },
      error: function (data) {
        alert("系统异常")
      }
    });
    break;
    case (1): alert("请输入正确的邮箱格式"); break;
    case (2):alert("请输入大于6位的密码");break;
  }

}
// 登入
function login() {
  var email = $("#login_name").val();
  var password = $("#password").val();
  var isEmail = new RegExp(
      "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")
  var condition = 0;
  if (email == null || email == '' || !isEmail.test(email)) {
    alert("请输入正确的邮箱格式")
  }
  if (password == null || password == '') {
    alert("请输入密码")
  }
  if (condition == 0) {
    $.ajax({
      type: "post",
      url: "http://47.103.218.59:81/api/login",
      data: JSON.stringify({
        "email": email,
        "password": password
      }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.success) {
          localStorage.removeItem("uuid")
          localStorage.setItem("uuid",data.data.uuid);
          $(location).attr('href', '/photoWall/index.html');
        } else {
          alert(data.returnMsg)
        }
      },
      error: function () {
        alert("错误")
      }
    });
  }
}
// 搜索
function getPersonage(condition){
  $.ajax({
    async: false,
    type: "post",
    url: "http://47.103.218.59:81/api/search",
    data: JSON.stringify({
      "condition": condition,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.success) {
        return data.data
      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
      alert("错误")
    }
  });
}

//搜索
function search(){

  var condition=$(".textKey").val();
  var array=getPersonage(condition);
  // var array=[{"name":"测试"},{"name":"雷姆"},{"name":"科比"},{"name":"路飞"},{"name":"路飞"},{"name":"路飞"}]
  var item=0;
  $.each(array,function(i,iteration){
    item++;
  })
  switch (item) {
    case 0:alert("没有查到数据");break;
    case 1:$("#item5").css('display','none');
    case 2:$("#item6").css('display','none');
    case 3:$("#item3").css('display','none');
    case 4:$("#item2").css('display','none');
    case 5:$("#item7").css('display','none');
    case 6:$("#item1").css('display','none');
    case 7:$("#item8").css('display','none');

  }
  switch (item) {
    case 7:  $("#item8 .title ").html(array[6].name);$("#item0 .ico img").attr("src",array[6].avatar);
    case 6:$("#item1 .title ").html(array[5].name);$("#item1 .ico img").attr("src",array[5].avatar);
    case 5:$("#item7 .title ").html(array[4].name);$("#item7 .ico img").attr("src",array[4].avatar);
    case 4:$("#item2 .title ").html(array[3].name);$("#item2 .ico img").attr("src",array[3].avatar);
    case 3:$("#item3 .title ").html(array[2].name);$("#item3 .ico img").attr("src",array[2].avatar);
    case 2:$("#item6 .title ").html(array[1].name);$("#item6 .ico img").attr("src",array[1].avatar);
    case 1:$("#item4 .title ").html(array[0].name);$("#item4 .ico img").attr("src",array[0].avatar);
  }

}
