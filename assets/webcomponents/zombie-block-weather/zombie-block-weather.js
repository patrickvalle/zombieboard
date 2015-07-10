(function(Polymer) {

  Polymer({

    is: 'zombie-block-weather',

    behaviors: [ZombieBlockBehavior],

    properties: {
      zipCode: { 
        type: String
      },
      refreshEvery: {
        type: Number,
        value: 600000
      },
      ajaxUrl: {
        type: String,
        computed: 'computeAjaxUrl(zipCode)',
      },
      wundergroundUrl: {
        type: String,
        computed: 'computeWundergroundUrl(zipCode)',
      }
    },

    created: function() {
      this.setDimensions(2, 2);
    },

    ready: function() {
      this.registerGlobalListeners();
      this.initializeDisplay();
    },

    initializeDisplay: function() {
      if(ZombieConfig.keys.wunderground) {
        this.$$('.content.has-api-key').style.display = 'block';
        this.$$('.content.no-api-key').style.display = 'none';
        var ironAjax = this.$$('iron-ajax');
        if(!this.refreshInterval) {
          this.refreshInterval = setInterval(function() {
            ironAjax.generateRequest();
          }, this.refreshEvery);
        }
      }
      else {
        this.$$('.content.has-api-key').style.display = 'none';
        this.$$('.content.no-api-key').style.display = 'block';
      }
    },

    registerGlobalListeners: function() {
      var _this = this;
      document.addEventListener(ZombieConfig.events.settings.wunderground, function() {
        _this.ajaxUrl = _this.computeAjaxUrl(_this.zipCode);
        _this.$$('iron-ajax').generateRequest();
        _this.initializeDisplay();
      });
    },

    computeAjaxUrl: function(zipCode) {
      var url = false;
      if(ZombieConfig.keys.wunderground && zipCode) {
        url = 'http://api.wunderground.com/api/' + ZombieConfig.keys.wunderground + '/forecast/conditions/q/' + zipCode + '.json';
      }
      return url;
    },

    computeWundergroundUrl: function(zipCode) {
      var url = '';
      if(zipCode) {
        url = 'http://www.wunderground.com/cgi-bin/findweather/getForecast?query=' + zipCode;
      }
      return url;
    },

    onAjaxResponse: function(event, data) {
      if(data && data.response && data.response.forecast && data.response.current_observation) {
        this.display = true;
        var weather = {
          location : data.response.current_observation.display_location.full,
          conditions : data.response.current_observation.weather,
          temperature : Math.round(data.response.current_observation.temp_f),
          icon : ('wi ' + (ICONS[data.response.current_observation.icon] || 'unknown')),
          forecasts: function(responseItems) {
            var returnValues = [];
            for(var i = 0; i < responseItems.length; i++) {
              returnValues.push({
                day: i === 0 ? 'Today' : responseItems[i].date.weekday,
                icon: ('wi ' + (ICONS[responseItems[i].icon] || 'unknown')),
                conditions: responseItems[i].conditions,
                temperature: {
                  high: responseItems[i].high.fahrenheit,
                  low: responseItems[i].low.fahrenheit
                }
              });
            }
            return returnValues;
          }(data.response.forecast.simpleforecast.forecastday)
        };
        this.weather = weather;
      }
    },

    onSettingsClick: function() {
      this.fire(ZombieConfig.events.settings.toggle);
    }

  });
  
  var ICONS = {
    'chancerain': 'wi-day-showers',
    'chancetstorms': 'wi-day-storm-showers',
    'clear': 'wi-day-sunny',
    'cloudy': 'wi-cloudy',
    'mostlycloudy': 'wi-day-cloudy',
    'partlycloudy': 'wi-day-sunny-overcast',
    'rain': 'wi-day-rain',
    'tstorms': 'wi-day-thunderstorm'
  };
  
}(window.Polymer));