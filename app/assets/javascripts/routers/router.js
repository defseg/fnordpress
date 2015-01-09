WordpressClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main')
  },

  routes: {
    'users/:id': 'userShow',
    'blogs': 'blogsIndex',
    'blogs/:id': 'blogShow',
    'blogs/:blogId/posts/:id': 'postShow'
  },

  userShow: function (id) {
    var model = new WordpressClone.Models.User({id: id});
    model.fetch();
    var view = new WordpressClone.Views.UserShow({model: model});
    this._swapView(view);
  },

  blogShow: function (id) {
    var model = WordpressClone.Collections.blogs.getOrFetch(id);
    var view = new WordpressClone.Views.BlogShow({model: model});
    this._swapView(view);
  },

  blogsIndex: function (id) {
    var view = new WordpressClone.Views.BlogsIndex({collection: WordpressClone.Collections.blogs});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
