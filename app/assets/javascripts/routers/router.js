WordpressClone.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main')
  },

  // TODO: make these URLs look more Wordpress-like
  // TODO: the root route shouldn't be blogsIndex, but instead your following feed
  routes: {
    '': 'blogsIndex',
    'blogs/new': 'blogNew',
    'users/:id': 'userShow',
    'blogs/:id': 'blogShow',
    'posts/:id': 'postShow'
  },

  // ====== USERS ======

  userShow: function (id) {
    var model = new WordpressClone.Models.User({id: id});
    model.fetch();
    var view = new WordpressClone.Views.UserShow({model: model});
    this._swapView(view);
  },

  // ====== BLOGS ======

  blogNew: function () {
    var view = new WordpressClone.Views.BlogNew();
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

  // ====== POSTS ======

  postShow: function (id) {
    var model = new WordpressClone.Models.Post({id: id});
    model.fetch();
    var view = new WordpressClone.Views.PostShow({model: model});
    this._swapView(view);
  },

  // ====== PRIVATE ======

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
