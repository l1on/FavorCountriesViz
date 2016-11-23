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
      "getAreasFromMap": true,

      //"descriptionWindowTop": 0
    },

    /**
     * create areas settings
     * autoZoom set to true means that the map will zoom-in when clicked on the area
     * selectedColor indicates color of the clicked area.
     */
    "areasSettings": {
      "autoZoom": true,
      "selectedColor": "#CC0000",
      "color": "rgb(0,0,64)",
      "colorSolid": "rgb(0,255,64)"
    },

    "valueLegend": {
      "showAsGradient": true,
      "minValue": "least desirable",
      "maxValue": "most desirable"
    },

  });

}

App.Views.Map.prototype.draw = function(countryIndices) {
  var self = this;

  self.map.dataProvider.areas = [];
  countryIndices.iterate(function(key, value){
    self.map.dataProvider.areas.push({
      "id": key,
      "color": "rgb(0," + self.scaleIndexToRGB(value.index) + ",64)",
      "description": "dfasfd",
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

