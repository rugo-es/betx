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
      console.log(response)
      $('#datatable').DataTable({
        data: response,
        columns: [
          { data: 'name', render: function(data, type, row){ return '<a href="/app/teams?team='+row.id+'">'+data+'</a>'} }
        ]
      });
    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })
}

function loadTeamPage(team){

  $("#team-container").show();

  am4core.ready(function() {
      
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dark);

    let token = localStorage.getItem('token')
    loadTeamInfo(team, token)
    loadStatsTeams(team, token)
    loadStatsTeamsStreaks(team, token)
    // setTimeout(function(){ loadMatches(team, token) }, 2000);

  })
    

}

function loadTeamInfo(team, token){

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

function loadStatsTeams(team, token){

  var settings = {
    "url": "/api/statsTeams/"+team,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };
  $.ajax(settings)
    .done(function (response) {
      let chartData = [{
        result: "win",
        value: response.wins
      }, {
        result: "tie",
        value: response.ties
      }, {
        result: "loss",
        value: response.losses
      }]
      // Pie chart
      let piechart = am4core.create("pie-chart", am4charts.PieChart);
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
        am4core.color("#7ddc67"),
        am4core.color("#dcd267"),
        am4core.color("#dc6967")
      ];

      let label = piechart.seriesContainer.createChild(am4core.Label);
      label.textAlign = "middle";
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.adapter.add("text", function(text, target){
        return "[bold font-size:30px]" + pieSeries.dataItem.values.value.sum + "[/]\n[font-size:18px]matches[/]";
      })

      // Pie chart 2
      let piechart2 = am4core.create("pie-chart-2", am4charts.PieChart);
      piechart2.hiddenState.properties.opacity = 0;

      piechart2.data = chartData;

      let series = piechart2.series.push(new am4charts.PieSeries());
      series.dataFields.value = "value";
      series.dataFields.radiusValue = "value";
      series.dataFields.category = "result";
      series.slices.template.cornerRadius = 6;

      series.colors.list = [
        am4core.color("#7ddc67"),
        am4core.color("#dcd267"),
        am4core.color("#dc6967")
      ];

      series.hiddenState.properties.endAngle = -90;
      piechart2.legend = new am4charts.Legend();

    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })

}

function loadStatsTeamsStreaks(team, token){

  var settings = {
    "url": "/api/statsTeamsStreaks/"+team,
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

    })
    .fail( function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    })

}

function loadMatches(team, token){

      var settings = {
        "url": "/api/matches/team/"+team,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": token
        }
      }
      $.ajax(settings)
        .done(function (response) {

          let chartMatches = []
          
          let season_check = 0
          let ties_streak = 1
          let value
          let diferent_seasons = []
          for(let i = 0; i < response.length; i++){
            
            if(diferent_seasons.indexOf(response[i].seasonId) < 0){
              diferent_seasons.push(response[i].seasonId)
            }

            if(response[i].seasonId != season_check){
              season_check = response[i].seasonId
              ties_streak = 1
            }

            
            /*
            if(ties_streak > 1){ value = ties_streak + 5 } 
            if(ties_streak > 10){ value = ties_streak + 20 }
            if(response[i].result == 'X'){ value = 0 }
            */
            value = ties_streak
            if(response[i].result == 'X'){
              value = 30
            }
            chartMatches.push({
              id: response[i].id,
              league: response[i].league.name,
              season: response[i].season.name,
              journey: response[i].journey,
              local: response[i].local.name,
              local_goals: response[i].local_goals,
              visitor: response[i].visitor.name,
              visitor_goals: response[i].visitor_goals,
              result: response[i].result,
              ties_streak: ties_streak,
              heatmap_value: value
            })
            if(response[i].result == 'X'){
              ties_streak = 1
            }else{
              ties_streak++
            }
            
          }

          console.log(chartMatches)

          $("#heatmap").css('height', 100+(diferent_seasons.length * 31) + 'px')

          // heatmap
          var chart = am4core.create("heatmap", am4charts.XYChart);
          chart.maskBullets = false;
          
          var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
          
          xAxis.dataFields.category = "journey";
          yAxis.dataFields.category = "season";
          
          xAxis.renderer.grid.template.disabled = true;
          xAxis.renderer.minGridDistance = 40;
          
          yAxis.renderer.grid.template.disabled = true;
          yAxis.renderer.inversed = true;
          yAxis.renderer.minGridDistance = 30;
          
          var heatmapseries = chart.series.push(new am4charts.ColumnSeries());
          heatmapseries.dataFields.categoryX = "journey";
          heatmapseries.dataFields.categoryY = "season";
          heatmapseries.dataFields.value = "heatmap_value";
          heatmapseries.sequencedInterpolation = true;
          heatmapseries.defaultState.transitionDuration = 3000;

          var bgColor = new am4core.InterfaceColorSet().getFor("background");
          var columnTemplate = heatmapseries.columns.template;
          columnTemplate.strokeWidth = 1;
          columnTemplate.strokeOpacity = 0.2;
          columnTemplate.stroke = bgColor;
          columnTemplate.tooltipText = "{journey} | {local} {local_goals} - {visitor_goals} {visitor} | {ties_streak} {heatmap_value} ";
          columnTemplate.width = am4core.percent(100);
          columnTemplate.height = am4core.percent(100);

          heatmapseries.heatRules.push({
            target: columnTemplate,
            property: "fill",
            min: am4core.color(bgColor),
            max: chart.colors.getIndex(0)
          });
          // heat legend
          var heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
          heatLegend.width = am4core.percent(100);
          heatLegend.series = heatmapseries;
          heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
          heatLegend.valueAxis.renderer.minGridDistance = 30;
          
          // heat legend behavior
          heatmapseries.columns.template.events.on("over", function(event) {
            handleHover(event.target);
          })
          
          heatmapseries.columns.template.events.on("hit", function(event) {
            handleHover(event.target);
          })
          
          function handleHover(column) {
            if (!isNaN(column.dataItem.value)) {
              heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
            }
            else {
              heatLegend.valueAxis.hideTooltip();
            }
          }
          
          heatmapseries.columns.template.events.on("out", function(event) {
            heatLegend.valueAxis.hideTooltip();
          })
          chart.data = chartMatches   


        })
        .fail( function(jqXHR, textStatus, errorThrown){
          console.log(errorThrown)
        })

}