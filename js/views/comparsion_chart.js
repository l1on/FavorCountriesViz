App.Views.ComparisonChart = function() {
  this.chart = AmCharts.makeChart("chartdiv", {
    "type": "radar",
    "theme": "light",
    "addClassNames": true,
    "fontSize": 15,
    "dataProvider": [{
      "country": "Czech Republic",
      "litres": 156.9,
      "color": "#67b7dc"
    }, {
      "country": "Ireland",
      "litres": 131.1,
      "color": "#fdd400"
    }, {
      "country": "Germany",
      "litres": 115.8,
      "color": "#84b761"
    }, {
      "country": "Australia",
      "litres": 109.9,
      "color": "#cc4748"
    }, {
      "country": "Austria",
      "litres": 108.3,
      "color": "#cd82ad"
    }, {
      "country": "UK",
      "litres": 99,
      "color": "#2f4074"
    }],
    "valueAxes": [{
      "axisTitleOffset": 20,
      "minimum": 0,
      "axisAlpha": 0.15
    }],
    "startDuration": 2,
    "graphs": [{
      "balloonText": "[[value]] litres of beer per year",
      "bullet": "round",
      "valueField": "litres"
    }],
    "categoryField": "country",
    "listeners": [{
      "event": "rendered",
      "method": this.afterRender
    }, {
      "event": "resized",
      "method": this.afterResize
    }]
  });
}

App.Views.ComparisonChart.prototype.afterRender = function() {
  $('a[href^="http://www.amcharts.com/"]').remove();
}

App.Views.ComparisonChart.prototype.afterResize = function() {
  $('a[href^="http://www.amcharts.com/"]').remove();
}