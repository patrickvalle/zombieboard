(function(Polymer) {

  Polymer({

    is: 'zombie-block-feed',

    behaviors: [ZombieBlockBehavior],

    properties: {
      url: {
        type: String
      },
      refreshEvery: {
        type: Number,
        value: 600000 // 10 minutes
      },
      feedResult: {
        type: Object,
        observer: 'feedResultChanged'
      }
    },

    ready: function() {
      var _this = this;
      setInterval(function() {
        _this.$$('google-feeds').feed = _this.$$('google-feeds').feed + '?';
      }, _this.refreshEvery);
    },

    feedResultChanged: function() {
      var unescape = function(input) {
        return input
            .split('&amp;').join('&')
            .split('&lt;').join('<')
            .split('&gt;').join('>')
            .split('&quot;').join('"')
            .split('&#039;').join("'")
            .split('&#39;').join("'");
      };
      if(this.feedResult && this.feedResult.entries && this.feedResult.entries.length > 0) {
        var entry = this.feedResult.entries[0];
        this.title = unescape(entry.title);
        this.link = entry.link;
        this.show();
      }
      else {
        this.hide();
      }
    }
    
  });

}(window.Polymer));