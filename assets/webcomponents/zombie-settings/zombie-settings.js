(function(Polymer) {

  Polymer({

    is: 'zombie-settings',

    properties: {
      wundergroundApiKey: {
        type: String,
        value: ZombieConfig.keys.wunderground
      }
    },

    ready: function() {
      // Register a listener for the toggle event
      this.registerToggleEventListener();
    },

    /**
     * Registers a listener for the event that toggles the display of the settings pane
     */
    registerToggleEventListener: function() {
      var _this = this;
      document.addEventListener(ZombieConfig.events.settings.toggle, function() {
        _this.shown = !_this.shown;
        _this.toggleClass('shown', _this.shown);
      });
    },

    /**
     * Invoked when the save button is clicked 
     */
    onSave: function() {
      var wundergroundApikey = document.querySelector('input[name=wundergroundapikey]').value;
      this.persistWundergroundApiKey(wundergroundApikey);
      this.fire(ZombieConfig.events.settings.toggle);
    },

    /**
     * Invoked when the cancel button is clicked 
     */
    onClose: function() {
      this.fire(ZombieConfig.events.settings.toggle);
    },

    /**
     * Persists the supplied Weather Underground API key to the config
     * and to the local storage. Once complete, an event is fired notifying
     * any listeners that the key has been updated.
     */
    persistWundergroundApiKey: function(key) {
      localStorage.setItem('WUNDERGROUND_API_KEY', key);
      ZombieConfig.keys.wunderground = key;
      this.fire(ZombieConfig.events.settings.wunderground);
    }

  });
  
}(window.Polymer));