window.WordpressClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new WordpressClone.Routers.Router();
    // TODO get rid of this collection
    WordpressClone.Collections.blogs = new WordpressClone.Collections.Blogs();
    WordpressClone.Collections.blogs.fetch();

    // scroll only applies directly to the scrolled element, so we can't listen
    // for it directly. instead, we'll trigger a dummy scroll event on a div
    // that only exists on pages where we need to listen for window scroll.
    $(document).scroll(function () {
      $("#scrollListener").trigger("windowScroll");
    });

    Backbone.history.start();
  }
};
