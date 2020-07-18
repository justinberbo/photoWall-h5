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
      url: "http://localhost/api/register",
      data: JSON.stringify({"email": email,"password":password}),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.success) {

          alert("注册成功")
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
      url: "http://localhost/api/login",
      data: JSON.stringify({
        "email": email,
        "password": password
      }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.success) {
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

function getFriends(userId){
  $.ajax({
    type: "post",
    url: "http://localhost/api/getFeriends",
    data: JSON.stringify({
      "userId": userId,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.success) {

      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
      alert("错误")
    }
  });

}