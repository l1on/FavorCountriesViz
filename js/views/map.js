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
      "getAreasFromMap": true
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
    }
  });

}

App.Views.Map.prototype.draw = function(countryData) {
  this.map.dataProvider.areas = countryData.map(function(country){
    return {
      "id": country.id,
      "color": "rgb(0," + this.scaleToRGB(country.index) + ",64)"
    }
  }, this);

  var prevZoomLvl = this.map.zoomLevel();
  var prevZoomX = this.map.zoomX();
  var prevZoomY = this.map.zoomY();
  
  this.map.validateData();
  $('a[href^="http://www.amcharts.com/"]').remove();

  this.map.zoomTo(prevZoomLvl, prevZoomX, prevZoomY, true); 
};

App.Views.Map.prototype.scaleToRGB = function(value) {
  return Math.round(value * 255 / 99);
}

