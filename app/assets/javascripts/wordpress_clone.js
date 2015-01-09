window.WordpressClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new WordpressClone.Routers.Router
    WordpressClone.Collections.blogs = new WordpressClone.Collections.Blogs();
    WordpressClone.Collections.blogs.fetch();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  WordpressClone.initialize();
});
