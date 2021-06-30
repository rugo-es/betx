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

function loadLeagues(){

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
      
      am4core.ready(function() {
      
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_dark);
    
        $.each(response, function(idx, opt){ 
  
  
          let element = '<div class="row league-container"><div class="col-12"><h3>'+opt.league.name+'</h3></div><div class="col-3"><div id="pie-chart-'+opt.leagueId+'" style="width: 100%; height: 280px;"></div></div><div class="col-9"><div id="streaks-chart-'+opt.leagueId+'" style="width: 100%; height: 300px;"></div></div></div>';
          $("#leagues-container").append(element)
  
  
          // pie charts
          let id_pie_chart = "pie-chart-"+opt.leagueId;
          let chartData = [ {
            result: "no_ties",
            value: opt.no_ties
          }, {
            result: "ties",
            value: opt.ties
          }]
          // Pie chart
          let piechart = am4core.create(id_pie_chart, am4charts.PieChart);
          piechart.startAngle = 160;
          piechart.endAngle = 380;
          piechart.innerRadius = am4core.percent(40);
    
          piechart.data = chartData;
    
          let pieSeries = piechart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = "value";
          pieSeries.dataFields.category = "result";
          pieSeries.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
          pieSeries.slices.template.strokeWidth = 1;
          pieSeries.slices.template.strokeOpacity = 1;
          pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;
          pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
    
          pieSeries.labels.template.disabled = true;
          pieSeries.ticks.template.disabled = true;
    
          pieSeries.colors.list = [
            am4core.color("#dc6967"),
            am4core.color("#7ddc67")
          ];
    
          let label = piechart.seriesContainer.createChild(am4core.Label);
          label.textAlign = "middle";
          label.horizontalCenter = "middle";
          label.verticalCenter = "middle";
          label.adapter.add("text", function(text, target){
            return "[bold font-size:24px]" + pieSeries.dataItem.values.value.sum + "[/]\n[font-size:14px]matches[/]";
          })
    
  
  
          
  
          // streaks chart 
  
          var id_streaks_chart = "streaks-chart-"+opt.leagueId
          var streakschart = am4core.create(id_streaks_chart, am4charts.XYChart);
          var streaksdata = [
            {
              "num_matches": "1",
              "count": 48
            },
            {
              "num_matches": "2",
              "count": 38
            },
            {
              "num_matches": "3",
              "count": 21
            },
            {
              "num_matches": "4",
              "count": 18
            },
            {
              "num_matches": "5",
              "count": 15
            },
            {
              "num_matches": "6",
              "count": 15
            },
            {
              "num_matches": "7",
              "count": 5
            },
            {
              "num_matches": "8",
              "count": 5
            }
          ];
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
  
  
        })
    
      })


      
     

     
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}
