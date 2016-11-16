App.Models.DataRetriever = function() {
	
}

App.Models.DataRetriever.prototype.getCountryIndicators = function (countryCode) {
	return {
		"air-pollution": getRandomArbitrary(4,70.1),
		"internet-affordability": getRandomArbitrary(3,1597),
		"meritocracy": getRandomArbitrary(5,53),
		"health-expenditure": getRandomArbitrary(0.1, 76.4),
		"intellectual-capacity": getRandomArbitrary(6,8255),
		"migration": getRandomArbitrary(0.4, 89.2)
	}
}