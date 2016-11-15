App.Models.DataRetriever = function() {
	
}

App.Models.DataRetriever.prototype.getCountryIndicators = function (countryCode) {
	return {
		"air-pollution": App.counter++,//getRandomArbitrary(4,4,70.1),
		"internet-affordability": App.counter++,//getRandomArbitrary(3,1597),
		"meritocracy": App.counter++,//getRandomArbitrary(5,53),
		"health-expenditure": App.counter++,//getRandomArbitrary(0.1, 76.4),
		"intellectual-capacity": App.counter++,//getRandomArbitrary(6,8255),
		"migration": App.counter++,//getRandomArbitrary(0.4, 89.2)
	}
}