(function() {

  // Polymer definition
  Polymer({
    is: 'zombie-block-stock',
    behaviors: [ZombieBlockBehavior],
    properties: {
      symbol: { 
        type: String
      },
      refreshEvery: {
        type: Number,
        value: 60000
      },
      ajaxUrl: {
        type: String,
        computed: 'computeAjaxUrl(symbol)',
      },
      googleFinanceUrl: {
        type: String,
        computed: 'computeGoogleFinanceUrl(symbol)',
      }
    },
    ready: function() {
      var ironAjax = this.$$('iron-ajax');
      setInterval(function() {
        ironAjax.generateRequest();
      }, this.refreshEvery);
    },
    computeAjaxUrl: function(symbol) {
      var url = false;
      if(symbol) {
        url = 'https://www.google.com/finance?q=' + symbol;
      }
      return url;
    },
    computeGoogleFinanceUrl: function(symbol) {
      var url = '';
      if(symbol) {
        url = 'https://www.google.com/finance?q=' + symbol;
      }
      return url;
    },
    onAjaxResponse: function(event, data) {
      this.display = true;
      // Get the price
      var price = data.response.querySelector('#price-panel .pr > span').innerHTML;
      // Get the change in dollars and percent
      var changeElements = data.response.querySelectorAll('#price-panel .ch > span');
      var dollarChange = changeElements[0].innerHTML;
      var percentChange = changeElements[1].innerHTML;
      // Set data on model
      this.stock = {
        price: price,
        icon: (dollarChange.charAt(0) === '-') ? 'trending-down' : 'trending-up',
        change: {
          dollar: dollarChange,
          percent: percentChange
        }
      };
    }
  });

}());