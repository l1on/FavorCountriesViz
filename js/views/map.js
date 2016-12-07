App.Views.Map = function() {
  this.map = AmCharts.makeChart("mapdiv", {
    /**
     * this tells amCharts it's a map
     */
    "type": "map",

    /**
     * create data provider object
     * map property is usually the same as the name of the map file.
     * getAreasFromMap indicates that amMap should read all the areas available
     * in the map data and treat them as they are included in your data provider.
     * in case you don't set it to true, all the areas except listed in data
     * provider will be treated as unlisted.
     */
    "dataProvider": {
      "map": "worldLow",
      //"getAreasFromMap": true,

      //"descriptionWindowTop": 0
    },

    /**
     * create areas settings
     * autoZoom set to true means that the map will zoom-in when clicked on the area
     * selectedColor indicates color of the clicked area.
     */
    "areasSettings": {
      "autoZoom": true,
      "selectedColor": "#5EB7DE",
      //"color": "rgb(0,0,255)", // blue -> green
      //"colorSolid": "rgb(0,255,0)", // blue -> green

      //"color": "rgb(255,0,0)", // red -> blue
      //"colorSolid": "rgb(0,0,255)",// red -> blue

      //"color": "rgb(0,0,64)", // dark -> green
      //"colorSolid": "rgb(0,255,64)",// dark -> green

      "color": "rgb(255,0,0)", // red -> green
      "colorSolid": "rgb(0,255,0)",// red -> green

      //"color": "rgb(255,255,255)", // white -> green
      //"colorSolid": "rgb(0,255,0)",// white -> green
    },

    "valueLegend": {
      "showAsGradient": true,
      "minValue": "least desirable",
      "maxValue": "most desirable"
    },

  });

}

App.Views.Map.prototype.draw = function(countryIndices, countryIndicators) {
  var self = this;

  self.map.dataProvider.areas = [];
  countryIndices.iterate(function(countryId, value){
    var indicators = countryIndicators.getItem(countryId);

    self.map.dataProvider.areas.push({
      "id": countryId,
      //"color": "rgba(0, " + self.scaleIndexToRGB(value.index) + ", " + (255 - self.scaleIndexToRGB(value.index)) + ", 1)", // blue -> green
      //"color": "rgba(" + (255 - self.scaleIndexToRGB(value.index)) + ", 0, " + self.scaleIndexToRGB(value.index) + ", 1)", // red - > blue
      //"color": "rgba(0," + self.scaleIndexToRGB(value.index) + ",64, 1)", // dark -> green
      "color": "rgba(" + (255 - self.scaleIndexToRGB(value.index)) + "," + self.scaleIndexToRGB(value.index) + ",0, 1)", // red -> green
      //"color": "rgba(" + (255 - self.scaleIndexToRGB(value.index)) + ", 255," + (255 - self.scaleIndexToRGB(value.index)) + ", 1)", // white -> green
      "description":  "<p><abbr title='micrograms per cubic meter of daily exposure, 2015'>Ambient PM2.5 Air Pollution</abbr>: " + self.decimalOrNull(indicators["air-pollution"], 1) + "</p>" + 
                      "<p><abbr title='USD per month, 2013'>Internet Affordability</abbr>: " + self.decimalOrNull(indicators["internet-affordability"], 0) + "</p>" +
                      "<p><abbr title='% of total, 2002-2014'>Female Legislators, Senior Officials, and Managers</abbr>: " + self.decimalOrNull(indicators["meritocracy"], 0) + "</p>" +
                      "<p><abbr title='% of total, 2014'>Out of Pocket Health Expenditure</abbr>: " + self.decimalOrNull(indicators["health-expenditure"], 1) + "</p>" +
                      "<p><abbr title='full-time equivalent per million people, 2005-2015'>Researchers</abbr>: " + self.decimalOrNull(indicators["intellectual-capacity"], 0) + "</p>" +
                      "<p><abbr title='% of tertiary educated population age 25+, 2000'>Emigration rate of tertiary educated to OECD countries </abbr>: " + self.decimalOrNull(indicators["migration"], 1) + "</p>",
      "descriptionWindowRight": 15,
      "descriptionWindowTop": 5,
    });
  });

  var prevZoomLvl = this.map.zoomLevel();
  var prevZoomX = this.map.zoomX();
  var prevZoomY = this.map.zoomY();
  
  this.map.validateData();
  $('a[href^="http://www.amcharts.com/"]').remove();

  this.map.zoomTo(prevZoomLvl, prevZoomX, prevZoomY, true); 
};

App.Views.Map.prototype.scaleIndexToRGB = function(value) {
  return Math.round(value * 255 / 99);
}

App.Views.Map.prototype.decimalOrNull = function(value, decimal) {
  if (value == null) return "NO DATA";
  
  return value.toFixed(decimal);
  
}

