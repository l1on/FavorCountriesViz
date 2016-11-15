App.Models.DataGeneration.pollutionWeight = 1;
App.Models.DataGeneration.internetWeight = 1;
App.Models.DataGeneration.meritocracyWeight = 1;
App.Models.DataGeneration.healthWeight = 1;
App.Models.DataGeneration.intelWeight = 1;
App.Models.DataGeneration.migrationWeight = 1;

App.Models.DataGeneration.getCountryColorValue = function (countryCode) {

	var k = App.Models.DataGeneration.mapIndicatorsToColorValue(App.Models.DataRetrieve.getCountryIndicators(countryCode));
	console.log(countryCode + ": " + k);
	return k;
}

App.Models.DataGeneration.mapIndicatorsToColorValue = function (indicators) {
	//return getRandomIntInclusive(0,255);
	var pollutionColorValue = App.Models.DataGeneration.scalePollutionToColorValue(indicators["air-pollution"]);
	var internetCostColorValue = App.Models.DataGeneration.scaleInternetCostToColorValue(indicators["internet-affordability"]);
	var meritocracyColorValue = App.Models.DataGeneration.scaleMeritocracyToColorValue(indicators["meritocracy"]);
	var healthCostColorValue = App.Models.DataGeneration.scaleHealthCostToColorValue(indicators["health-expenditure"]);
	var intellectualCapacityColorValue = App.Models.DataGeneration.scaleIntellectualCapacityToColorValue(indicators["intellectual-capacity"]);
	var migrationColorValue = App.Models.DataGeneration.scaleMigrationToColorValue(indicators["migration"]);

	return App.Models.DataGeneration.getWeightedAvg(pollutionColorValue, internetCostColorValue, meritocracyColorValue, healthCostColorValue, intellectualCapacityColorValue, migrationColorValue);
}

App.Models.DataGeneration.scalePollutionToColorValue = function (pollutionValue) {
	var min = 15.6 // high income avg
	var max = 54.4 // China avg
	
	// Reverse because the lower, the better
	return 255 - App.Models.DataGeneration.scaleToRgbRange(pollutionValue, min, max);
}

App.Models.DataGeneration.scaleInternetCostToColorValue = function (internetCost) {
	var min = 27 // high income avg
	var max = 45 // low income avg
	
	// Reverse because the lower, the better
	return 255 - App.Models.DataGeneration.scaleToRgbRange(internetCost, min, max);
}

App.Models.DataGeneration.scaleMeritocracyToColorValue = function (meritocracy) {
	var min = 5 //raw lowest num
	var max = 53 // raw highest num
	
	return App.Models.DataGeneration.scaleToRgbRange(meritocracy, min, max);
}

App.Models.DataGeneration.scaleHealthCostToColorValue = function (healthCost) {
	var min = 13.3 // high income avg
	var max = 55.7 // lower middle income avg
	
	// Reverse because the lower, the better
	return 255 - App.Models.DataGeneration.scaleToRgbRange(healthCost, min, max);
}

App.Models.DataGeneration.scaleIntellectualCapacityToColorValue = function (intelCap) {
	var min = 156 // south asia
	var max = 4080 // north america
	
	return App.Models.DataGeneration.scaleToRgbRange(intelCap, min, max);
}

App.Models.DataGeneration.scaleMigrationToColorValue = function (migration) {
	var min = 3.9 // high income avg
	var max = 19.2 // low income avg
	
	// Reverse because the lower, the better
	return 255 - App.Models.DataGeneration.scaleToRgbRange(migration, min, max);
}

App.Models.DataGeneration.scaleToRgbRange = function(value, min, max) {
	var rgbValue = (value - min) * 255 / (max - min);
	
	// Adjustments to make given some countries' data will be out of the choosen [min, max] range
	if (rgbValue < 0) rgbValue = 0;
	if (rgbValue > 255) rgbValue = 255;
	
	return rgbValue;
}

App.Models.DataGeneration.getWeightedAvg = function(pollutionColorValue, internetCostColorValue, meritocracyColorValue, healthCostColorValue, intellectualCapacityColorValue, migrationColorValue) {
	return Math.round((
		pollutionColorValue * App.Models.DataGeneration.pollutionWeight + 
		internetCostColorValue * App.Models.DataGeneration.internetWeight +
		meritocracyColorValue * App.Models.DataGeneration.meritocracyWeight + 
		healthCostColorValue * App.Models.DataGeneration.healthWeight +
		intellectualCapacityColorValue * App.Models.DataGeneration.intelWeight +
		migrationColorValue * App.Models.DataGeneration.migrationWeight
		) / (
		App.Models.DataGeneration.pollutionWeight + 
		App.Models.DataGeneration.internetWeight + 
		App.Models.DataGeneration.meritocracyWeight + 
		App.Models.DataGeneration.healthWeight +
		App.Models.DataGeneration.intelWeight +
		App.Models.DataGeneration.migrationWeight
	)); 
}

App.Models.DataGeneration.generateData = function() {
	App.counter = 0;
	return AmCharts.maps.worldLow.svg.g.path.map(function(country){
		return {
			"id": country.id,
			"color": "rgb(0," + App.Models.DataGeneration.getCountryColorValue(country.id) + ",0)"
		};
	});
}