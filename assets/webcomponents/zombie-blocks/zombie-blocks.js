(function(Polymer, Masonry) {

  Polymer({

    is: 'zombie-blocks',

    ready: function() {
      this.initializeMasonry();
      this.registerLayoutListener();
    },

    initializeMasonry: function() {
      var blocks = document.querySelector('.blocks');
      var masonry = new Masonry(blocks, {
        columnWidth: 145,
        gutter: 10,
        itemSelector: '.block'
      });
      this.masonry = masonry;
    },

    registerLayoutListener: function() {
      var _this = this;
      document.addEventListener(ZombieConfig.events.blocks.layout, function() {
        _this.masonry.layout();
      });
    }

  });

}(window.Polymer, window.Masonry));