App.Controller = {};

App.Controller = function () {
	this.indicatorStore = new App.Models.IndicatorStore();
	this.indexGenerator = new App.Models.IndexGenerator();
	this.mapView = new App.Views.Map();
	this.comparisonChart = new App.Views.ComparisonChart();
}

App.Controller.prototype.init = function() {
	this.setupKnobs();
	this.setupMapChartInteraction();

	this.indexGenerator.generateIndividualIndices(this.indicatorStore);
	this.indexGenerator.generateIndices(this.indicatorStore);
	this.drawMap();
	
}

App.Controller.prototype.drawMap = function () {
	this.mapView.draw(this.indexGenerator.indexStore, this.indicatorStore.data);
}

App.Controller.prototype.setupMapChartInteraction = function() {
	this.mapView.map.addListener("clickMapObject", $.proxy((function(event) {
		var titles = [];
		var indice = [];

		if(event.event.altKey) {
			event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
			this.mapView.map.returnInitialColor(event.mapObject);
			
			this.mapView.map.dataProvider.areas.forEach(function(area){
				if (area.showAsSelected) {
					titles.push(area.title);
					indice.push(this.indexGenerator.indexStore.getItem(area.id));
				}
			}, this);
		} else {
			this.mapView.map.dataProvider.areas.forEach(function(area){
				if (area.showAsSelected && area.id != event.mapObject.id) {
					area.showAsSelected = false;
					this.mapView.map.returnInitialColor(area);
				}
			}, this);

			titles.push(event.mapObject.title);
			indice.push(this.indexGenerator.indexStore.getItem(event.mapObject.id));
		}

		this.comparisonChart.update(titles, indice);
	}), this));
};

App.Controller.prototype.setupKnobs = function () {
	var self = this;

	$('.knob-group').on('slide', "input", function(event){
		var weighVal = event.value;
		var weight = event.currentTarget.id.match(/(\w+)-/)[1];
		
		self.indexGenerator.setWeight(weight, weighVal);
		
		self.indexGenerator.generateIndices(self.indicatorStore);
		self.drawMap();

		self.comparisonChart.update([],[]);
	});
}

$(function() {
  	(new App.Controller()).init();
});
