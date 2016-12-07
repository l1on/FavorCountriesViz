App.Models.IndicatorStore = function() {
	this.data = webStorage.createInstance({
    	name: 'indicators'
	});		

	this.save();
}

App.Models.IndicatorStore.prototype.save = function() {
	AmCharts.maps.worldLow.svg.g.path.forEach(function(country){

		var countryTitle = country.title;
		if(WORLD_INDICATORS[countryTitle]) {
			this.data.setItem(country.id, {
				"air-pollution": WORLD_INDICATORS[countryTitle]["air-pollution"],
				"internet-affordability": WORLD_INDICATORS[countryTitle]["internet-affordability"],
				"meritocracy": WORLD_INDICATORS[countryTitle]["meritocracy"],
				"health-expenditure": WORLD_INDICATORS[countryTitle]["health-expenditure"],
				"intellectual-capacity": WORLD_INDICATORS[countryTitle]["intellectual-capacity"],
				"migration": WORLD_INDICATORS[countryTitle]["migration"]
			}); 			
		}

	}, this);	
}