
// var  url="http://localhost:80/api/";
var  url="http://47.103.218.59/:80/api/";
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
      url: url+"register",
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
        alert("系统异常:系统异常多为数据库连接失败，请刷新试试")
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
      url: url+"login",
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
        alert("系统异常:系统异常多为数据库连接失败，请刷新试试")
      }
    });
  }
}

// 搜索人物
function getPersonage(){
  var condition=$(".textKey").val();
  $.ajax({
    async: false,
    type: "post",
    url: url+"search",
    data: JSON.stringify({
      "condition": condition,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.success) {
        showPersonages(data.data)
      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
      alert("系统异常:系统异常多为数据库连接失败，请刷新试试")
    }
  });
}

//前端展示
function showPersonages(array){

  $(".title-text").html("搜索结果")

  // var array=getPersonage(condition);
  // alert(array[0].name)
  // var array=[{"name":"测试"},{"name":"雷姆"},{"name":"科比"},{"name":"路飞"},{"name":"路飞"},{"name":"路飞"}]
   var item=0;
  $.each(array,function(i,iteration){
    item++;
  })

  if(item>7){
    item=7;
  }
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
    case 7:  $("#item8 .title ").html(array[6].name);$("#item0 .ico img").attr("src",array[6].avatar);$("#item8").attr("href","show.html"+"?name="+encodeURI(array[6].name))
    case 6:$("#item1 .title ").html(array[5].name);$("#item1 .ico img").attr("src",array[5].avatar);$("#item1").attr("href","show.html"+"?name="+encodeURI(array[5].name))
    case 5:$("#item7 .title ").html(array[4].name);$("#item7 .ico img").attr("src",array[4].avatar);$("#item7").attr("href","show.html"+"?name="+encodeURI(array[4].name))
    case 4:$("#item2 .title ").html(array[3].name);$("#item2 .ico img").attr("src",array[3].avatar);$("#item2 ").attr("href","show.html"+"name="+encodeURI(array[3].name))
    case 3:$("#item3 .title ").html(array[2].name);$("#item3 .ico img").attr("src",array[2].avatar);$("#item3").attr("href","show.html"+"?name="+encodeURI(array[2].name))
    case 2:$("#item6 .title ").html(array[1].name);$("#item6 .ico img").attr("src",array[1].avatar);$("#item6").attr("href","show.html"+"?name="+encodeURI(array[1].name))
    case 1:$("#item4 .title ").html(array[0].name);$("#item4 .ico img").attr("src",array[0].avatar);$("#item4").attr("href","show.html"+"?name="+encodeURI(array[0].name))
  }
}

// 查询热门搜索
function hot(){
  $.ajax({
    async: false,
    type: "get",
    url: url+"hotSearch",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.success) {
        $("#hot1").html(data.data[0])
        $("#hot2").html(data.data[1])
        $("#hot3").html(data.data[2])
        $("#hot4").html(data.data[3])
        $("#hot5").html(data.data[4])

      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
      alert("查询热搜异常:系统异常多为数据库连接失败，请刷新试试")
    }
  });
}

// 查询访问次数
function count() {
  addCount();
  $.ajax({
    type: "get",
    url: url+"getCount",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.success) {
        $("#count").text(data.data)
      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
      alert("网络错误：redis连接超时，请刷新试试")
    }
  });
}

// 添加访问次数
function addCount() {
  $.ajax({
    type: "get",
    url: url+"addCount",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.success) {

      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
    }
  });
}

//查询图片
function getImg(name) {

  $.ajax({
    async: false,
    type: "get",
    url: url+"getImg",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    data:{
     name:name
    },
    success: function (data) {
      if (data.success) {
img(data.data)
      } else {
        alert(data.returnMsg)
      }
    },
    error: function () {
      alert("系统异常:系统异常多为网络问题导致数据库连接超时，请刷新！")
    }
  });
}

function img(data) {

$(".cb-slideshow li:nth-child(1)").css('background-image', 'url(' + data[0] + ')')
  $(".cb-slideshow li:nth-child(2)").css('background-image', 'url(' + data[1] + ')')
  $(".cb-slideshow li:nth-child(3)").css('background-image', 'url(' + data[2] + ')')
  $(".cb-slideshow li:nth-child(4)").css('background-image', 'url(' + data[3] + ')')
  $(".cb-slideshow li:nth-child(5)").css('background-image', 'url(' + data[4] + ')')
}