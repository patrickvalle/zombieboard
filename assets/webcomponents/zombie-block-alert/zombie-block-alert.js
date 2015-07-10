(function(Polymer) {

  Polymer({

    is: 'zombie-block-alert',

    behaviors: [ZombieBlockBehavior],

    properties: {
      group: { 
        type: String
      },
      id: { 
        type: String
      },
      refreshEvery: {
        type: Number,
        value: 3600000 // hour
      },
      ajaxUrl: {
        type: String,
        computed: 'computeAjaxUrl(group, id)',
      }
    },

    ready: function() {
      var ironAjax = this.$$('iron-ajax');
      setInterval(function() {
        ironAjax.generateRequest();
      }, this.refreshEvery);
    },

    computeAjaxUrl: function(group, id) {
      var url = false;
      if(group && id) {
        url = 'https://www.google.com/alerts/feeds/' + group + '/' + id;
      }
      return url;
    },

    onAjaxResponse: function(event, data) {
      console.log(data.response);
    }
    
  });

}(window.Polymer));