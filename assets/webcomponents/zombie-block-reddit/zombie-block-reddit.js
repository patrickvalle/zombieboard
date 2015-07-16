(function(Polymer) {

  Polymer({

    is: 'zombie-block-reddit',

    properties: {
      subreddit: {
        type: String
      },
      refreshEvery: {
        type: Number,
        value: 60000 // 1 minute
      },
      url: {
        type: String,
        computed: 'computeUrl(subreddit)'
      }
    },

    computeUrl: function(subreddit) {
      return 'https://www.reddit.com/r/' + subreddit + '/.rss';
    }
    
  });

}(window.Polymer));