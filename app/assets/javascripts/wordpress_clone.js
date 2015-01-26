window.WordpressClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new WordpressClone.Routers.Router();

    // scroll only applies directly to the scrolled element, so we can't listen
    // for it directly. instead, we'll trigger a dummy scroll event on a div
    // that only exists on pages where we need to listen for window scroll.
    $(document).scroll(function () {
      $("#scrollListener").trigger("windowScroll");
    });

    Backbone.history.start();
  }
};
