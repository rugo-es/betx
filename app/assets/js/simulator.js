$(document).ready(function(){
  loadTeams()
  loadSeasons()

  $("#slc-ladder-size").change(function() {
    slcLadderSize(this)
  });

})

function loadTeams(){
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/statsTeams",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {

      response = response.filter(x => x.num_matches > 400)

      response.sort(function (a, b) {
        if (a.team.name > b.team.name) { return 1; }
        if (a.team.name < b.team.name) { return -1; }
        return 0;
      });
      response.sort(function (a, b) {
        if (a.team.country.id > b.team.country.id) { return 1; }
        if (a.team.country.id < b.team.country.id) { return -1; }
        return 0;
      });
      for(let i = 0; i < response.length;i++){
        if(response[i].team.country === null){ continue }
        let country = response[i].team.country.name
        let tabs = $(".nav-tabs").children()
        let tab = tabs.find('a[data="'+country+'"]')
        if(tab.length == 0){
          let classTab = '';
          let classContainer = ''
          if(tabs.length == 0){
            classTab = ' active'
            classContainer = ' active show'
          }
          $(".nav-tabs").append('<li class="nav-item"><a class="nav-link f32'+classTab+'" data="'+country+'" data-bs-toggle="tab" href="#'+country+'">'+country+' <span style="" class="flag '+response[i].team.country.code+'"></span></a></li')
          $(".tab-content").append('<div class="tab-pane fade row'+classContainer+'" id="'+country+'"></div>')
        }
        $("#"+country).append('<div class="form-check col-2" style="vertical-align: middle; display: inline-block;"><input class="form-check-input" type="checkbox" value="'+response[i].team.id+'" id="team-id-'+response[i].team.id+'"><label class="form-check-label" for="team-id-'+response[i].team.id+'">'+response[i].team.name+'</label></div>')

      }
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}

function selectAllTabTeams(){
  let tab = $("ul.nav-tabs .nav-item a.nav-link.active").attr('data')
  let checkboxs = $("#"+tab+" input")
  let checkboxs_check = $("#"+tab+" input:checked")
  if(checkboxs_check.length < checkboxs.length){
    checkboxs.prop('checked', true)
  }else{
    checkboxs_check.prop('checked', false)
  }
}

function selectAllSeasons(){
  let checkboxs = $("#seasons-container input")
  let checkboxs_check = $("#seasons-container input:checked")
  if(checkboxs_check.length < checkboxs.length){
    checkboxs.prop('checked', true)
  }else{
    checkboxs_check.prop('checked', false)
  }
}

function loadSeasons(){
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/seasons",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {      
      for(let i = 0; i < response.length;i++){
        $("#seasons-container").append('<div class="form-check col-2" style="vertical-align: middle; display: inline-block;"><input class="form-check-input" type="checkbox" value="'+response[i].id+'" id="season-id-'+response[i].id+'"><label class="form-check-label" for="season-id-'+response[i].id+'">'+response[i].name+'</label></div>')
      }
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}

function slcLadderSize(obj){
  $("#ladderSizeOptions").empty()
  for(let i = 1; i <= $(obj).val(); i++){
    $("#ladderSizeOptions").append('<input style="margin-right: 5px;" type="text" size="4" class="form-control-sm" id="inputDefault" placeholder="" required>')
  }
}

async function simulate(){

  $("#tbody-result").empty()
  
  let teams = []
  if($("#teams-container input:checked").length == 0){ alert('select teams'); return; }
  $("#teams-container input:checked").each(function(){
    teams.push($(this).val())
  })

  let seasons = []
  if($("#seasons-container input:checked").length == 0){ alert('select seasons'); return; }
  $("#seasons-container input:checked").each(function(){
    seasons.push($(this).val())
  })
  
  let ladder = []  
  $("#ladderSizeOptions input").each(function(){
    ladder.push($(this).val())
  })
  if(ladder.some(x => x === "")){ alert('input ladder'); return; }

  console.log(teams)
  console.log(seasons)

  let total_win = 0
  let total_bet = 0
  for(let i = 0; i < teams.length; i++){
    for(let j = 0; j < seasons.length; j++){

      let resultTeamSeason = await getTeamSeason(teams[i], seasons[j], ladder)
      total_win += resultTeamSeason.total_win
      total_bet += resultTeamSeason.total_bet

    }
  }
  $("#total-win").html(total_win)
  $("#total-bet").html(total_bet)
  $("#total-result").html(total_bet + total_win)

}

function getTeamSeason(team, season, ladder){
  return new Promise((resolve, reject) => {
    
    let token = localStorage.getItem('token')
    var settings = {
      "url": "/api/matches/team/"+team+"/season/"+season,
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
    };
    $.ajax(settings)
      .done(function (response) {
       
        let tr = $('<tr>')
        let td_team, td_season, td_matches, td_result;
        let result = 0
        let index_ladder = 0
        let matches = ''
        let tooltip = ''
        let data = {total_win: 0, total_bet: 0}

        if(response.length == 0){ 
          resolve(data) 
        }else{

          if(response[0].local.id == team){ 
            td_team = $('<td>', {text: response[0].local.name})
          }else{
            td_team = $('<td>', {text: response[0].visitor.name})
          }
          td_season = $('<td>', {text: response[0].season.name})
  
          for(let k = 0; k < response.length; k++){
  
            result -= ladder[index_ladder]
            data.total_bet -= ladder[index_ladder]
  
            let btn_class
            tooltip = ladder[index_ladder]
            if(response[k].result == 'X'){
              btn_class = 'success'
              result += ladder[index_ladder] * 3
              data.total_win += ladder[index_ladder] * 3
              index_ladder = 0
            }else{
              if(ladder.length == index_ladder + 1){
                btn_class = 'danger'
                index_ladder = 0
              }else{
                btn_class = 'primary'
                index_ladder++
              }
              
            }
            tooltip += "<br>"+result
            matches += '<button type="button" style="margin-right: 2px;" class="btn btn-sm btn-'+btn_class+' mb-1" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="'+tooltip+'">&nbsp;</button>'

          }
  
          td_matches = $('<td>', {html: matches})
          td_result = $('<td>', {html: result})
  
          tr.append(td_team)
          tr.append(td_season)
          tr.append(td_matches)
          tr.append(td_result)
          $("#tbody-result").append(tr)
  
          var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
          var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
          })
  
          resolve(data)

        }

      })
      .fail( function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown)
        reject(errorThrown)
      })


  })
}