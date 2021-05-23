$(document).ready(function(){

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  const team = urlParams.get('team')
  if(team){
    loadTeamPage(team)
  }else{
    loadTeamsPage()
  }
  
})

function loadTeamsPage(){
  $("#teams-container").show();
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/teams",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      response.forEach(element => {
        $("#team-list").append('<a href="/app/teams?team='+element.id+'" class="list-group-item list-group-item-action link-team">'+element.name+'</a>')
      });
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}

function loadTeamPage(team){
  $("#team-container").show();
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/teams/"+team,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      $("#team-name").html(response.name)
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}