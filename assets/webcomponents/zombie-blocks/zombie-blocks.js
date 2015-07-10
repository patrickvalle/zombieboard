(function(Polymer, Masonry) {

  Polymer({

    is: 'zombie-blocks',

    ready: function() {
      // Initialize Masonry
      var blocks = document.querySelector('.blocks');
      var masonry = new Masonry(blocks, {
        columnWidth: 145,
        gutter: 10,
        itemSelector: '.block'
      });
    }
  });

}(window.Polymer, window.Masonry));