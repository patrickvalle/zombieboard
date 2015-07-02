(function(Masonry) {

  // Polymer definition
  Polymer({
    is: 'zombie-blocks',
    properties: {
    },
    ready: function() {
      var blocks = document.querySelector('.blocks');
      var masonry = new Masonry(blocks, {
        columnWidth: 145,
        gutter: 10,
        itemSelector: '.block'
      });
    }
  });

}(window.Masonry));