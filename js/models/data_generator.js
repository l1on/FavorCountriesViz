App.Models.DataGenerator = function() {
	this.pollutionWeight = 100;
	this.internetWeight = 100;
	this.meritocracyWeight = 100;
	this.healthWeight = 100;
	this.intelWeight = 100;
	this.migrationWeight = 100;	
}

App.Models.DataGenerator.prototype.getCountryIndex = function (countryCode, dataRetriever) {
	var k = this.mapIndicatorsToIndex(dataRetriever.getCountryIndicators(countryCode));
	
	//console.log(countryCode + ": " + k);
	
	return k;
}

App.Models.DataGenerator.prototype.mapIndicatorsToIndex = function (indicators) {
	var pollutionIndex = this.scalePollutionToIndex(indicators["air-pollution"]);
	var internetCostIndex = this.scaleInternetCostToIndex(indicators["internet-affordability"]);
	var meritocracyIndex = this.scaleMeritocracyToIndex(indicators["meritocracy"]);
	var healthCostIndex = this.scaleHealthCostToIndex(indicators["health-expenditure"]);
	var intellectualCapacityIndex = this.scaleIntellectualCapacityToIndex(indicators["intellectual-capacity"]);
	var migrationIndex = this.scaleMigrationToIndex(indicators["migration"]);

	return this.getWeightedAvg(pollutionIndex, internetCostIndex, meritocracyIndex, healthCostIndex, intellectualCapacityIndex, migrationIndex);
}

App.Models.DataGenerator.prototype.scalePollutionToIndex = function (pollutionValue) {
	var min = 15.6 // high income avg
	var max = 54.4 // China avg
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(pollutionValue, min, max);
}

App.Models.DataGenerator.prototype.scaleInternetCostToIndex = function (internetCost) {
	var min = 27 // high income avg
	var max = 45 // low income avg
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(internetCost, min, max);
}

App.Models.DataGenerator.prototype.scaleMeritocracyToIndex = function (meritocracy) {
	var min = 5 //raw lowest num
	var max = 53 // raw highest num
	
	return this.scaleToIndex(meritocracy, min, max);
}

App.Models.DataGenerator.prototype.scaleHealthCostToIndex = function (healthCost) {
	var min = 13.3 // high income avg
	var max = 55.7 // lower middle income avg
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(healthCost, min, max);
}

App.Models.DataGenerator.prototype.scaleIntellectualCapacityToIndex = function (intelCap) {
	var min = 156 // south asia
	var max = 4080 // north america
	
	return this.scaleToIndex(intelCap, min, max);
}

App.Models.DataGenerator.prototype.scaleMigrationToIndex = function (migration) {
	var min = 3.9 // high income avg
	var max = 19.2 // low income avg
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(migration, min, max);
}

App.Models.DataGenerator.prototype.scaleToIndex = function(value, min, max) {
	var index = (value - min) * 99 / (max - min);
	
	// Adjustments to make given some countries' data will be out of the choosen [min, max] range
	if (index < 0) index = 0;
	if (index > 99) index = 99;
	
	return index;
}

App.Models.DataGenerator.prototype.getWeightedAvg = function(pollutionIndex, internetCostIndex, meritocracyIndex, healthCostIndex, intellectualCapacityIndex, migrationIndex) {
	return (
		pollutionIndex * this.pollutionWeight + 
		internetCostIndex * this.internetWeight +
		meritocracyIndex * this.meritocracyWeight + 
		healthCostIndex * this.healthWeight +
		intellectualCapacityIndex * this.intelWeight +
		migrationIndex * this.migrationWeight
		) / (
		this.pollutionWeight + 
		this.internetWeight + 
		this.meritocracyWeight + 
		this.healthWeight +
		this.intelWeight +
		this.migrationWeight
	);
}

App.Models.DataGenerator.prototype.generateData = function(dataRetriever) {
	return AmCharts.maps.worldLow.svg.g.path.map(function(country){
		return {
			"id": country.id,
			"index": this.getCountryIndex(country.id, dataRetriever)
		};
	}, this);
}

App.Models.DataGenerator.prototype.setWeight = function(weight, value) {
	this[weight + "Weight"] = value;
}