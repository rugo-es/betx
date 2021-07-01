$(document).ready(function(){
  am4core.ready(function() {
      
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dark);

    loadPerTiesChart()

  });
})

function loadPerTiesChart(){

  let token = localStorage.getItem('token')
  var settings = {
    "url": "/api/statsLeagues",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      console.log(response)

      let data = []
      $.each(response, function(idx, opt){
        let league = {league: opt.league.name, ties: opt.per_ties*100, no_ties: (0-opt.per_no_ties)*100 }
        data.push(league)
      })

      console.log(data)

        // Per ties chart
        var chart = am4core.create("per-ties-chart", am4charts.XYChart);

        // Add data
        chart.data = data 

        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "league";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.axisFills.template.disabled = false;
        categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;
        
        console.log(categoryAxis)


        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = -100;
        valueAxis.max = 100;
        valueAxis.renderer.minGridDistance = 50;
        valueAxis.renderer.ticks.template.length = 5;
        valueAxis.renderer.ticks.template.disabled = false;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
        valueAxis.renderer.labels.template.adapter.add("text", function(text) {
          return text + "%";
        })

        // Legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        // Use only absolute numbers
        chart.numberFormatter.numberFormat = "#.#s";

        // Create series
        function createSeries(field, name, color) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueX = field;
          series.dataFields.categoryY = "league";
          series.stacked = true;
          series.name = name;
          series.stroke = color;
          series.fill = color;
          
          var label = series.bullets.push(new am4charts.LabelBullet);
          label.label.text = "{valueX}%";
          label.label.fill = am4core.color("#000");
          label.label.strokeWidth = 0;
          label.label.truncate = false;
          label.label.hideOversized = true;
          label.locationX = 0.5;
          return series;
        }

        var interfaceColors = new am4core.InterfaceColorSet();
        var positiveColor = interfaceColors.getFor("positive");
        var negativeColor = interfaceColors.getFor("negative");

        createSeries("ties", "Ties", positiveColor);
        createSeries("no_ties", "No ties", negativeColor);

    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })

  
}
