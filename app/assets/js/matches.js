$(document).ready(function(){

  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/matches",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      console.log(response)

      $('#matchesTable').DataTable({
        data: response,
        columns: [
          {
            className: 'f32', // used by world-flags-sprite library
            data: 'league.country.code',
            render: function(data, type) {
              if (type === 'display') {
                var country = '';
                switch (data) {
                  case 'es':
                    country = 'ESP';
                    break;
                  case '_England':
                    country = 'ENG';
                    break;
                  case 'it':
                    country = 'ITA';
                    break;
                  case 'fr':
                    country = 'FRA';
                    break;
                  case 'de':
                    country = 'DEU';
                    break;
                }
                return '<span class="flag '+data+'"></span> <span>'+country+'</span>';
              }
              return data;
            }
          },
          { data: 'league.name' },
          { data: 'season.name' },
          { data: 'journey' },
          { data: 'local.name' },
          { data: 'local_goals' },
          { data: 'visitor.name' },
          { data: 'visitor_goals' },
          { data: 'result' }
        ]
      });

    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
  
})