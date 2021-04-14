function showAlert(style, time, message){
  $("body").append('<div id="alert-container" style="position: fixed; z-index: 999; top: 10px; margin: 0 10px; display: none;"><div class="alert alert-dismissible '+style+'">'+message+'</div></div>')
  $("#alert-container").fadeIn()
  setTimeout(function(){ $("#alert-container").fadeOut('slow', ()=>{
    $("#alert-container").remove()
  }) }, time)
}
