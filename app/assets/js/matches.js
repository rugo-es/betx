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
      // console.log(response)

      $('#matchesTable').DataTable({
        data: response,
        columns: [
          { data: 'league.name' },
          { data: 'season.name' },
          { data: 'journey' },
          { data: 'local.name' },
          { data: 'local_goals' },
          { data: 'visitor.name' },
          { data: 'visitor_goals' },
          { data: 'result' },
          /*
          { data: 'name' },
          { data: 'position' },
          {
            className: 'f32', // used by world-flags-sprite library
            data: 'office',
            render: function(data, type) {
              if (type === 'display') {
                var country = '';
                switch (data) {
                  case 'Argentina':
                    country = 'ar';
                    break;
                  case 'Edinburgh':
                    country = '_Scotland';
                    break;
                  case 'London':
                    country = '_England';
                    break;
                  case 'New York':
                  case 'San Francisco':
                    country = 'us';
                    break;
                  case 'Sydney':
                    country = 'au';
                    break;
                  case 'Tokyo':
                    country = 'jp';
                    break;
                  case 'Spain':
                    country = 'es';
                    break;
                }
                return '<span class="flag '+country+'"></span> <span>'+data+'</span>';
              }
              return data;
            }
          },
          {
            data: 'extn',
            render: function(data, type, row, meta) {
              return type === 'display' ?
                '<div class="progress"><div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: '+Math.round((data/9999)*100)+'%;" aria-valuenow="'+Math.round((data/9999)*100)+'" aria-valuemin="0" aria-valuemax="100"></div></div>' :
                data;
            }
          },
          { data: "start_date" },
          {
            data: "salary",
            render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
          }
          */
        ]
      });







    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
  
})