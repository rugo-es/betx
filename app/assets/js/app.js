$(document).ready(function(){
  checkToken();
  linkActive()
})

/* User */
function checkToken(){
  let token = localStorage.getItem('token')
  let data = JSON.stringify({
    token: token
  })
  var settings = {
    "url": "/api/checkToken",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    },
    "data": data
  };
  $.ajax(settings)
    .done(function (response) { 
      loadUserInfo(response.user)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      location.href = "/login"
    })
}

function loadUserInfo(user){
  $("span#userEmail").html(user.email)
  if(user.image){
    $("img#userImage").attr("src", "/img/profile/"+user.image)
  }
}

function logOut(){
  localStorage.clear()
  location.href = "/login"
}

function linkActive(){
  let url = location.href.replace(/^.*\/\/[^\/]+/, '')
  $("a.nav-link").removeClass('active')
  $("a.nav-link[href$='"+url+"']").addClass('active')
}