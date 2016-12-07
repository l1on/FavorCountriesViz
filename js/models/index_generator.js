App.Models.IndexGenerator = function() {
	this.pollutionWeight = 100;
	this.internetWeight = 100;
	this.meritocracyWeight = 100;
	this.healthWeight = 100;
	this.intelWeight = 100;
	this.migrationWeight = 100;

	this.indexStore = webStorage.createInstance({
    	name: 'indices'
	});	
}

App.Models.IndexGenerator.prototype.generateIndividualIndices = function (indicatorStore) {	
	var self = this;

	indicatorStore.data.iterate(function(countryId, indicators){
		self.indexStore.setItem(countryId, {
			"indexInternet": self.scaleInternetCostToIndex(indicators["internet-affordability"]),
			"indexAir": self.scalePollutionToIndex(indicators["air-pollution"]),
			"indexMeritocracy": self.scaleMeritocracyToIndex(indicators["meritocracy"]),
			"indexHealth": self.scaleHealthCostToIndex(indicators["health-expenditure"]),
			"indexIntel": self.scaleIntellectualCapacityToIndex(indicators["intellectual-capacity"]),
			"indexMigration": self.scaleMigrationToIndex(indicators["migration"])
		});
	});
}


App.Models.IndexGenerator.prototype.scalePollutionToIndex = function (pollutionValue) {
	if (pollutionValue == null) return 0;

	// Mean: 25.416
	// SD: 18.269
	// Z = |value - Mean| / SD
	// min = min(data) whose Z is <= 1
	// max = max(data) whose Z is <= 1
	var min = 7.2  
	var max = 43.2
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(pollutionValue, min, max);
}

App.Models.IndexGenerator.prototype.scaleInternetCostToIndex = function (internetCost) {
	if (internetCost == null) return 0;

	// Mean: 56.40
	// SD: 143.53
	// Z = |value - Mean| / SD
	// min = min(data) whose Z is <= 1
	// max = max(data) whose Z is <= 1
	var min = 3 
	var max = 108
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(internetCost, min, max);
}

App.Models.IndexGenerator.prototype.scaleMeritocracyToIndex = function (meritocracy) {
	if (meritocracy == null) return 0;

	// Mean: 30.51
	// SD: 11.47
	// Z = |value - Mean| / SD
	// min = min(data) whose Z is <= 1
	// max = max(data) whose Z is <= 1
	var min = 22
	var max = 40
	
	return this.scaleToIndex(meritocracy, min, max);
}

App.Models.IndexGenerator.prototype.scaleHealthCostToIndex = function (healthCost) {
	if (healthCost == null) return 0;

	// Mean: 30.775
	// SD: 17.659
	// Z = |value - Mean| / SD
	// min = min(data) whose Z is <= 1
	// max = max(data) whose Z is <= 1
	var min = 13.2 
	var max = 48.4
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(healthCost, min, max);
}

App.Models.IndexGenerator.prototype.scaleIntellectualCapacityToIndex = function (intelCap) {
	if (intelCap == null) return 0;

	// Mean: 1676.48
	// SD: 2074.06
	// Z = |value - Mean| / SD
	// min = min(data) whose Z is <= 1
	// max = max(data) whose Z is <= 1
	var min = 6 
	var max = 3732 
	
	return this.scaleToIndex(intelCap, min, max);
}

App.Models.IndexGenerator.prototype.scaleMigrationToIndex = function (migration) {
	if (migration == null) return 0;

	// Mean: 1676.48
	// SD: 2074.06
	// Z = |value - Mean| / SD
	// min = min(data) whose Z is < = 1
	// max = max(data) whose Z is < = 1
	var min = 0.4 
	var max = 42.8
	
	// Reverse because the lower, the better
	return 99 - this.scaleToIndex(migration, min, max);
}

App.Models.IndexGenerator.prototype.scaleToIndex = function(value, min, max) {
	var index = (value - min) * 99 / (max - min);
	
	// Adjustments to make given some countries' data will be out of the choosen [min, max] range
	if (index < 0) index = 0;
	if (index > 99) index = 99;
	
	return index;
}

App.Models.IndexGenerator.prototype.getCountryIndex = function(pollutionIndex, internetCostIndex, meritocracyIndex, healthCostIndex, intellectualCapacityIndex, migrationIndex) {
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

App.Models.IndexGenerator.prototype.generateIndices = function(indicatorStore) {
	var self = this;

	self.indexStore.iterate(function(countryId, value){
		value["index"] = self.getCountryIndex(value["indexAir"], value["indexInternet"], value["indexMeritocracy"], value["indexHealth"], value["indexIntel"], value["indexMigration"]);
		self.indexStore.setItem(countryId, value);
	});
}

App.Models.IndexGenerator.prototype.setWeight = function(weight, value) {
	this[weight + "Weight"] = value;
}