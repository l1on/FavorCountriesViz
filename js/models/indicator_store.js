App.Models.IndicatorStore = function() {
	this.data = webStorage.createInstance({
    	name: 'indicators'
	});	

	AmCharts.maps.worldLow.svg.g.path.forEach(function(country){
		var indicators = App.tempCountryData.getItem(country.id);

		this.data.setItem(country.id, {
			"air-pollution": indicators["air-pollution"],
			"internet-affordability": indicators["internet-affordability"],
			"meritocracy": indicators["meritocracy"],
			"health-expenditure": indicators["health-expenditure"],
			"intellectual-capacity": indicators["intellectual-capacity"],
			"migration": indicators["migration"]
		}); 
	}, this);
}