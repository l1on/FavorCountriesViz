App.Conversion = {};

App.Conversion.getCountryColorValue = function (countryCode) {
	return App.Conversion.mapIndicatorsToColorValue(App.Retrieve.getCountryIndicators(countryCode));
}

App.Conversion.mapIndicatorsToColorValue = function (indicators) {
	//return getRandomIntInclusive(0,255);
	var pollutionColorValue = App.Conversion.scalePollutionToColorValue(indicators["air-pollution"]);
	var internetCostColorValue = App.Conversion.scaleInternetCostToColorValue(indicators["internet-affordability"]);
	var meritocracyColorValue = App.Conversion.scaleInternetCostToColorValue(indicators["meritocracy"]);
}

App.Conversion.scalePollutionToColorValue = function (pollutionValue) {
	var min = 15.6 // high income avg
	var max = 54.4 // China avg
	
	// Reverse because the lower, the better
	return 255 - App.Conversion.scaleToRgbRange(pollutionValue, min, max);
}

App.Conversion.scaleInternetCostToColorValue = function (internetCost) {
	var min = 27 // high income avg
	var max = 45 // low income avg
	
	// Reverse because the lower, the better
	return 255 - App.Conversion.scaleToRgbRange(internetCost, min, max);
}

App.Conversion.scaleToRgbRange = function(value, min, max) {
	var rgbValue = (value - min) * 255 / (max - min);
	
	// Adjustments to make given some countries' data will be out of the choosen [min, max] range
	if (rgbValue < 0) rgbValue = 0;
	if (rgbValue > 255) rgbValue = 255;
	
	return rgbValue;
}
