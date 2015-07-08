(function(Polymer) {

  // Polymer definition
  Polymer({
    is: 'zombie-settings',
    properties: {
    	wundergroundApiKey: {
    		type: String,
    		value: ZombieConfig.keys.wunderground
    	}
	  },
    ready: function() {
    	this.registerListeners();
    	console.log(ZombieConfig.keys.wunderground);
    },
    registerListeners: function() {
    	var _this = this;
    	document.addEventListener(ZombieConfig.events.settings.toggle, function() {
    		_this.shown = !_this.shown;
    		_this.toggleClass('shown', _this.shown);
    	});
    },
    onSave: function() {
    	var wundergroundApikey = document.querySelector('input[name=wundergroundapikey]').value;
    	this.persistWundergroundApiKey(wundergroundApikey);
    	this.fire(ZombieConfig.events.settings.toggle);
    },
    onClose: function() {
    	this.fire(ZombieConfig.events.settings.toggle);
    },
    persistWundergroundApiKey: function(key) {
    	localStorage.setItem('WUNDERGROUND_API_KEY', key);
    	ZombieConfig.keys.wunderground = key;
    	this.fire(ZombieConfig.events.settings.wunderground);
    }
  });

}(window.Polymer));