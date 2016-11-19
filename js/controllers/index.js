App.Controller = {};

App.Controller = function () {
	this.dataGenerator = new App.Models.DataGenerator();
	this.dataRetriever = new App.Models.DataRetriever();
	this.map = new App.Views.Map();
	this.comparisonChart = new App.Views.ComparisonChart();
}

App.Controller.prototype.init = function() {
	this.setupKnobs();
	this.drawMap();
}

App.Controller.prototype.drawMap = function () {
	this.map.draw(this.dataGenerator.generateData(this.dataRetriever));
}

App.i=0;
App.Controller.prototype.setupKnobs = function () {
	var self = this;

	$('.knob-group').on('slide', "input", function(event){
		var weighVal = event.value;
		var weight = event.currentTarget.id.match(/(\w+)-/)[1];
		
		self.dataGenerator.setWeight(weight, weighVal);
		App.i = 0;
		self.drawMap();
	});
}

$(function() {
  	(new App.Controller()).init();
});
