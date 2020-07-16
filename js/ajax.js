

function register1() {
  var name = $("#login_name").val();
  var password = $("#password").val();
  $.ajax({
    type: "post",
    url: "47.103.218.59:8091/register",
    data: {
      "name": name,
      "password": password
    },
    contentType: "application/json",
    dataType : "json",
    success: function (data) {
      alert("成功")
    },
    error:function () {
      alert("错误")
    }
  });
}

function ajax() {
  var name = $("#login_name").val();
  var password = $("#password").val();
  alert(name+password)
  $.ajax({
    type: "post",
    url: "http://localhost:8080/register",
    data: {
      "name": name,
      "password": password
    },
    dataType : "json",
    success: function (data) {
      alert("成功")
    },
    error:function () {
      alert("错误")
    }
  });
}
