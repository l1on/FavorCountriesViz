App.Controller = {};

App.Controller = function () {
	this.dataGenerator = new App.Models.DataGenerator();
	this.dataRetriever = new App.Models.DataRetriever();
	this.map = new App.Views.Map();
}

App.Controller.prototype.init = function() {
	this.setupKnobs();
	this.drawMap();
}

App.Controller.prototype.drawMap = function () {
	this.map.draw(this.dataGenerator.generateData(this.dataRetriever));
}

App.Controller.prototype.setupKnobs = function () {
	var self = this;

	$('.knob-group').on("click", "label.btn", function() {
		var knob = $("[type=radio]", this);
		var weight = knob.attr('name').match(/(\w+)-/)[1];
		
		switch(knob.attr('id')) {
			case '0':
				self.dataGenerator.ignoreWeight(weight);
				break;
			case '1':
				self.dataGenerator.considerWeight(weight);
				break;
			case '2':
				self.dataGenerator.emphasizeWeight(weight);
				break;
		}
		
		self.drawMap();
	});	
}

$(function() {
  	(new App.Controller()).init();
});
