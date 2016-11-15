App.Controller = {};

App.Controller = function () {
	this.dataGenerator = new App.Models.DataGenerator();
	this.dataRetriever = new App.Models.DataRetriever();
}

App.Controller.prototype.init = function() {
	App.Views.Map.dataProvider.areas = this.dataGenerator.generateData(this.dataRetriever);
	App.Views.Map.validateData();	
}

var app = new App.Controller();
app.init();