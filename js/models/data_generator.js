App.Models.DataGenerator = function() {
	this.pollutionWeight = 1;
	this.internetWeight = 1;
	this.meritocracyWeight = 1;
	this.healthWeight = 1;
	this.intelWeight = 1;
	this.migrationWeight = 1;	
}

App.Models.DataGenerator.prototype.getCountryColorValue = function (countryCode, dataRetriever) {
	var k = this.mapIndicatorsToColorValue(dataRetriever.getCountryIndicators(countryCode));
	
	console.log(countryCode + ": " + k);
	
	return k;
}

App.Models.DataGenerator.prototype.mapIndicatorsToColorValue = function (indicators) {
	var pollutionColorValue = this.scalePollutionToColorValue(indicators["air-pollution"]);
	var internetCostColorValue = this.scaleInternetCostToColorValue(indicators["internet-affordability"]);
	var meritocracyColorValue = this.scaleMeritocracyToColorValue(indicators["meritocracy"]);
	var healthCostColorValue = this.scaleHealthCostToColorValue(indicators["health-expenditure"]);
	var intellectualCapacityColorValue = this.scaleIntellectualCapacityToColorValue(indicators["intellectual-capacity"]);
	var migrationColorValue = this.scaleMigrationToColorValue(indicators["migration"]);

	return this.getWeightedAvg(pollutionColorValue, internetCostColorValue, meritocracyColorValue, healthCostColorValue, intellectualCapacityColorValue, migrationColorValue);
}

App.Models.DataGenerator.prototype.scalePollutionToColorValue = function (pollutionValue) {
	var min = 15.6 // high income avg
	var max = 54.4 // China avg
	
	// Reverse because the lower, the better
	return 255 - this.scaleToRgbRange(pollutionValue, min, max);
}

App.Models.DataGenerator.prototype.scaleInternetCostToColorValue = function (internetCost) {
	var min = 27 // high income avg
	var max = 45 // low income avg
	
	// Reverse because the lower, the better
	return 255 - this.scaleToRgbRange(internetCost, min, max);
}

App.Models.DataGenerator.prototype.scaleMeritocracyToColorValue = function (meritocracy) {
	var min = 5 //raw lowest num
	var max = 53 // raw highest num
	
	return this.scaleToRgbRange(meritocracy, min, max);
}

App.Models.DataGenerator.prototype.scaleHealthCostToColorValue = function (healthCost) {
	var min = 13.3 // high income avg
	var max = 55.7 // lower middle income avg
	
	// Reverse because the lower, the better
	return 255 - this.scaleToRgbRange(healthCost, min, max);
}

App.Models.DataGenerator.prototype.scaleIntellectualCapacityToColorValue = function (intelCap) {
	var min = 156 // south asia
	var max = 4080 // north america
	
	return this.scaleToRgbRange(intelCap, min, max);
}

App.Models.DataGenerator.prototype.scaleMigrationToColorValue = function (migration) {
	var min = 3.9 // high income avg
	var max = 19.2 // low income avg
	
	// Reverse because the lower, the better
	return 255 - this.scaleToRgbRange(migration, min, max);
}

App.Models.DataGenerator.prototype.scaleToRgbRange = function(value, min, max) {
	var rgbValue = (value - min) * 255 / (max - min);
	
	// Adjustments to make given some countries' data will be out of the choosen [min, max] range
	if (rgbValue < 0) rgbValue = 0;
	if (rgbValue > 255) rgbValue = 255;
	
	return rgbValue;
}

App.Models.DataGenerator.prototype.getWeightedAvg = function(pollutionColorValue, internetCostColorValue, meritocracyColorValue, healthCostColorValue, intellectualCapacityColorValue, migrationColorValue) {
	return Math.round((
		pollutionColorValue * this.pollutionWeight + 
		internetCostColorValue * this.internetWeight +
		meritocracyColorValue * this.meritocracyWeight + 
		healthCostColorValue * this.healthWeight +
		intellectualCapacityColorValue * this.intelWeight +
		migrationColorValue * this.migrationWeight
		) / (
		this.pollutionWeight + 
		this.internetWeight + 
		this.meritocracyWeight + 
		this.healthWeight +
		this.intelWeight +
		this.migrationWeight
	)); 
}

App.Models.DataGenerator.prototype.generateData = function(dataRetriever) {
	App.counter = 0;
	
	return AmCharts.maps.worldLow.svg.g.path.map(function(country){
		return {
			"id": country.id,
			"color": "rgb(0," + this.getCountryColorValue(country.id, dataRetriever) + ",0)"
		};
	}, this);
}