(function(Polymer) {

  Polymer({

    is: 'zombie-toolbar',

    /**
     * Invoked when the settings button is tapped
     */
    onSettingsTap: function() {
      // Fire an event to toggle the settings display
    	this.fire(ZombieConfig.events.settings.toggle);
    }

  });

}(window.Polymer));