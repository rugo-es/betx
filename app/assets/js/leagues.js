$(document).ready(function(){
  loadLeagues()
})

function loadLeagues(){

  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/leagues",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      console.log(response)

      $.each(response, function(idx, opt){
        let element = '<div class="row league-container"><h3>'+opt.name+'</h3><div class="col-3"><div id="pie-chart-'+idx+'" style="width: 100%; height: 100px;"></div></div><div class="col-9"><div id="streaks-chart-'+idx+'" style="width: 100%; height: 100px;"></div></div></div>';
        $("#leagues-container").append(element)
      })

      console.log('load data leagues')
      loadDataLeagues();
     
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}

function loadDataLeagues(){

  // Matches
  /*
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
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
    */


  // Stats Streaks
  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/statsstreaks",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      console.log(response)

      let streaks = [0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0];
/*
      $.each(response, function(idx, opt) {
        streaks[opt.num_matches]++;
      })
      var fin = true;
      while(fin){
        if(streaks[streaks.length-1] == 0 && streaks.length > 21){
          streaks.pop()
        }else{
          fin = false
        }
      }
       
      var streaksdata = []
      
      $.each(streaks, function(idx, opt) {
        if(idx != 0){
          let item = {num_matches: idx, count: opt}
          streaksdata.push(item)
        }
      })
      console.log(streaksdata)

      var streakschart = am4core.create("streaks-chart", am4charts.XYChart);

      streakschart.data = streaksdata;
      
      streakschart.padding(40, 40, 40, 40);
      
      var categoryAxis = streakschart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "num_matches";
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.inversed = false;
      categoryAxis.renderer.grid.template.disabled = true;
      
      var valueAxis = streakschart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.extraMax = 0.1;
      //valueAxis.rangeChangeEasing = am4core.ease.linear;
      //valueAxis.rangeChangeDuration = 1500;
      
      var series = streakschart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = "num_matches";
      series.dataFields.valueY = "count";
      series.tooltipText = "{valueY.value}"
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;
      //series.interpolationDuration = 1500;
      //series.interpolationEasing = am4core.ease.linear;
      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.verticalCenter = "bottom";
      labelBullet.label.dy = -10;
      labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
      
      streakschart.zoomOutButton.disabled = true;
      
      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add("fill", function (fill, target) {
      return streakschart.colors.getIndex(target.dataItem.index);
      });
*/
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })


}
