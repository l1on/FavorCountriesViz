App.Controller = {};



App.Controller = function () {
	this.indexGenerator = new App.Models.IndexGenerator();
	this.indicatorStore = new App.Models.IndicatorStore();
	this.map = new App.Views.Map();
	this.comparisonChart = new App.Views.ComparisonChart();
}

App.Controller.prototype.init = function() {
	this.setupKnobs();

	this.indexGenerator.generateIndices(this.indicatorStore);
	this.drawMap();
}

App.Controller.prototype.drawMap = function () {
	this.map.draw(this.indexGenerator.indexStore, this.indicatorStore.data);
}

App.Controller.prototype.setupKnobs = function () {
	var self = this;

	$('.knob-group').on('slide', "input", function(event){
		var weighVal = event.value;
		var weight = event.currentTarget.id.match(/(\w+)-/)[1];
		
		self.indexGenerator.setWeight(weight, weighVal);
		
		self.indexGenerator.generateIndices(self.indicatorStore);
		self.drawMap();
	});
}

$(function() {
  	(new App.Controller()).init();
});
