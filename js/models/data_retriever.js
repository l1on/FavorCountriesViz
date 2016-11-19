App.Models.DataRetriever = function() {
	
}

App.Models.DataRetriever.prototype.getCountryIndicators = function (countryCode) {
	return {
		"air-pollution": App.i++,//getRandomArbitrary(4,70.1),
		"internet-affordability": App.i++,//getRandomArbitrary(3,1597),
		"meritocracy": App.i++,//getRandomArbitrary(5,53),
		"health-expenditure": App.i++,//getRandomArbitrary(0.1, 76.4),
		"intellectual-capacity": App.i++,//getRandomArbitrary(6,8255),
		"migration": App.i++//getRandomArbitrary(0.4, 89.2)
	}
}