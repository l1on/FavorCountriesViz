App.countryColors = AmCharts.maps.worldLow.svg.g.path.map(function(country){
	return {
		"id": country.id,
		"color": "rgb(0," + App.Conversion.getCountryColorValue(country.id) + ",0)"
	};
});