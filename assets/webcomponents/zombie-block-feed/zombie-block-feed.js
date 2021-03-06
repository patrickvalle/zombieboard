(function(Polymer) {

  Polymer({

    is: 'zombie-block-feed',

    behaviors: [ZombieBlockBehavior],

    properties: {
      url: {
        type: String
      },
      alwaysGrabFirst: {
        type: Boolean,
        value: false
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
        this.resultReturned = true;
        var index = this.alwaysGrabFirst ? 0 : Math.floor(Math.random() * this.feedResult.entries.length);
        var entry = this.feedResult.entries[index];
        this.title = unescape(entry.title);
        this.link = entry.link;
        this.show();
      }
      else if(!this.resultReturned) {
        this.hide();
      }
    }
    
  });

}(window.Polymer));