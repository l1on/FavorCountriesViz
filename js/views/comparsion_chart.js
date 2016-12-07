App.Views.ComparisonChart = function() {
  this.colorConfigs = [{
    backgroundColor: "rgba(255,99,132,0.2)",
    borderColor: "rgba(255,99,132,1)",
    pointBackgroundColor: "rgba(255,99,132,1)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(255,99,132,1)",
  },{
    backgroundColor: "rgba(75, 192, 192,0.2)",
    borderColor: "rgba(75, 192, 192,1)",
    pointBackgroundColor: "rgba(75, 192, 192,1)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(75, 192, 192,1)",
  },{
    backgroundColor: "rgba(255, 206, 86,0.2)",
    borderColor: "rgba(255, 206, 86,1)",
    pointBackgroundColor: "rgba(255, 206, 86,1)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(255, 206, 86,1)",
  },{
    backgroundColor: "rgba(179,181,198,0.2)",
    borderColor: "rgba(179,181,198,1)",
    pointBackgroundColor: "rgba(179,181,198,1)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(179,181,198,1)",
  }];

  this.chart = new Chart("comparison_chart", {
    type: 'radar',
    data: {
      labels: ["low cost internet", "intellectual retention", "intellectual capacity", "low cost healthcare", "air quality",  "meritocracy"],
    },
    options: {
      title: {
        display: true,
        text: 'Desirable Indicators'
      },
      scale: {
        ticks: {
            beginAtZero: true
        }
      },
    }
  });
}

App.Views.ComparisonChart.prototype.update = function(countries, indice) {
    this.chart.data.datasets = [];

    indice.forEach(function(index, i){
      this.chart.data.datasets[i] = {};
      this.chart.data.datasets[i].label = countries[i] + " " + index["index"].toFixed(0);
      
      this.chart.data.datasets[i].backgroundColor = this.colorConfigs[i]["backgroundColor"];
      this.chart.data.datasets[i].borderColor = this.colorConfigs[i]["borderColor"];
      this.chart.data.datasets[i].pointBackgroundColor = this.colorConfigs[i]["pointBackgroundColor"];
      this.chart.data.datasets[i].pointBorderColor = this.colorConfigs[i]["pointBorderColor"];
      this.chart.data.datasets[i].pointHoverBackgroundColor = this.colorConfigs[i]["pointHoverBackgroundColor"];
      this.chart.data.datasets[i].pointHoverBorderColor = this.colorConfigs[i]["pointHoverBorderColor"];
      
      this.chart.data.datasets[i].data = [index["indexInternet"].toFixed(0), index["indexMigration"].toFixed(0), index["indexIntel"].toFixed(0), index["indexHealth"].toFixed(0), index["indexAir"].toFixed(0), index["indexMeritocracy"].toFixed(0)];    
    }, this);
 
    this.chart.update();
}