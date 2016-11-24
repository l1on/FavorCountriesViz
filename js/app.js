var App = {};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

App.tempCountryData = webStorage.createInstance({
    name: 'tempData'
});	

AmCharts.maps.worldLow.svg.g.path.forEach(function(country){
	App.tempCountryData.setItem(country.id, {
		"air-pollution": getRandomArbitrary(4,70.1),
		"internet-affordability": getRandomArbitrary(3,1597),
		"meritocracy": getRandomArbitrary(5,53),
		"health-expenditure": getRandomArbitrary(0.1, 76.4),
		"intellectual-capacity": getRandomArbitrary(6,8255),
		"migration": getRandomArbitrary(0.4, 89.2)
	}); 
});