(function(Polymer) {

  // Polymer definition
  Polymer({
    is: 'zombie-toolbar',
    properties: {
    },
    ready: function() {

    },
    onSettingsTap: function() {
    	this.fire(ZombieConfig.events.settings.toggle);
    }
  });

}(window.Polymer));